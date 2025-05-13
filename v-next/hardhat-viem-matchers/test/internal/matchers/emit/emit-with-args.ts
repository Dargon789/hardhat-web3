import type { HardhatViemHelpers } from "@nomicfoundation/hardhat-viem/types";
import type { HardhatRuntimeEnvironment } from "hardhat/types/hre";

import { before, beforeEach, describe, it } from "node:test";

import {
  assertRejects,
  useEphemeralFixtureProject,
} from "@nomicfoundation/hardhat-test-utils";
import hardhatViem from "@nomicfoundation/hardhat-viem";
import { createHardhatRuntimeEnvironment } from "hardhat/hre";

import hardhatViemMatchers from "../../../../src/index.js";
import { isExpectedError } from "../../../helpers/is-expected-error.js";

describe("emitWithArgs", () => {
  let hre: HardhatRuntimeEnvironment;
  let viem: HardhatViemHelpers;

  useEphemeralFixtureProject("hardhat-project");

  before(async () => {
    hre = await createHardhatRuntimeEnvironment({
      solidity: "0.8.24",
      plugins: [hardhatViem, hardhatViemMatchers],
    });

    await hre.tasks.getTask("compile").run({});
  });

  beforeEach(async () => {
    ({ viem } = await hre.network.connect());
  });

  it("should check that the event was emitted with the correct single argument", async () => {
    const contract = await viem.deployContract("Events");

    await viem.assertions.emitWithArgs(
      contract.write.emitInt([1n]),
      contract,
      "WithIntArg",
      [1n],
    );
  });

  it("should check that the event was emitted with the correct multiple arguments", async () => {
    const contract = await viem.deployContract("Events");

    await viem.assertions.emitWithArgs(
      contract.write.emitTwoUints([1n, 2n]),
      contract,
      "WithTwoUintArgs",
      [1n, 2n],
    );
  });

  it("should not throw if no args are passed and nothing is emitted", async () => {
    const contract = await viem.deployContract("Events");

    await viem.assertions.emitWithArgs(
      contract.write.emitWithoutArgs(),
      contract,
      "WithoutArgs",
      [],
    );
  });

  it("should throw because the event was not emitted with the correct single argument", async () => {
    const contract = await viem.deployContract("Events");

    await assertRejects(
      viem.assertions.emitWithArgs(
        contract.write.emitInt([1n]),
        contract,
        "WithIntArg",
        [2n],
      ),
      (error) =>
        isExpectedError(
          error,
          `The event arguments do not match the expected ones.`,
          [1n],
          [2n],
        ),
    );
  });

  it("should throw because the event was not emitted with the correct multiple arguments", async () => {
    const contract = await viem.deployContract("Events");

    await assertRejects(
      viem.assertions.emitWithArgs(
        contract.write.emitTwoUints([1n, 2n]),
        contract,
        "WithTwoUintArgs",
        [2n, "hello"],
      ),
      (error) =>
        isExpectedError(
          error,
          `The event arguments do not match the expected ones.`,
          [1n, 2n],
          [2n, "hello"],
        ),
    );
  });
});
