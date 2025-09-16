import type { CoverageConfig } from "./edr/types/coverage.js";
import type { ArtifactManager } from "../../../types/artifacts.js";
import type {
  ChainDescriptorsConfig,
  HardhatConfig,
  HardhatUserConfig,
  NetworkConfig,
  NetworkConfigOverride,
} from "../../../types/config.js";
import type { HookManager } from "../../../types/hooks.js";
import type {
  ChainType,
  DefaultChainType,
  JsonRpcServer,
  NetworkConnection,
  NetworkConnectionParams,
  NetworkManager,
} from "../../../types/network.js";
import type { HardhatPlugin } from "../../../types/plugins.js";
import type {
  EthereumProvider,
  JsonRpcRequest,
  JsonRpcResponse,
} from "../../../types/providers.js";
import type { TaskDefinition } from "../../../types/tasks.js";

import {
  HardhatError,
  assertHardhatInvariant,
} from "@nomicfoundation/hardhat-errors";
import { exists, readBinaryFile } from "@nomicfoundation/hardhat-utils/fs";
import { deepMerge } from "@nomicfoundation/hardhat-utils/lang";

import { resolveConfigurationVariable } from "../../core/configuration-variables.js";
import { isSupportedChainType } from "../../edr/chain-type.js";
import { JsonRpcServerImplementation } from "../node/json-rpc/server.js";

import { EdrProvider } from "./edr/edr-provider.js";
import { HttpProvider } from "./http-provider.js";
import { NetworkConnectionImplementation } from "./network-connection.js";
import { validateNetworkConfigOverride } from "./type-validation.js";

export type JsonRpcRequestWrapperFunction = (
  request: JsonRpcRequest,
  defaultBehavior: (r: JsonRpcRequest) => Promise<JsonRpcResponse>,
) => Promise<JsonRpcResponse>;

export class NetworkManagerImplementation implements NetworkManager {
  readonly #defaultNetwork: string;
  readonly #defaultChainType: DefaultChainType;
  readonly #networkConfigs: Readonly<Record<string, Readonly<NetworkConfig>>>;
  readonly #hookManager: Readonly<HookManager>;
  readonly #artifactsManager: Readonly<ArtifactManager>;
  readonly #userConfig: Readonly<HardhatUserConfig>;
  readonly #chainDescriptors: Readonly<ChainDescriptorsConfig>;

  #nextConnectionId = 0;

  constructor(
    defaultNetwork: string,
    defaultChainType: DefaultChainType,
    networkConfigs: Record<string, NetworkConfig>,
    hookManager: HookManager,
    artifactsManager: ArtifactManager,
    userConfig: HardhatUserConfig,
    chainDescriptors: ChainDescriptorsConfig,
  ) {
    this.#defaultNetwork = defaultNetwork;
    this.#defaultChainType = defaultChainType;
    this.#networkConfigs = networkConfigs;
    this.#hookManager = hookManager;
    this.#artifactsManager = artifactsManager;
    this.#userConfig = userConfig;
    this.#chainDescriptors = chainDescriptors;
  }

  public async connect<
    ChainTypeT extends ChainType | string = DefaultChainType,
  >(
    networkOrParams?: NetworkConnectionParams<ChainTypeT> | string,
  ): Promise<NetworkConnection<ChainTypeT>> {
    let networkName: string | undefined;
    let chainType: ChainTypeT | undefined;
    let override: NetworkConfigOverride | undefined;

    if (typeof networkOrParams === "string") {
      networkName = networkOrParams;
    } else if (networkOrParams !== undefined) {
      networkName = networkOrParams.network;
      chainType = networkOrParams.chainType;
      override = networkOrParams.override;
    }

    const networkConnection = await this.#hookManager.runHandlerChain(
      "network",
      "newConnection",
      [],
      async (_context) =>
        this.#initializeNetworkConnection(networkName, chainType, override),
    );

