<<<<<<< HEAD:packages/hardhat-chai-matchers/src/internal/emit.ts
import type EthersT from "ethers";
import type { Contract, Transaction } from "ethers";
import type { AssertWithSsfi, Ssfi } from "../utils";
=======
import type { AssertWithSsfi, Ssfi } from "../utils/ssfi.js";
import type { EventFragment } from "ethers/abi";
import type { Contract } from "ethers/contract";
import type { Provider, TransactionReceipt } from "ethers/providers";
import type { Transaction } from "ethers/transaction";
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/src/internal/matchers/emit.ts

import util from "node:util";

import { HardhatError } from "@nomicfoundation/hardhat-errors";
import { AssertionError } from "chai";
<<<<<<< HEAD:packages/hardhat-chai-matchers/src/internal/emit.ts
import util from "util";
import ordinal from "ordinal";

import { buildAssert } from "../utils";
import { ASSERTION_ABORTED, EMIT_MATCHER } from "./constants";
import { HardhatChaiMatchersAssertionError } from "./errors";
import { assertIsNotNull, preventAsyncMatcherChaining } from "./utils";

type EventFragment = EthersT.EventFragment;
type Interface = EthersT.Interface;
type Provider = EthersT.Provider;
=======

import { ASSERTION_ABORTED, EMIT_MATCHER } from "../constants.js";
import { assertArgsArraysEqual, assertIsNotNull } from "../utils/asserts.js";
import { buildAssert } from "../utils/build-assert.js";
import { preventAsyncMatcherChaining } from "../utils/prevent-chaining.js";
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/src/internal/matchers/emit.ts

export const EMIT_CALLED = "emitAssertionCalled";

async function waitForPendingTransaction(
  tx: Promise<Transaction> | Transaction | string,
  provider: Provider,
) {
  let hash: string | null;
  if (tx instanceof Promise) {
    ({ hash } = await tx);
  } else if (typeof tx === "string") {
    hash = tx;
  } else {
    ({ hash } = tx);
  }

  if (hash === null) {
    throw new HardhatError(
      HardhatError.ERRORS.CHAI_MATCHERS.GENERAL.INVALID_TRANSACTION,
      { transaction: JSON.stringify(tx) },
    );
  }

  return provider.getTransactionReceipt(hash);
}

