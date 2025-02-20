import type { ListTransactionsResult } from "@nomicfoundation/ignition-core";
import type { HardhatRuntimeEnvironment } from "hardhat/types/hre";
import type { NewTaskActionFunction } from "hardhat/types/tasks";

import path from "node:path";

import { HardhatError } from "@nomicfoundation/hardhat-errors";
import {
  IgnitionError,
  listTransactions,
} from "@nomicfoundation/ignition-core";

import { HardhatArtifactResolver } from "../../helpers/hardhat-artifact-resolver.js";
import { calculateListTransactionsDisplay } from "../ui/helpers/calculate-list-transactions-display.js";
import { shouldBeHardhatPluginError } from "../utils/shouldBeHardhatPluginError.js";

interface TaskTransactionsArguments {
  deploymentId: string;
}

const taskTransactions: NewTaskActionFunction<
  TaskTransactionsArguments
> = async ({ deploymentId }, hre: HardhatRuntimeEnvironment) => {
  const deploymentDir = path.join(
    hre.config.paths.ignition,
    "deployments",
    deploymentId,
  );

  const artifactResolver = new HardhatArtifactResolver(hre.artifacts);

  let listTransactionsResult: ListTransactionsResult;

  try {
    listTransactionsResult = await listTransactions(
      deploymentDir,
      artifactResolver,
    );
  } catch (e) {
    if (e instanceof IgnitionError && shouldBeHardhatPluginError(e)) {
      throw new HardhatError(HardhatError.ERRORS.IGNITION.INTERNAL_ERROR, e);
    }
    throw e;
  }

  // TODO: HH3 revisit looking up the network name for display
  const networkName = (await hre.network.connect()).networkName;

  console.log(
    await calculateListTransactionsDisplay(
      deploymentId,
      listTransactionsResult,
      hre.config.networks[networkName]?.ignition?.explorerUrl,
    ),
  );
};

export default taskTransactions;