    /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    -- Cast to NetworkConnection<ChainTypeT> because we know it's valid */
    return networkConnection as NetworkConnection<ChainTypeT>;
  }

  public async createServer(
    networkOrParams: NetworkConnectionParams | string = "default",
    _hostname?: string,
    port?: number,
  ): Promise<JsonRpcServer> {
    const insideDocker = await exists("/.dockerenv");
    const hostname = _hostname ?? (insideDocker ? "0.0.0.0" : "127.0.0.1");

    const { provider } = await this.connect(networkOrParams);

    return new JsonRpcServerImplementation({
      hostname,
      port,
      provider,
    });
  }

  async #initializeNetworkConnection<ChainTypeT extends ChainType | string>(
    networkName?: string,
    chainType?: ChainTypeT,
    networkConfigOverride?: NetworkConfigOverride,
  ): Promise<NetworkConnection<ChainTypeT>> {
    const resolvedNetworkName = networkName ?? this.#defaultNetwork;

    if (this.#networkConfigs[resolvedNetworkName] === undefined) {
      throw new HardhatError(
        HardhatError.ERRORS.CORE.NETWORK.NETWORK_NOT_FOUND,
        {
          networkName: resolvedNetworkName,
        },
      );
    }

    const resolvedNetworkConfig = await this.#resolveNetworkConfig(
      resolvedNetworkName,
      networkConfigOverride,
    );

    /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    -- Cast to ChainTypeT because we know it's valid */
    const resolvedChainType = (chainType ??
      resolvedNetworkConfig.chainType ??
      this.#defaultChainType) as ChainTypeT;

    /**
     * If resolvedNetworkConfig.chainType is defined, it must match the
     * provided chainType.
     * We use resolvedChainType as it will be either chainType or
     * resolvedNetworkConfig.chainType in this context.
     */
    if (
      resolvedNetworkConfig.chainType !== undefined &&
      resolvedChainType !== resolvedNetworkConfig.chainType
    ) {
      throw new HardhatError(
        HardhatError.ERRORS.CORE.NETWORK.INVALID_CHAIN_TYPE,
        {
          networkName: resolvedNetworkName,
          chainType: resolvedChainType,
          networkChainType: resolvedNetworkConfig.chainType,
        },
      );
    }

    /* Capture the hook manager in a local variable to avoid retaining a
    reference to the NetworkManager instance, allowing the garbage collector
    to clean up the NetworkConnectionImplementation instances properly. */
    const hookManager = this.#hookManager;

    const createProvider = async (
      networkConnection: NetworkConnectionImplementation<ChainTypeT>,
    ): Promise<EthereumProvider> => {
      const jsonRpcRequestWrapper: JsonRpcRequestWrapperFunction = (
        request,
        defaultBehavior,
      ) =>
        hookManager.runHandlerChain(
          "network",
          "onRequest",
          [networkConnection, request],
          async (_context, _connection, req) => defaultBehavior(req),
        );

      if (resolvedNetworkConfig.type === "edr-simulated") {
        if (!isSupportedChainType(resolvedChainType)) {
          throw new HardhatError(
            HardhatError.ERRORS.CORE.GENERAL.UNSUPPORTED_OPERATION,
            { operation: `Simulating chain type ${resolvedChainType}` },
          );
        }

        let coverageConfig: CoverageConfig | undefined;

        const shouldEnableCoverage = await hookManager.hasHandlers(
          "network",
          "onCoverageData",
        );
        if (shouldEnableCoverage) {
          coverageConfig = {
            onCollectedCoverageCallback: async (coverageData: Uint8Array[]) => {
              // NOTE: We cast the tag we receive from EDR to a hex string to
              // make it easier to debug.
              const tags = coverageData.map((tag) =>
                Buffer.from(tag).toString("hex"),
              );
              await hookManager.runParallelHandlers(
                "network",
                "onCoverageData",
                [tags],
              );
            },
          };
        }

        return EdrProvider.create({
          chainDescriptors: this.#chainDescriptors,
          // The resolvedNetworkConfig can have its chainType set to `undefined`
          // so we default to the default chain type here.
          networkConfig: {
            ...resolvedNetworkConfig,
            // When coverage is enabled, we set allowUnlimitedContractSize to true
            // because the added coverage data can push the contract size over the limit.
            allowUnlimitedContractSize: shouldEnableCoverage
              ? true
              : resolvedNetworkConfig.allowUnlimitedContractSize,
            /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
            This case is safe because we have a check above */
            chainType: resolvedChainType as ChainType,
          },
          jsonRpcRequestWrapper,
          tracingConfig: {
            buildInfos: await this.#getBuildInfosAndOutputsAsBuffers(),
            ignoreContracts: false,
          },
          coverageConfig,
        });
      }

      return HttpProvider.create({
        url: await resolvedNetworkConfig.url.getUrl(),
        networkName: resolvedNetworkName,
        extraHeaders: resolvedNetworkConfig.httpHeaders,
        timeout: resolvedNetworkConfig.timeout,
        jsonRpcRequestWrapper,
      });
    };

    return NetworkConnectionImplementation.create(
      this.#nextConnectionId++,
      resolvedNetworkName,
      resolvedChainType,
      resolvedNetworkConfig,
      async (connection: NetworkConnectionImplementation<ChainTypeT>) => {
        await hookManager.runHandlerChain(
          "network",
          "closeConnection",
          [connection],
          async (_context, conn) => {
            await conn.provider.close();
          },
        );
      },
      createProvider,
    );
  }

  /**
   * Resolve the network connection configuration settings for the network name
   * and taking into account any configuration overrides.
   *
   * @param resolvedNetworkName the network name for selecting the appropriate network config
   * @param networkConfigOverride any network config options to override the
   *   defaults for the named network
   * @returns a valid network configuration including any config additions from
   *   plugins
   */
  async #resolveNetworkConfig(
    resolvedNetworkName: string,
    networkConfigOverride: NetworkConfigOverride | undefined,
  ): Promise<NetworkConfig> {
    if (networkConfigOverride === undefined) {
      return this.#networkConfigs[resolvedNetworkName];
    }

    if (
      "type" in networkConfigOverride &&
      networkConfigOverride.type !==
        this.#networkConfigs[resolvedNetworkName].type
    ) {
      throw new HardhatError(
        HardhatError.ERRORS.CORE.NETWORK.INVALID_CONFIG_OVERRIDE,
        {
          errors: `\t* The type of the network cannot be changed.`,
        },
      );
    }

    const newConfig = deepMerge(this.#userConfig, {
      networks: {
        [resolvedNetworkName]: networkConfigOverride,
      },
    });

    // As normalizeNetworkConfigOverride is not type-safe, we validate the
    // normalized network config override immediately after normalizing it.
    const validationErrors = await validateNetworkConfigOverride(
      newConfig.networks?.[resolvedNetworkName],
    );
    if (validationErrors.length > 0) {
      throw new HardhatError(
        HardhatError.ERRORS.CORE.NETWORK.INVALID_CONFIG_OVERRIDE,
        {
          errors: `\t${validationErrors
            .map((error) =>
              error.path.length > 0
                ? `* Error in ${error.path.join(".")}: ${error.message}`
                : `* ${error.message}`,
            )
            .join("\n\t")}`,
        },
      );
    }

    const updatedConfig = await this.#hookManager.runHandlerChain(
      "config",
      "extendUserConfig",
      [newConfig],
      async (c) => {
        return c;
      },
    );

    /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- reasons */
    const initialResolvedConfig = {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- kill me
      plugins: [] as HardhatPlugin[],
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- kill me
      tasks: [] as TaskDefinition[],
      paths: {
        root: "",
        cache: "",
      },
    } as HardhatConfig;

    const resolvedConfig = await this.#hookManager.runHandlerChain(
      "config",
      "resolveUserConfig",
      [
        updatedConfig,
        (variable) => resolveConfigurationVariable(this.#hookManager, variable),
      ],
      async (_, __) => {
        return initialResolvedConfig;
      },
    );

    const resolvedNetworkConfigOverride =
      resolvedConfig.networks[resolvedNetworkName];

    assertHardhatInvariant(
      resolvedNetworkConfigOverride !== undefined,
      "The overridden network config should translate through the hook resolution of user config",
    );

    return resolvedNetworkConfigOverride;
  }

  async #getBuildInfosAndOutputsAsBuffers(): Promise<
    Array<{ buildInfo: Uint8Array; output: Uint8Array }>
  > {
    const results = [];
    for (const id of await this.#artifactsManager.getAllBuildInfoIds()) {
      const buildInfoPath = await this.#artifactsManager.getBuildInfoPath(id);
      const buildInfoOutputPath =
        await this.#artifactsManager.getBuildInfoOutputPath(id);

      if (buildInfoPath !== undefined && buildInfoOutputPath !== undefined) {
        const buildInfo = await readBinaryFile(buildInfoPath);
        const output = await readBinaryFile(buildInfoOutputPath);

        results.push({
          buildInfo,
          output,
        });
      }
    }

    return results;
  }
}
