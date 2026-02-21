import setupDebug from "debug";

import { IgnitionError } from "../../../../errors";
import { ERRORS } from "../../../errors-list";
import { assertIgnitionInvariant } from "../../../utils/assertions";
import { JsonRpcClient } from "../../jsonrpc-client";
import { TransactionTrackingTimer } from "../../transaction-tracking-timer";
import {
  CallExecutionState,
  DeploymentExecutionState,
  SendDataExecutionState,
} from "../../types/execution-state";
import { Transaction } from "../../types/jsonrpc";
import {
  JournalMessageType,
  OnchainInteractionBumpFeesMessage,
  OnchainInteractionTimeoutMessage,
  TransactionConfirmMessage,
<<<<<<< HEAD:v-next/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts
} from "../../types/messages.js";
import type {
  GetTransactionRetryConfig,
  OnchainInteraction,
} from "../../types/network-interaction.js";

import { HardhatError } from "@nomicfoundation/hardhat-errors";
import setupDebug from "debug";

import { assertIgnitionInvariant } from "../../../utils/assertions.js";
import { JournalMessageType } from "../../types/messages.js";
import { NetworkInteractionType } from "../../types/network-interaction.js";
=======
} from "../../types/messages";
import {
  NetworkInteractionType,
  OnchainInteraction,
} from "../../types/network-interaction";
>>>>>>> 0f69d949197497ebc6a1ee225cb405a2df0eaa9e:packages/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts

const debug = setupDebug("hardhat-ignition:onchain-interaction-monitor");

/**
 * Checks the transactions of the latest network interaction of the execution state,
 * and returns a message, or undefined if we need to wait for more confirmations.
 *
 * This method can return messages indicating that a transaction has enough confirmations,
 * that we need to bump the fees, or that the execution of this onchain interaction has
 * timed out.
 *
 * If all of the transactions of the latest network interaction have been dropped, this
 * method throws an IgnitionError.
 *
 * SIDE EFFECTS: This function doesn't have any side effects.
 *
 * @param params.exState The execution state that requires the transactions to be checked.
 * @param params.jsonRpcClient The JSON RPC client to use for accessing the network.
 * @param params.transactionTrackingTimer The TransactionTrackingTimer to use for checking the
 *  if a transaction has been pending for too long.
 * @param params.requiredConfirmations The number of confirmations required for a transaction
 *  to be considered confirmed.
 * @param params.millisecondBeforeBumpingFees The number of milliseconds before bumping the fees
 *  of a transaction.
 * @param params.maxFeeBumps The maximum number of times we can bump the fees of a transaction
 *  before considering the onchain interaction timed out.
 * @param params.getTransactionRetryConfig This is really only a parameter to help with testing this function
 * @param params.disableFeeBumping Disables fee bumping for all transactions.
 * @param params.maxRetries The maximum number of times to retry fetching a transaction from the mempool.
 * @param params.retryInterval The number of milliseconds to wait between retries when fetching
 *  a transaction from the mempool.
 * @returns A message indicating the result of checking the transactions of the latest
 *  network interaction.
 */
export async function monitorOnchainInteraction(
<<<<<<< HEAD:v-next/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts
  params: {
    exState:
      | DeploymentExecutionState
      | CallExecutionState
      | SendDataExecutionState;
    jsonRpcClient: JsonRpcClient;
    transactionTrackingTimer: TransactionTrackingTimer;
    requiredConfirmations: number;
    millisecondBeforeBumpingFees: number;
    maxFeeBumps: number;
    disableFeeBumping: boolean;
  } & GetTransactionRetryConfig,
=======
  exState:
    | DeploymentExecutionState
    | CallExecutionState
    | SendDataExecutionState,
  jsonRpcClient: JsonRpcClient,
  transactionTrackingTimer: TransactionTrackingTimer,
  requiredConfirmations: number,
  millisecondBeforeBumpingFees: number,
  maxFeeBumps: number,
  getTransactionRetryConfig: GetTransactionRetryConfig = {
    maxRetries: 10,
    retryInterval: 1000,
  },
  disableFeeBumping: boolean
>>>>>>> 0f69d949197497ebc6a1ee225cb405a2df0eaa9e:packages/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts
): Promise<
  | TransactionConfirmMessage
  | OnchainInteractionBumpFeesMessage
  | OnchainInteractionTimeoutMessage
  | undefined