export function supportEmit(
  Assertion: Chai.AssertionStatic,
  chaiUtils: Chai.ChaiUtils,
): void {
  Assertion.addMethod(
    EMIT_MATCHER,
    function (this: any, contract: Contract, eventName: string) {
      // capture negated flag before async code executes; see buildAssert's jsdoc
      const negated = this.__flags.negate;
      const tx = this._obj;

      preventAsyncMatcherChaining(this, EMIT_MATCHER, chaiUtils, true);

      const promise = this.then === undefined ? Promise.resolve() : this;

      const onSuccess = (receipt: TransactionReceipt) => {
        // abort if the assertion chain was aborted, for example because
        // a `.not` was combined with a `.withArgs`
        if (chaiUtils.flag(this, ASSERTION_ABORTED) === true) {
          return;
        }

        const assert = buildAssert(negated, onSuccess);

        let eventFragment: EventFragment | null = null;
        try {
          eventFragment = contract.interface.getEvent(eventName, []);
        } catch (e) {
          if (e instanceof TypeError) {
            const errorMessage = e.message.split(" (argument=")[0];
            // eslint-disable-next-line no-restricted-syntax -- keep the original chai error structure
            throw new AssertionError(errorMessage);
          }
        }

        if (eventFragment === null) {
          // eslint-disable-next-line no-restricted-syntax -- keep the original chai error structure
          throw new AssertionError(
            `Event "${eventName}" doesn't exist in the contract`,
          );
        }

        const topic = eventFragment.topicHash;
        const contractAddress = contract.target;
        if (typeof contractAddress !== "string") {
          throw new HardhatError(
            HardhatError.ERRORS.CHAI_MATCHERS.GENERAL.CONTRACT_TARGET_MUST_BE_A_STRING,
          );
        }
<<<<<<< HEAD:packages/hardhat-chai-matchers/src/internal/emit.ts
=======

        if (args.length > 0) {
          throw new HardhatError(
            HardhatError.ERRORS.CHAI_MATCHERS.GENERAL.EMIT_EXPECTS_TWO_ARGUMENTS,
          );
        }

>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/src/internal/matchers/emit.ts
        this.logs = receipt.logs
          .filter((log) => log.topics.includes(topic))
          .filter(
            (log) =>
              log.address.toLowerCase() === contractAddress.toLowerCase(),
          );

        assert(
          this.logs.length > 0,
          `Expected event "${eventName}" to be emitted, but it wasn't`,
          `Expected event "${eventName}" NOT to be emitted, but it was`,
        );
        chaiUtils.flag(this, "eventName", eventName);
        chaiUtils.flag(this, "contract", contract);
      };

      const derivedPromise = promise.then(() => {
        // abort if the assertion chain was aborted, for example because
        // a `.not` was combined with a `.withArgs`
        if (chaiUtils.flag(this, ASSERTION_ABORTED) === true) {
          return;
        }

        if (contract.runner === null || contract.runner.provider === null) {
          throw new HardhatError(
            HardhatError.ERRORS.CHAI_MATCHERS.GENERAL.CONTRACT_RUNNER_PROVIDER_NOT_NULL,
          );
        }

        return waitForPendingTransaction(tx, contract.runner.provider).then(
          (receipt) => {
            assertIsNotNull(receipt, "receipt");
            return onSuccess(receipt);
          },
        );
      });

      chaiUtils.flag(this, EMIT_CALLED, true);

      this.then = derivedPromise.then.bind(derivedPromise);
      this.catch = derivedPromise.catch.bind(derivedPromise);
      this.promise = derivedPromise;
      return this;
    },
  );
}

export async function emitWithArgs(
  context: any,
  Assertion: Chai.AssertionStatic,
  chaiUtils: Chai.ChaiUtils,
  expectedArgs: any[],
  ssfi: Ssfi,
): Promise<void> {
  const negated = false; // .withArgs cannot be negated
  const assert = buildAssert(negated, ssfi);

  tryAssertArgsArraysEqual(
    context,
    Assertion,
    chaiUtils,
    expectedArgs,
    context.logs,
    assert,
    ssfi,
  );
}

