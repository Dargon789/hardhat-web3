import type { Ssfi } from "../../utils/ssfi.js";
import type { ErrorFragment, Interface } from "ethers/abi";
import type { BaseContract } from "ethers/contract";

import { HardhatError } from "@nomicfoundation/hardhat-errors";
import { numberToHexString } from "@nomicfoundation/hardhat-utils/hex";

import { AssertionError } from "chai";
import ordinal from "ordinal";

import {
  ASSERTION_ABORTED,
  REVERTED_WITH_CUSTOM_ERROR_MATCHER,
<<<<<<< HEAD:packages/hardhat-chai-matchers/src/internal/reverted/revertedWithCustomError.ts
} from "../constants";
import { assertIsNotNull, preventAsyncMatcherChaining } from "../utils";
import { buildAssert, Ssfi } from "../../utils";
=======
} from "../../constants.js";
import { assertArgsArraysEqual, assertIsNotNull } from "../../utils/asserts.js";
import { buildAssert } from "../../utils/build-assert.js";
import { preventAsyncMatcherChaining } from "../../utils/prevent-chaining.js";

>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/src/internal/matchers/reverted/revertedWithCustomError.ts
import {
  decodeReturnData,
  getReturnDataFromError,
  resultToArray,
} from "./utils.js";

export const REVERTED_WITH_CUSTOM_ERROR_CALLED = "customErrorAssertionCalled";

interface CustomErrorAssertionData {
  contractInterface: Interface;
  returnData: string;
  customError: ErrorFragment;
}

export function supportRevertedWithCustomError(
  Assertion: Chai.AssertionStatic,
  chaiUtils: Chai.ChaiUtils,
): void {
  Assertion.addMethod(
    REVERTED_WITH_CUSTOM_ERROR_MATCHER,
    function (
      this: any,
<<<<<<< HEAD:packages/hardhat-chai-matchers/src/internal/reverted/revertedWithCustomError.ts
      contract: EthersT.BaseContract,
      expectedCustomErrorName: string
=======
      contract: BaseContract,
      expectedCustomErrorName: string,
      ...args: any[]
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/src/internal/matchers/reverted/revertedWithCustomError.ts
    ) {
      // capture negated flag before async code executes; see buildAssert's jsdoc
      const negated = this.__flags.negate;

      const { iface, expectedCustomError } = validateInput(
        this._obj,
        contract,
<<<<<<< HEAD:packages/hardhat-chai-matchers/src/internal/reverted/revertedWithCustomError.ts
        expectedCustomErrorName
=======
        expectedCustomErrorName,
        args,
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/src/internal/matchers/reverted/revertedWithCustomError.ts
      );

      preventAsyncMatcherChaining(
        this,
        REVERTED_WITH_CUSTOM_ERROR_MATCHER,
        chaiUtils,
      );

      const onSuccess = () => {
        if (chaiUtils.flag(this, ASSERTION_ABORTED) === true) {
          return;
        }

        const assert = buildAssert(negated, onSuccess);

        assert(
          false,
          `Expected transaction to be reverted with custom error '${expectedCustomErrorName}', but it didn't revert`,
        );
      };

      const onError = (error: any) => {
        if (chaiUtils.flag(this, ASSERTION_ABORTED) === true) {
          return;
        }

        const assert = buildAssert(negated, onError);

        const returnData = getReturnDataFromError(error);
        const decodedReturnData = decodeReturnData(returnData);

        if (decodedReturnData.kind === "Empty") {
          assert(
            false,
            `Expected transaction to be reverted with custom error '${expectedCustomErrorName}', but it reverted without a reason`,
          );
        } else if (decodedReturnData.kind === "Error") {
          assert(
            false,
            `Expected transaction to be reverted with custom error '${expectedCustomErrorName}', but it reverted with reason '${decodedReturnData.reason}'`,
          );
        } else if (decodedReturnData.kind === "Panic") {
          assert(
            false,
            `Expected transaction to be reverted with custom error '${expectedCustomErrorName}', but it reverted with panic code ${numberToHexString(
              decodedReturnData.code,
            )} (${decodedReturnData.description})`,
          );
        } else if (decodedReturnData.kind === "Custom") {
          if (decodedReturnData.id === expectedCustomError.selector) {
            // add flag with the data needed for .withArgs
            const customErrorAssertionData: CustomErrorAssertionData = {
              contractInterface: iface,
              customError: expectedCustomError,
              returnData,
            };
            this.customErrorData = customErrorAssertionData;

            assert(
              true,
              undefined,
              `Expected transaction NOT to be reverted with custom error '${expectedCustomErrorName}', but it was`,
            );
          } else {
            // try to decode the actual custom error
            // this will only work when the error comes from the given contract
            const actualCustomError = iface.getError(decodedReturnData.id);

            if (actualCustomError === null) {
              assert(
                false,
                `Expected transaction to be reverted with custom error '${expectedCustomErrorName}', but it reverted with a different custom error`,
              );
            } else {
              assert(
                false,
                `Expected transaction to be reverted with custom error '${expectedCustomErrorName}', but it reverted with custom error '${actualCustomError.name}'`,
              );
            }
          }
        } else {
          const _exhaustiveCheck: never = decodedReturnData;
        }
      };

      const derivedPromise = Promise.resolve(this._obj).then(
        onSuccess,
        onError,
      );

      // needed for .withArgs
      chaiUtils.flag(this, REVERTED_WITH_CUSTOM_ERROR_CALLED, true);
      this.promise = derivedPromise;

      this.then = derivedPromise.then.bind(derivedPromise);
      this.catch = derivedPromise.catch.bind(derivedPromise);

      return this;
    },
  );
}