> {
<<<<<<< HEAD:v-next/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts
  const lastNetworkInteraction = params.exState.networkInteractions.at(-1);

  assertIgnitionInvariant(
    lastNetworkInteraction !== undefined,
    `No network interaction for ExecutionState ${params.exState.id} when trying to check its transactions`,
=======
  const lastNetworkInteraction = exState.networkInteractions.at(-1);

  assertIgnitionInvariant(
    lastNetworkInteraction !== undefined,
    `No network interaction for ExecutionState ${exState.id} when trying to check its transactions`
>>>>>>> 0f69d949197497ebc6a1ee225cb405a2df0eaa9e:packages/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts
  );

  assertIgnitionInvariant(
    lastNetworkInteraction.type === NetworkInteractionType.ONCHAIN_INTERACTION,
<<<<<<< HEAD:v-next/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts
    `StaticCall found as last network interaction of ExecutionState ${params.exState.id} when trying to check its transactions`,
=======
    `StaticCall found as last network interaction of ExecutionState ${exState.id} when trying to check its transactions`
>>>>>>> 0f69d949197497ebc6a1ee225cb405a2df0eaa9e:packages/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts
  );

  assertIgnitionInvariant(
    lastNetworkInteraction.transactions.length > 0,
<<<<<<< HEAD:v-next/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts
    `No transaction found in OnchainInteraction ${params.exState.id}/${lastNetworkInteraction.id} when trying to check its transactions`,
  );

  const transaction = await _getTransactionWithRetry({
    jsonRpcClient: params.jsonRpcClient,
    onchainInteraction: lastNetworkInteraction,
    futureId: params.exState.id,
    maxRetries: params.maxRetries,
    retryInterval: params.retryInterval,
  });
=======
    `No transaction found in OnchainInteraction ${exState.id}/${lastNetworkInteraction.id} when trying to check its transactions`
  );

  const transaction = await _getTransactionWithRetry(
    jsonRpcClient,
    lastNetworkInteraction,
    getTransactionRetryConfig,
    exState.id
  );
>>>>>>> 0f69d949197497ebc6a1ee225cb405a2df0eaa9e:packages/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts

  // We do not try to recover from dopped transactions mid-execution
  if (transaction === undefined) {
<<<<<<< HEAD:v-next/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts
    throw new HardhatError(
      HardhatError.ERRORS.IGNITION.EXECUTION.DROPPED_TRANSACTION,
      {
        futureId: params.exState.id,
        networkInteractionId: lastNetworkInteraction.id,
      },
    );
=======
    throw new IgnitionError(ERRORS.EXECUTION.DROPPED_TRANSACTION, {
      futureId: exState.id,
      networkInteractionId: lastNetworkInteraction.id,
    });
>>>>>>> 0f69d949197497ebc6a1ee225cb405a2df0eaa9e:packages/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts
  }

  const [block, receipt] = await Promise.all([
    params.jsonRpcClient.getLatestBlock(),
    params.jsonRpcClient.getTransactionReceipt(transaction.hash),
  ]);

  if (receipt !== undefined) {
    // There's a slight race condition here that we won't check.
    //
    // We should be checking that the receipt's block hash is still part
    // of the chain, as it could have been reorged out.
    //
    // As we intend to use this with requiredConfirmations with
    // values that are high enough to avoid reorgs, we don't do it.
    const confirmations = block.number - receipt.blockNumber + 1;

    if (confirmations >= params.requiredConfirmations) {
      return {
        type: JournalMessageType.TRANSACTION_CONFIRM,
        futureId: params.exState.id,
        networkInteractionId: lastNetworkInteraction.id,
        hash: transaction.hash,
        receipt,
      };
    }

    return undefined;
  }

<<<<<<< HEAD:v-next/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts
  const timeTrackingTx =
    params.transactionTrackingTimer.getTransactionTrackingTime(
      transaction.hash,
    );
=======
  const timeTrackingTx = transactionTrackingTimer.getTransactionTrackingTime(
    transaction.hash
  );
>>>>>>> 0f69d949197497ebc6a1ee225cb405a2df0eaa9e:packages/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts

  if (timeTrackingTx < params.millisecondBeforeBumpingFees) {
    return undefined;
  }

  if (
    params.disableFeeBumping ||
    lastNetworkInteraction.transactions.length > params.maxFeeBumps
  ) {
    return {
      type: JournalMessageType.ONCHAIN_INTERACTION_TIMEOUT,
      futureId: params.exState.id,
      networkInteractionId: lastNetworkInteraction.id,
    };
  }

  return {
    type: JournalMessageType.ONCHAIN_INTERACTION_BUMP_FEES,
    futureId: params.exState.id,
    networkInteractionId: lastNetworkInteraction.id,
  };
}