function assertArgsArraysEqual(
  context: any,
  Assertion: Chai.AssertionStatic,
  chaiUtils: Chai.ChaiUtils,
  expectedArgs: any[],
  log: any,
  assert: AssertWithSsfi,
  ssfi: Ssfi
) {
  const ethers = require("ethers") as typeof EthersT;
  const parsedLog = (
    chaiUtils.flag(context, "contract").interface as Interface
  ).parseLog(log);
  assertIsNotNull(parsedLog, "parsedLog");
  const actualArgs = parsedLog.args;
  const eventName = chaiUtils.flag(context, "eventName");
  assert(
    actualArgs.length === expectedArgs.length,
    `Expected "${eventName}" event to have ${expectedArgs.length} argument(s), but it has ${actualArgs.length}`
  );
  for (let index = 0; index < expectedArgs.length; index++) {
    if (typeof expectedArgs[index] === "function") {
      const errorPrefix = `The predicate for the ${ordinal(
        index + 1
      )} event argument`;
      try {
        assert(
          expectedArgs[index](actualArgs[index]),
          `${errorPrefix} returned false`
          // no need for a negated message, since we disallow mixing .not. with
          // .withArgs
        );
      } catch (e) {
        if (e instanceof AssertionError) {
          assert(
            false,
            `${errorPrefix} threw an AssertionError: ${e.message}`
            // no need for a negated message, since we disallow mixing .not. with
            // .withArgs
          );
        }
        throw e;
      }
    } else if (expectedArgs[index] instanceof Uint8Array) {
      new Assertion(actualArgs[index], undefined, ssfi, true).equal(
        ethers.hexlify(expectedArgs[index])
      );
    } else if (
      expectedArgs[index]?.length !== undefined &&
      typeof expectedArgs[index] !== "string"
    ) {
      const expectedLength = expectedArgs[index].length;
      const actualLength = actualArgs[index].length;
      assert(
        expectedLength === actualLength,
        `Expected the ${ordinal(
          index + 1
        )} argument of the "${eventName}" event to have ${expectedLength} ${
          expectedLength === 1 ? "element" : "elements"
        }, but it has ${actualLength}`
      );

      for (let j = 0; j < expectedArgs[index].length; j++) {
        new Assertion(actualArgs[index][j], undefined, ssfi, true).equal(
          expectedArgs[index][j]
        );
      }
    } else {
      if (
        actualArgs[index].hash !== undefined &&
        actualArgs[index]._isIndexed === true
      ) {
        new Assertion(
          actualArgs[index].hash,
          undefined,
          ssfi,
          true
        ).to.not.equal(
          expectedArgs[index],
          "The actual value was an indexed and hashed value of the event argument. The expected value provided to the assertion should be the actual event argument (the pre-image of the hash). You provided the hash itself. Please supply the the actual event argument (the pre-image of the hash) instead."
        );
        const expectedArgBytes = ethers.isHexString(expectedArgs[index])
          ? ethers.getBytes(expectedArgs[index])
          : ethers.toUtf8Bytes(expectedArgs[index]);
        const expectedHash = ethers.keccak256(expectedArgBytes);
        new Assertion(actualArgs[index].hash, undefined, ssfi, true).to.equal(
          expectedHash,
          `The actual value was an indexed and hashed value of the event argument. The expected value provided to the assertion was hashed to produce ${expectedHash}. The actual hash and the expected hash did not match`
        );
      } else {
        new Assertion(actualArgs[index], undefined, ssfi, true).equal(
          expectedArgs[index]
        );
      }
    }
  }
}

const tryAssertArgsArraysEqual = (
  context: any,
  Assertion: Chai.AssertionStatic,
  chaiUtils: Chai.ChaiUtils,
  expectedArgs: any[],
  logs: any[],
  assert: AssertWithSsfi,
  ssfi: Ssfi,
) => {
<<<<<<< HEAD:packages/hardhat-chai-matchers/src/internal/emit.ts
  if (logs.length === 1)
=======
  const eventName = chaiUtils.flag(context, "eventName");

  if (logs.length === 1) {
    const parsedLog = chaiUtils
      .flag(context, "contract")
      .interface.parseLog(logs[0]);
    assertIsNotNull(parsedLog, "parsedLog");

>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/src/internal/matchers/emit.ts
    return assertArgsArraysEqual(
      context,
      Assertion,
      chaiUtils,
      expectedArgs,
      logs[0],
      assert,
      ssfi,
    );
<<<<<<< HEAD:packages/hardhat-chai-matchers/src/internal/emit.ts
=======
  }

>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/src/internal/matchers/emit.ts
  for (const index in logs) {
    if (index === undefined) {
      break;
    } else {
      try {
<<<<<<< HEAD:packages/hardhat-chai-matchers/src/internal/emit.ts
=======
        const parsedLog = chaiUtils
          .flag(context, "contract")
          .interface.parseLog(logs[index]);
        assertIsNotNull(parsedLog, "parsedLog");

>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/src/internal/matchers/emit.ts
        assertArgsArraysEqual(
          context,
          Assertion,
          chaiUtils,
          expectedArgs,
          logs[index],
          assert,
          ssfi,
        );

        return;
      } catch {}
    }
  }
  const eventName = chaiUtils.flag(context, "eventName");
  assert(
    false,
    `The specified arguments (${util.inspect(
      expectedArgs,
    )}) were not included in any of the ${
      context.logs.length
    } emitted "${eventName}" events`,
  );
};