function validateInput(
  obj: any,
<<<<<<< HEAD:packages/hardhat-chai-matchers/src/internal/reverted/revertedWithCustomError.ts
  contract: EthersT.BaseContract,
  expectedCustomErrorName: string
): { iface: EthersT.Interface; expectedCustomError: EthersT.ErrorFragment } {
=======
  contract: BaseContract,
  expectedCustomErrorName: string,
  args: any[],
): { iface: Interface; expectedCustomError: ErrorFragment } {
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/src/internal/matchers/reverted/revertedWithCustomError.ts
  try {
    // check the case where users forget to pass the contract as the first
    // argument
    if (typeof contract === "string" || contract?.interface === undefined) {
      // discard subject since it could potentially be a rejected promise
      throw new HardhatError(
        HardhatError.ERRORS.CHAI_MATCHERS.GENERAL.FIRST_ARGUMENT_MUST_BE_A_CONTRACT,
      );
    }

    // validate custom error name
    if (typeof expectedCustomErrorName !== "string") {
      throw new HardhatError(
        HardhatError.ERRORS.CHAI_MATCHERS.GENERAL.STRING_EXPECTED_AS_CUSTOM_ERROR_NAME,
      );
    }

    const iface = contract.interface;
    const expectedCustomError = iface.getError(expectedCustomErrorName);

    // check that interface contains the given custom error
    if (expectedCustomError === null) {
      throw new HardhatError(
        HardhatError.ERRORS.CHAI_MATCHERS.GENERAL.CONTRACT_DOES_NOT_HAVE_CUSTOM_ERROR,
        {
          customErrorName: expectedCustomErrorName,
        },
      );
    }

<<<<<<< HEAD:packages/hardhat-chai-matchers/src/internal/reverted/revertedWithCustomError.ts
=======
    if (args.length > 0) {
      throw new HardhatError(
        HardhatError.ERRORS.CHAI_MATCHERS.GENERAL.REVERT_INVALID_ARGUMENTS_LENGTH,
      );
    }

>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/src/internal/matchers/reverted/revertedWithCustomError.ts
    return { iface, expectedCustomError };
  } catch (e) {
    // if the input validation fails, we discard the subject since it could
    // potentially be a rejected promise
    Promise.resolve(obj).catch(() => {});
    throw e;
  }
}

export async function revertedWithCustomErrorWithArgs(
  context: any,
  Assertion: Chai.AssertionStatic,
<<<<<<< HEAD:packages/hardhat-chai-matchers/src/internal/reverted/revertedWithCustomError.ts
  _utils: Chai.ChaiUtils,
=======
  _chaiUtils: Chai.ChaiUtils,
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/src/internal/matchers/reverted/revertedWithCustomError.ts
  expectedArgs: any[],
  ssfi: Ssfi,
): Promise<void> {
  const negated = false; // .withArgs cannot be negated
  const assert = buildAssert(negated, ssfi);

  const customErrorAssertionData: CustomErrorAssertionData =
    context.customErrorData;

  if (customErrorAssertionData === undefined) {
    throw new HardhatError(
      HardhatError.ERRORS.CHAI_MATCHERS.GENERAL.WITH_ARGS_FORBIDDEN,
    );
  }

  const { contractInterface, customError, returnData } =
    customErrorAssertionData;

  const errorFragment = contractInterface.getError(customError.name);

  assertIsNotNull(errorFragment, "errorFragment");

  // We transform ether's Array-like object into an actual array as it's safer
  const actualArgs = resultToArray(
    contractInterface.decodeErrorResult(errorFragment, returnData),
  );

<<<<<<< HEAD:packages/hardhat-chai-matchers/src/internal/reverted/revertedWithCustomError.ts
  new Assertion(actualArgs).to.have.same.length(
    expectedArgs.length,
    `expected ${expectedArgs.length} args but got ${actualArgs.length}`
=======
  assertArgsArraysEqual(
    Assertion,
    expectedArgs,
    actualArgs,
    `"${customError.name}" custom error`,
    "error",
    assert,
    ssfi,
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/src/internal/matchers/reverted/revertedWithCustomError.ts
  );

  for (const [i, actualArg] of actualArgs.entries()) {
    const expectedArg = expectedArgs[i];
    if (typeof expectedArg === "function") {
      const errorPrefix = `The predicate for custom error argument with index ${i}`;
      try {
        assert(
          expectedArg(actualArg),
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
    } else if (Array.isArray(expectedArg)) {
      const expectedLength = expectedArg.length;
      const actualLength = actualArg.length;
      assert(
        expectedLength === actualLength,
        `Expected the ${ordinal(i + 1)} argument of the "${
          customError.name
        }" custom error to have ${expectedLength} ${
          expectedLength === 1 ? "element" : "elements"
        }, but it has ${actualLength}`
      );
      new Assertion(actualArg).to.deep.equal(expectedArg);
    } else {
      new Assertion(actualArg).to.equal(expectedArg);
    }
  }
}