async function _getTransactionWithRetry(
<<<<<<< HEAD:v-next/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts
  params: {
    jsonRpcClient: JsonRpcClient;
    onchainInteraction: OnchainInteraction;
    futureId: string;
  } & GetTransactionRetryConfig,
=======
  jsonRpcClient: JsonRpcClient,
  onchainInteraction: OnchainInteraction,
  retryConfig: GetTransactionRetryConfig,
  futureId: string
>>>>>>> 0f69d949197497ebc6a1ee225cb405a2df0eaa9e:packages/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts
): Promise<Transaction | undefined> {
  let transaction: Transaction | undefined;

  // Small retry loop for up to X seconds to handle blockchain nodes
  // that are slow to propagate transactions.
  // See https://github.com/NomicFoundation/hardhat-ignition/issues/665
  for (let i = 0; i < params.maxRetries; i++) {
    debug(
<<<<<<< HEAD:v-next/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts
      `Retrieving transaction for interaction ${params.futureId}/${
        params.onchainInteraction.id
      } from mempool (attempt ${i + 1}/${params.maxRetries})`,
    );

    const transactions = await Promise.all(
      params.onchainInteraction.transactions.map((tx) =>
        params.jsonRpcClient.getTransaction(tx.hash),
      ),
=======
      `Retrieving transaction for interaction ${futureId}/${
        onchainInteraction.id
      } from mempool (attempt ${i + 1}/${retryConfig.maxRetries})`
    );

    const transactions = await Promise.all(
      onchainInteraction.transactions.map((tx) =>
        jsonRpcClient.getTransaction(tx.hash)
      )
>>>>>>> 0f69d949197497ebc6a1ee225cb405a2df0eaa9e:packages/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts
    );

    transaction = transactions.find((tx) => tx !== undefined);

    if (transaction !== undefined) {
      break;
    }

    debug(
<<<<<<< HEAD:v-next/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts
      `Transaction lookup for ${params.futureId}/${params.onchainInteraction.id} not found in mempool, waiting ${params.retryInterval} seconds before retrying`,
    );

    await new Promise((resolve) => setTimeout(resolve, params.retryInterval));
=======
      `Transaction lookup for ${futureId}/${onchainInteraction.id} not found in mempool, waiting ${retryConfig.retryInterval} seconds before retrying`
    );

    await new Promise((resolve) =>
      setTimeout(resolve, retryConfig.retryInterval)
    );
>>>>>>> 0f69d949197497ebc6a1ee225cb405a2df0eaa9e:packages/hardhat-ignition-core/src/internal/execution/future-processor/handlers/monitor-onchain-interaction.ts
  }

  return transaction;
}
