import type { BuildInfo } from "../../../types/artifacts.js";
import type { EdrNetworkConfigOverride } from "../../../types/config.js";
import type { SolidityBuildInfoOutput } from "../../../types/solidity.js";
import type { NewTaskActionFunction } from "../../../types/tasks.js";

import path from "node:path";

import {
  assertHardhatInvariant,
  HardhatError,
} from "@nomicfoundation/hardhat-errors";
import {
  ensureDir,
  exists,
  readJsonFile,
  readJsonFileAsStream,
} from "@nomicfoundation/hardhat-utils/fs";
import chalk from "chalk";
import debug from "debug";

import { sendErrorTelemetry } from "../../cli/telemetry/sentry/reporter.js";
import { DEFAULT_NETWORK_NAME } from "../../constants.js";
import { isSupportedChainType } from "../../edr/chain-type.js";
import { BUILD_INFO_DIR_NAME } from "../artifacts/artifact-manager.js";
import { EdrProvider } from "../network-manager/edr/edr-provider.js";

import { watchBuildInfo } from "./artifacts/build-info-watcher.js";
import { formatEdrNetworkConfigAccounts } from "./helpers.js";
import { JsonRpcServerImplementation } from "./json-rpc/server.js";

const log = debug("hardhat:core:tasks:node");

interface NodeActionArguments {
  hostname?: string;
  port: number;
  chainType?: string;
  chainId: number;
  fork?: string;
  forkBlockNumber: number;
}

const nodeAction: NewTaskActionFunction<NodeActionArguments> = async (
  args,
  hre,
) => {
  const network =
    hre.globalOptions.network !== undefined
      ? hre.globalOptions.network
      : DEFAULT_NETWORK_NAME;

  if (!(network in hre.config.networks)) {
    throw new HardhatError(HardhatError.ERRORS.CORE.NETWORK.NETWORK_NOT_FOUND, {
      networkName: network,
    });
  }

  if (hre.config.networks[network].type !== "edr-simulated") {
    throw new HardhatError(HardhatError.ERRORS.CORE.NODE.INVALID_NETWORK_TYPE, {
      networkType: hre.config.networks[network].type,
      networkName: network,
    });
  }

  // NOTE: We create an empty network config override here. We add to it based
  // on the result of arguments parsing. We can expand the list of arguments
  // as much as needed.
  const networkConfigOverride: EdrNetworkConfigOverride = {};

  if (args.chainType !== undefined) {
    if (!isSupportedChainType(args.chainType)) {
      throw new HardhatError(
        HardhatError.ERRORS.CORE.ARGUMENTS.INVALID_VALUE_FOR_TYPE,
        {
          value: args.chainType,
          type: "ChainType",
          name: "chainType",
        },
      );
    }
    networkConfigOverride.chainType = args.chainType;
  }

  if (args.chainId !== -1) {
    networkConfigOverride.chainId = args.chainId;
  }

  // NOTE: --fork-block-number is only valid if --fork is specified
  if (args.fork !== undefined) {
    networkConfigOverride.forking = {
      enabled: true,
      url: args.fork,
      ...(args.forkBlockNumber !== -1
        ? { blockNumber: args.forkBlockNumber }
        : undefined),
    };
  } else if (args.forkBlockNumber !== -1) {
    // NOTE: We could make the error more specific here.
    throw new HardhatError(
      HardhatError.ERRORS.CORE.ARGUMENTS.MISSING_VALUE_FOR_ARGUMENT,
      {
        argument: "fork",
      },
    );
  }

  // NOTE: This is where we initialize the network; the connect method returns
  // a fully resolved networkConfig object which might be useful for display
  const { networkConfig, provider } = await hre.network.connect({
    network,
    override: networkConfigOverride,
  });

  assertHardhatInvariant(
    provider instanceof EdrProvider,
    "Provider must be EdrProvider, since only edr networks are supported",
  );

  // NOTE: We enable logging for the node
  await provider.request({
    method: "hardhat_setLoggingEnabled",
    params: [true],
  });

  // the default hostname is "127.0.0.1" unless we are inside a docker
  // container, in that case we use "0.0.0.0"
  let hostname = args.hostname;
  if (hostname === undefined) {
    const insideDocker = await exists("/.dockerenv");
    if (insideDocker) {
      hostname = "0.0.0.0";
    } else {
      hostname = "127.0.0.1";
    }
  }

  const server = new JsonRpcServerImplementation({
    hostname,
    port: args.port,
    provider,
  });

  const { port: actualPort, address: actualHostname } = await server.listen();

  console.log(
    chalk.green(
      `Started HTTP and WebSocket JSON-RPC server at http://${actualHostname}:${actualPort}/`,
    ),
  );

  console.log();

  const buildInfoDirPath = path.join(
    hre.config.paths.artifacts,
    BUILD_INFO_DIR_NAME,
  );
  await ensureDir(buildInfoDirPath);

  const buildInfoHandler = async (buildId: string) => {
    try {
      log(`Adding new compilation result for build ${buildId} to the node`);
      const buildInfo: BuildInfo = await readJsonFile(
        path.join(buildInfoDirPath, `${buildId}.json`),
      );
      const buildInfoOutput: SolidityBuildInfoOutput =
        await readJsonFileAsStream(
          path.join(buildInfoDirPath, `${buildId}.output.json`),
        );

      const success = await provider.addCompilationResult(
        buildInfo.solcVersion,
        buildInfo.input,
        buildInfoOutput.output,
      );

      if (success) {
        log(`Added compiler result for ${buildId}`);
      } else {
        console.warn(
          chalk.yellow(
            "Last compilation result couldn't be added. Please report this to help us improve Hardhat.\n",
          ),
        );
      }
    } catch (error) {
      console.warn(
        chalk.yellow(
          `There was a problem adding the new compiler result for build ${buildId}.`,
        ),
      );

      log(
        "Last compilation result couldn't be added. Please report this to help us improve Hardhat.\n",
        error,
      );

      if (error instanceof Error) {
        await sendErrorTelemetry(error);
      }
    }
  };
  const buildInfoWatcher = await watchBuildInfo(
    buildInfoDirPath,
    buildInfoHandler,
  );

  // NOTE: Before creating the node, we check if the input network config is of type edr.
  // We only proceed if it is. Hence, we can assume that the output network config is of type edr as well.
  assertHardhatInvariant(
    networkConfig.type === "edr-simulated",
    "Network config type should be edr",
  );

  console.log(await formatEdrNetworkConfigAccounts(networkConfig.accounts));

  await server.afterClosed();
  await buildInfoWatcher.close();
};

export default nodeAction;
