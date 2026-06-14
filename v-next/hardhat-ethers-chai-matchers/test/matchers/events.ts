import type {
  AnotherContract,
  EventsContract,
  MatchersContract,
  OverrideEventContract,
} from "../helpers/contracts.js";
import type { HardhatEthers } from "@nomicfoundation/hardhat-ethers/types";

import { before, beforeEach, describe, it } from "node:test";

import { HardhatError } from "@nomicfoundation/hardhat-errors";
import {
  assertRejectsWithHardhatError,
  useEphemeralFixtureProject,
} from "@nomicfoundation/hardhat-test-utils";
import { expect, AssertionError } from "chai";
import { id } from "ethers/hash";
import { hexlify, toUtf8Bytes, zeroPadValue } from "ethers/utils";
import { Wallet } from "ethers/wallet";

import { addChaiMatchers } from "../../src/internal/add-chai-matchers.js";
import { anyUint, anyValue } from "../../src/withArgs.js";
import { initEnvironment } from "../helpers/helpers.js";

addChaiMatchers();

describe(".to.emit (contract events)", { timeout: 60000 }, () => {
  let contract: EventsContract;
  let otherContract: AnotherContract;
  let overrideEventContract: OverrideEventContract;
  let matchers: MatchersContract;

  describe("with the in-process hardhat network", () => {
    useEphemeralFixtureProject("hardhat-project");
    runTests();
  });

  function runTests() {
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
    beforeEach(async function () {
      otherContract = await (
        await this.hre.ethers.getContractFactory("AnotherContract")
      ).deploy();
=======
    let ethers: HardhatEthers;

    before(async () => {
      ({ ethers } = await initEnvironment("events"));
    });

    beforeEach(async () => {
      otherContract = await ethers.deployContract("AnotherContract");
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts

      contract = await (
        await ethers.getContractFactory<[string], EventsContract>("Events")
      ).deploy(await otherContract.getAddress());

      overrideEventContract = await (
        await ethers.getContractFactory<[], OverrideEventContract>(
          "OverrideEventContract",
        )
      ).deploy();

      const Matchers = await ethers.getContractFactory<[], MatchersContract>(
        "Matchers",
      );
      matchers = await Matchers.deploy();
    });

    it("should fail when expecting an event that's not in the contract", async () => {
      await expect(
        expect(contract.doNotEmit()).to.emit(contract, "NonexistentEvent"),
      ).to.be.eventually.rejectedWith(
        AssertionError,
        'Event "NonexistentEvent" doesn\'t exist in the contract',
      );
    });

    it("should fail when expecting an event that's not in the contract to NOT be emitted", async () => {
      await expect(
        expect(contract.doNotEmit()).not.to.emit(contract, "NonexistentEvent"),
      ).to.be.eventually.rejectedWith(
        AssertionError,
        'Event "NonexistentEvent" doesn\'t exist in the contract',
      );
    });

<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
    it("Should detect events without arguments", async function () {
=======
    it("should fail when matcher is called with too many arguments", async () => {
      await assertRejectsWithHardhatError(
        () =>
          // @ts-expect-error -- force error scenario: emit should not be called with more than two arguments
          expect(contract.emitUint(1)).not.to.emit(contract, "WithoutArgs", 1),
        HardhatError.ERRORS.CHAI_MATCHERS.GENERAL.EMIT_EXPECTS_TWO_ARGUMENTS,
        {},
      );
    });

    it("should detect events without arguments", async () => {
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
      await expect(contract.emitWithoutArgs()).to.emit(contract, "WithoutArgs");
    });

    it("should fail when expecting an event that wasn't emitted", async () => {
      await expect(
        expect(contract.doNotEmit()).to.emit(contract, "WithoutArgs"),
      ).to.be.eventually.rejectedWith(
        AssertionError,
        'Expected event "WithoutArgs" to be emitted, but it wasn\'t',
      );
    });

    it("should fail when expecting a specific event NOT to be emitted but it WAS", async () => {
      await expect(
        expect(contract.emitWithoutArgs()).to.not.emit(contract, "WithoutArgs"),
      ).to.be.eventually.rejectedWith(
        AssertionError,
        'Expected event "WithoutArgs" NOT to be emitted, but it was',
      );
    });

    describe(".withArgs", () => {
      it("should fail when used with .not.", async () => {
        expect(() =>
          expect(contract.emitUint(1))
            .not.to.emit(contract, "WithUintArg")
            .withArgs(1),
        ).to.throw(Error, "Do not combine .not. with .withArgs()");
      });

      it("should fail when used with .not, subject is a rejected promise", async () => {
        expect(() =>
          expect(matchers.revertsWithoutReason())
            .not.to.emit(contract, "WithUintArg")
            .withArgs(1),
        ).to.throw(Error, "Do not combine .not. with .withArgs()");
      });

      it("should fail if withArgs is called on its own", async () => {
        expect(() =>
          expect(contract.emitUint(1))
            // @ts-expect-error -- force "withArgs" to be called on its own
            .withArgs(1),
        ).to.throw(
          Error,
          "withArgs can only be used in combination with a previous .emit or .revertedWithCustomError assertion",
        );
      });

<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
      describe("with a uint argument", function () {
        it("Should match the argument", async function () {
=======
      it("should verify zero arguments", async () => {
        await expect(contract.emitWithoutArgs())
          .to.emit(contract, "WithoutArgs")
          .withArgs();
      });

      describe("with a uint argument", () => {
        it("should match the argument", async () => {
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          await expect(contract.emitUint(1))
            .to.emit(contract, "WithUintArg")
            .withArgs(1);
        });

        it("should fail when the input argument doesn't match the event argument", async () => {
          await expect(
            expect(contract.emitUint(1))
              .to.emit(contract, "WithUintArg")
              .withArgs(2),
          ).to.be.eventually.rejectedWith(
            AssertionError,
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
            "expected 1 to equal 2"
=======
            'Error in "WithUintArg" event: Error in the 1st argument assertion: expected 1 to equal 2.',
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          );
        });

        it("should fail when too many arguments are given", async () => {
          await expect(
            expect(contract.emitUint(1))
              .to.emit(contract, "WithUintArg")
              .withArgs(1, 3),
          ).to.be.eventually.rejectedWith(
            AssertionError,
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
            'Expected "WithUintArg" event to have 2 argument(s), but it has 1'
=======
            'Error in "WithUintArg" event: Expected arguments array to have length 2, but it has 1',
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          );
        });
      });

      describe("with an address argument", () => {
        const addressable = Wallet.createRandom();
        const { address } = addressable;
        const otherAddressable = Wallet.createRandom();
        const { address: otherAddress } = otherAddressable;

        it("should match the argument", async () => {
          await expect(contract.emitAddress(addressable))
            .to.emit(contract, "WithAddressArg")
            .withArgs(address);
        });

        it("should match addressable arguments", async () => {
          await expect(contract.emitAddress(addressable))
            .to.emit(contract, "WithAddressArg")
            .withArgs(addressable);
        });

        it("should fail when the input argument doesn't match the addressable event argument", async () => {
          await expect(
            expect(contract.emitAddress(addressable))
              .to.emit(contract, "WithAddressArg")
              .withArgs(otherAddressable),
          ).to.be.eventually.rejectedWith(
            AssertionError,
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
            `expected '${address}' to equal '${otherAddress}'`
=======
            `Error in "WithAddressArg" event: Error in the 1st argument assertion: expected '${address}' to equal '${otherAddress}'`,
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          );
        });

        it("should fail when the input argument doesn't match the address event argument", async () => {
          await expect(
            expect(contract.emitAddress(addressable))
              .to.emit(contract, "WithAddressArg")
              .withArgs(otherAddress),
          ).to.be.eventually.rejectedWith(
            AssertionError,
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
            `expected '${address}' to equal '${otherAddress}'`
=======
            `Error in "WithAddressArg" event: Error in the 1st argument assertion: expected '${address}' to equal '${otherAddress}'`,
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          );
        });

        it("should fail when too many arguments are given", async () => {
          await expect(
            expect(contract.emitAddress(addressable))
              .to.emit(contract, "WithAddressArg")
              .withArgs(address, otherAddress),
          ).to.be.eventually.rejectedWith(
            AssertionError,
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
            'Expected "WithAddressArg" event to have 2 argument(s), but it has 1'
=======
            'Error in "WithAddressArg" event: Expected arguments array to have length 2, but it has 1',
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          );
        });
      });

      const string1 = "string1";
      const string1Bytes = ethers.hexlify(ethers.toUtf8Bytes(string1));
      const string2 = "string2";
      const string2Bytes = ethers.hexlify(ethers.toUtf8Bytes(string2));

      // for abbreviating long strings in diff views like chai does:
      function abbrev(longString: string): string {
        return `${longString.substring(0, 37)}…`;
      }

<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
      function hash(s: string): string {
        return ethers.keccak256(s);
      }

      describe("with a string argument", function () {
        it("Should match the argument", async function () {
=======
      function formatHash(str: string, hashFn = id) {
        const hash = hashFn(str);
        return {
          str,
          hash,
          abbrev: abbrev(hash),
        };
      }

      function formatBytes(str: string) {
        const bytes = hexlify(toUtf8Bytes(str));
        const bytes32 = zeroPadValue(bytes, 32);
        return {
          ...formatHash(str),
          bytes,
          bytes32,
          abbrev32: abbrev(hexlify(bytes32)),
        };
      }

      const str1 = formatBytes("string1");
      const str2 = formatBytes("string2");

      describe("with a string argument", () => {
        it("should match the argument", async () => {
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          await expect(contract.emitString("string"))
            .to.emit(contract, "WithStringArg")
            .withArgs("string");
        });

        it("should fail when the input argument doesn't match the event argument", async () => {
          await expect(
            expect(contract.emitString(string1))
              .to.emit(contract, "WithStringArg")
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
              .withArgs(string2)
          ).to.be.eventually.rejectedWith(
            AssertionError,
            `expected '${string1}' to equal '${string2}'`
=======
              .withArgs(str2.str),
          ).to.be.eventually.rejectedWith(
            AssertionError,
            `expected '${str1.str}' to equal '${str2.str}'`,
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          );
        });
      });

<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
      describe("with an indexed string argument", function () {
        it("Should match the argument", async function () {
          await expect(contract.emitIndexedString(string1))
=======
      describe("with an indexed string argument", () => {
        it("should match the argument", async () => {
          await expect(contract.emitIndexedString(str1.str))
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
            .to.emit(contract, "WithIndexedStringArg")
            .withArgs(string1);
        });

        it("should fail when the input argument doesn't match the event argument", async () => {
          await expect(
            expect(contract.emitIndexedString(string1))
              .to.emit(contract, "WithIndexedStringArg")
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
              .withArgs(string2)
          ).to.be.eventually.rejectedWith(
            AssertionError,
            `The actual value was an indexed and hashed value of the event argument. The expected value provided to the assertion was hashed to produce ${hash(
              string2Bytes
            )}. The actual hash and the expected hash did not match: expected '${abbrev(
              hash(string1Bytes)
            )}' to equal '${abbrev(hash(string2Bytes))}'`
          );
        });

        it("Should match the event argument with a hash value", async function () {
=======
              .withArgs(str2.str),
          ).to.be.eventually.rejectedWith(
            AssertionError,
            `Error in "WithIndexedStringArg" event: Error in the 1st argument assertion: The actual value was an indexed and hashed value of the event argument. The expected value provided to the assertion was hashed to produce ${str2.hash}. The actual hash and the expected hash ${str1.hash} did not match: expected '${str1.abbrev}' to equal '${str2.abbrev}'`,
          );
        });

        it("should fail if expected argument is the hash not the pre-image", async () => {
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          await expect(
            expect(contract.emitIndexedString(string1))
              .to.emit(contract, "WithIndexedStringArg")
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
              .withArgs(hash(string1Bytes))
          ).to.be.eventually.rejectedWith(
            AssertionError,
            "The actual value was an indexed and hashed value of the event argument. The expected value provided to the assertion should be the actual event argument (the pre-image of the hash). You provided the hash itself. Please supply the the actual event argument (the pre-image of the hash) instead."
          );
        });

        it("Should fail when trying to match the event argument with an incorrect hash value", async function () {
          const expectedHash = hash(string1Bytes);
          const incorrectHash = hash(string2Bytes);
=======
              .withArgs(str1.hash),
          ).to.be.eventually.rejectedWith(
            AssertionError,
            "The actual value was an indexed and hashed value of the event argument. The expected value provided to the assertion should be the actual event argument (the pre-image of the hash). You provided the hash itself. Please supply the actual event argument (the pre-image of the hash) instead",
          );
        });

        it("should fail when trying to match the event argument with an incorrect hash value", async () => {
          const incorrect = formatHash(str2.hash, ethers.keccak256);
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          await expect(
            expect(contract.emitIndexedString(string1))
              .to.emit(contract, "WithIndexedStringArg")
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
              .withArgs(incorrectHash)
          ).to.be.eventually.rejectedWith(
            AssertionError,
            `The actual value was an indexed and hashed value of the event argument. The expected value provided to the assertion was hashed to produce ${hash(
              incorrectHash
            )}. The actual hash and the expected hash did not match: expected '${abbrev(
              expectedHash
            )}' to equal '${abbrev(hash(incorrectHash))}'`
=======
              .withArgs(incorrect.str),
          ).to.be.eventually.rejectedWith(
            AssertionError,
            `Error in "WithIndexedStringArg" event: Error in the 1st argument assertion: The actual value was an indexed and hashed value of the event argument. The expected value provided to the assertion was hashed to produce ${incorrect.hash}. The actual hash and the expected hash ${str1.hash} did not match: expected '${str1.abbrev}' to equal '${incorrect.abbrev}`,
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          );
        });
      });

<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
      describe("with a bytes argument", function () {
        it("Should match the argument", async function () {
          await expect(contract.emitBytes(string1Bytes))
=======
      describe("with a bytes argument", () => {
        it("should match the argument", async () => {
          await expect(contract.emitBytes(str1.bytes))
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
            .to.emit(contract, "WithBytesArg")
            .withArgs(string1Bytes);
        });

        it("should fail when the input argument doesn't match the event argument", async () => {
          await expect(
            expect(contract.emitBytes(string2Bytes))
              .to.emit(contract, "WithBytesArg")
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
              .withArgs(string1Bytes)
          ).to.be.eventually.rejectedWith(
            AssertionError,
            `expected '${string2Bytes}' to equal '${string1Bytes}'`
=======
              .withArgs(str1.str),
          ).to.be.eventually.rejectedWith(
            AssertionError,
            `Error in "WithBytesArg" event: Error in the 1st argument assertion: expected '${str2.bytes}' to equal '${str1.str}'`,
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          );
        });
      });

<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
      describe("with an indexed bytes argument", function () {
        it("Should match the argument", async function () {
          await expect(contract.emitIndexedBytes(string1Bytes))
=======
      describe("with an indexed bytes argument", () => {
        it("should match the argument", async () => {
          await expect(contract.emitIndexedBytes(str1.bytes))
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
            .to.emit(contract, "WithIndexedBytesArg")
            .withArgs(string1Bytes);
        });

        it("should fail when the input argument doesn't match the event argument", async () => {
          await expect(
            expect(contract.emitIndexedBytes(string2Bytes))
              .to.emit(contract, "WithIndexedBytesArg")
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
              .withArgs(string1Bytes)
          ).to.be.eventually.rejectedWith(
            AssertionError,
            `The actual value was an indexed and hashed value of the event argument. The expected value provided to the assertion was hashed to produce ${hash(
              string1Bytes
            )}. The actual hash and the expected hash did not match: expected '${abbrev(
              hash(string2Bytes)
            )}' to equal '${abbrev(hash(string1Bytes))}'`
          );
        });

        it("Should match the event argument with a hash value", async function () {
=======
              .withArgs(str1.str),
          ).to.be.eventually.rejectedWith(
            AssertionError,
            `Error in "WithIndexedBytesArg" event: Error in the 1st argument assertion: The actual value was an indexed and hashed value of the event argument. The expected value provided to the assertion was hashed to produce ${str1.hash}. The actual hash and the expected hash ${str2.hash} did not match: expected '${str2.abbrev}' to equal '${str1.abbrev}'`,
          );
        });

        it("should fail the passerd argument is the hash, not the pre-image", async () => {
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          await expect(
            expect(contract.emitIndexedBytes(string1Bytes))
              .to.emit(contract, "WithIndexedBytesArg")
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
              .withArgs(hash(string1Bytes))
          ).to.be.eventually.rejectedWith(
            AssertionError,
            "The actual value was an indexed and hashed value of the event argument. The expected value provided to the assertion should be the actual event argument (the pre-image of the hash). You provided the hash itself. Please supply the the actual event argument (the pre-image of the hash) instead."
=======
              .withArgs(str1.hash),
          ).to.be.eventually.rejectedWith(
            AssertionError,
            "The actual value was an indexed and hashed value of the event argument. The expected value provided to the assertion should be the actual event argument (the pre-image of the hash). You provided the hash itself. Please supply the actual event argument (the pre-image of the hash) instead.",
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          );
        });
      });

<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
      const string1Bytes32 = ethers.zeroPadValue(string1Bytes, 32);
      const string2Bytes32 = ethers.zeroPadValue(string2Bytes, 32);
      describe("with a bytes32 argument", function () {
        it("Should match the argument", async function () {
          await expect(contract.emitBytes32(string1Bytes32))
=======
      describe("with a bytes32 argument", () => {
        it("should match the argument", async () => {
          await expect(contract.emitBytes32(str1.bytes32))
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
            .to.emit(contract, "WithBytes32Arg")
            .withArgs(string1Bytes32);
        });

        it("should fail when the input argument doesn't match the event argument", async () => {
          await expect(
            expect(contract.emitBytes32(string2Bytes32))
              .to.emit(contract, "WithBytes32Arg")
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
              .withArgs(string1Bytes32)
          ).to.be.eventually.rejectedWith(
            AssertionError,
            `expected '${abbrev(
              ethers.hexlify(string2Bytes32)
            )}' to equal '${abbrev(ethers.hexlify(string1Bytes32))}'`
=======
              .withArgs(str1.bytes32),
          ).to.be.eventually.rejectedWith(
            AssertionError,
            `Error in "WithBytes32Arg" event: Error in the 1st argument assertion: expected '${str2.abbrev32}' to equal '${str1.abbrev32}'`,
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          );
        });
      });

<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
      describe("with an indexed bytes32 argument", function () {
        it("Should match the argument", async function () {
          await expect(contract.emitIndexedBytes32(string1Bytes32))
=======
      describe("with an indexed bytes32 argument", () => {
        it("should match the argument", async () => {
          await expect(contract.emitIndexedBytes32(str1.bytes32))
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
            .to.emit(contract, "WithIndexedBytes32Arg")
            .withArgs(string1Bytes32);
        });

        it("should fail when the input argument doesn't match the event argument", async () => {
          await expect(
            expect(contract.emitIndexedBytes32(string2Bytes32))
              .to.emit(contract, "WithIndexedBytes32Arg")
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
              .withArgs(string1Bytes32)
          ).to.be.eventually.rejectedWith(
            AssertionError,
            `expected '${abbrev(
              ethers.hexlify(string2Bytes32)
            )}' to equal '${abbrev(ethers.hexlify(string1Bytes32))}'`
=======
              .withArgs(str1.bytes32),
          ).to.be.eventually.rejectedWith(
            AssertionError,
            `Error in "WithIndexedBytes32Arg" event: Error in the 1st argument assertion: expected '${str2.abbrev32}' to equal '${str1.abbrev32}'`,
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          );
        });

        it("Should match the event argument with a hash value", async function () {
          await expect(contract.emitIndexedBytes32(string1Bytes32))
            .to.emit(contract, "WithIndexedBytes32Arg")
            .withArgs(string1Bytes32);
        });
      });

      describe("with a uint array argument", () => {
        it("should succeed when expectations are met", async () => {
          await expect(contract.emitUintArray(1, 2))
            .to.emit(contract, "WithUintArray")
            .withArgs([1, 2]);
        });

        it("should fail when expectations are not met", async () => {
          await expect(
            expect(contract.emitUintArray(1, 2))
              .to.emit(contract, "WithUintArray")
              .withArgs([3, 4]),
          ).to.be.eventually.rejectedWith(
            AssertionError,
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
            "expected 1 to equal 3"
          );
        });

        it("Should fail when the arrays don't have the same length", async function () {
          await expect(
            expect(contract.emitUintArray(1, 2))
=======
            `Error in "WithUintArray" event: Error in the 1st argument assertion: Error in the 1st argument assertion: expected 1 to equal 3.`,
          );
        });

        describe("nested predicate", () => {
          it("should succeed when predicate passes", async () => {
            await expect(contract.emitUintArray(1, 2))
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
              .to.emit(contract, "WithUintArray")
              .withArgs([1])
          ).to.be.eventually.rejectedWith(
            AssertionError,
            'Expected the 1st argument of the "WithUintArray" event to have 1 element, but it has 2'
          );

<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
          await expect(
            expect(contract.emitUintArray(1, 2))
              .to.emit(contract, "WithUintArray")
              .withArgs([1, 2, 3])
          ).to.be.eventually.rejectedWith(
            AssertionError,
            'Expected the 1st argument of the "WithUintArray" event to have 3 elements, but it has 2'
          );
        });
      });

      describe("with a bytes32 array argument", function () {
        it("Should succeed when expectations are met", async function () {
          await expect(
            contract.emitBytes32Array(
              `0x${"aa".repeat(32)}`,
              `0x${"bb".repeat(32)}`
            )
          )
=======
          it("should fail when predicate returns false", async () => {
            await expect(
              expect(contract.emitUintArray(1, 2))
                .to.emit(contract, "WithUintArray")
                .withArgs([() => false, 4]),
            ).to.be.eventually.rejectedWith(
              AssertionError,
              `Error in "WithUintArray" event: Error in the 1st argument assertion: Error in the 1st argument assertion: The predicate did not return true`,
            );
          });

          it("should fail when predicate reverts", async () => {
            await expect(
              expect(contract.emitUintArray(1, 2))
                .to.emit(contract, "WithUintArray")
                .withArgs([
                  () => {
                    throw new Error("user error");
                  },
                  4,
                ]),
            ).to.be.eventually.rejectedWith(
              AssertionError,
              `Error in "WithUintArray" event: Error in the 1st argument assertion: Error in the 1st argument assertion: The predicate threw when called: user error`,
            );
          });
        });

        describe("arrays different length", () => {
          it("should fail when the array is shorter", async () => {
            await expect(
              expect(contract.emitUintArray(1, 2))
                .to.emit(contract, "WithUintArray")
                .withArgs([1]),
            ).to.be.eventually.rejectedWith(
              AssertionError,
              'Error in "WithUintArray" event: Error in the 1st argument assertion: Expected arguments array to have length 1, but it has 2',
            );
          });

          it("should fail when the array is longer", async () => {
            await expect(
              expect(contract.emitUintArray(1, 2))
                .to.emit(contract, "WithUintArray")
                .withArgs([1, 2, 3]),
            ).to.be.eventually.rejectedWith(
              AssertionError,
              'Error in "WithUintArray" event: Error in the 1st argument assertion: Expected arguments array to have length 3, but it has 2',
            );
          });
        });
      });

      describe("with a bytes32 array argument", () => {
        const aa = `0x${"aa".repeat(32)}`;
        const bb = `0x${"bb".repeat(32)}`;
        const cc = `0x${"cc".repeat(32)}`;
        const dd = `0x${"dd".repeat(32)}`;

        it("should succeed when expectations are met", async () => {
          await expect(contract.emitBytes32Array(aa, bb))
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
            .to.emit(contract, "WithBytes32Array")
            .withArgs([`0x${"aa".repeat(32)}`, `0x${"bb".repeat(32)}`]);
        });

        it("should fail when expectations are not met", async () => {
          await expect(
            expect(
              contract.emitBytes32Array(
                `0x${"aa".repeat(32)}`,
                `0x${"bb".repeat(32)}`
              )
            )
              .to.emit(contract, "WithBytes32Array")
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
              .withArgs([`0x${"cc".repeat(32)}`, `0x${"dd".repeat(32)}`])
          ).to.be.eventually.rejectedWith(
            AssertionError,
            `expected '${abbrev(`0x${"aa".repeat(32)}`)}' to equal '${abbrev(
              `0x${"cc".repeat(32)}`
            )}'`
=======
              .withArgs([cc, dd]),
          ).to.be.eventually.rejectedWith(
            AssertionError,
            `Error in "WithBytes32Array" event: Error in the 1st argument assertion: Error in the 1st argument assertion: expected '${abbrev(
              aa,
            )}' to equal '${abbrev(cc)}'`,
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          );
        });
      });

      describe("with a struct argument", () => {
        it("should succeed when expectations are met", async () => {
          await expect(contract.emitStruct(1, 2))
            .to.emit(contract, "WithStructArg")
            .withArgs([1, 2]);
        });

        it("should fail when expectations are not met", async () => {
          await expect(
            expect(contract.emitStruct(1, 2))
              .to.emit(contract, "WithStructArg")
              .withArgs([3, 4]),
          ).to.be.eventually.rejectedWith(
            AssertionError,
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
            "expected 1 to equal 3"
=======
            'Error in "WithStructArg" event: Error in the 1st argument assertion: Error in the 1st argument assertion: expected 1 to equal 3.',
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          );
        });
      });

      describe("with multiple arguments", () => {
        it("should successfully match the arguments", async () => {
          await expect(contract.emitTwoUints(1, 2))
            .to.emit(contract, "WithTwoUintArgs")
            .withArgs(1, 2);
        });

        it("should fail when the first argument isn't matched", async () => {
          await expect(
            expect(contract.emitTwoUints(1, 2))
              .to.emit(contract, "WithTwoUintArgs")
              .withArgs(2, 2),
          ).to.be.eventually.rejectedWith(
            AssertionError,
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
            "expected 1 to equal 2"
=======
            'Error in "WithTwoUintArgs" event: Error in the 1st argument assertion: expected 1 to equal 2',
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          );
        });

        it("should fail when the second argument isn't matched", async () => {
          await expect(
            expect(contract.emitTwoUints(1, 2))
              .to.emit(contract, "WithTwoUintArgs")
              .withArgs(1, 1),
          ).to.be.eventually.rejectedWith(
            AssertionError,
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
            "expected 2 to equal 1"
=======
            'Error in "WithTwoUintArgs" event: Error in the 2nd argument assertion: expected 2 to equal 1.',
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          );
        });

        it("should fail when too many arguments are supplied", async () => {
          await expect(
            expect(contract.emitTwoUints(1, 2))
              .to.emit(contract, "WithTwoUintArgs")
              .withArgs(1, 2, 3, 4),
          ).to.be.eventually.rejectedWith(
            AssertionError,
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
            'Expected "WithTwoUintArgs" event to have 4 argument(s), but it has 2'
=======
            'Error in "WithTwoUintArgs" event: Expected arguments array to have length 4, but it has 2',
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          );
        });

        it("should fail when too few arguments are supplied", async () => {
          await expect(
            expect(contract.emitTwoUints(1, 2))
              .to.emit(contract, "WithTwoUintArgs")
              .withArgs(1),
          ).to.be.eventually.rejectedWith(
            AssertionError,
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
            'Expected "WithTwoUintArgs" event to have 1 argument(s), but it has 2'
=======
            'Error in "WithTwoUintArgs" event: Expected arguments array to have length 1, but it has 2',
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          );
        });

        describe("should handle argument predicates", () => {
          it("should pass when a predicate argument returns true", async () => {
            await expect(contract.emitTwoUints(1, 2))
              .to.emit(contract, "WithTwoUintArgs")
              .withArgs(anyValue, anyUint);
          });

          it("should fail when a predicate argument returns false", async () => {
            await expect(
              expect(contract.emitTwoUints(1, 2))
                .to.emit(contract, "WithTwoUintArgs")
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
                .withArgs(1, () => false)
            ).to.be.eventually.rejectedWith(
              AssertionError,
              "The predicate for the 2nd event argument returned false"
=======
                .withArgs(1, () => false),
            ).to.be.rejectedWith(
              AssertionError,
              'Error in "WithTwoUintArgs" event: Error in the 2nd argument assertion: The predicate did not return true',
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
            );
          });

          it("should fail when a predicate argument throws an error", async () => {
            await expect(
              expect(contract.emitTwoUints(1, 2))
                .to.emit(contract, "WithTwoUintArgs")
                .withArgs(() => {
                  throw new Error("user-defined error");
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
                }, "foo")
            ).to.be.rejectedWith(Error, "user-defined error");
=======
                }, "foo"),
            ).to.be.rejectedWith(
              Error,
              'Error in "WithTwoUintArgs" event: Error in the 1st argument assertion: The predicate threw when called: user-defined error',
            );
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
          });

          describe("with predicate anyUint", () => {
            it("should fail when the event argument is a string", async () => {
              await expect(
                expect(contract.emitString("a string"))
                  .to.emit(contract, "WithStringArg")
                  .withArgs(anyUint),
              ).to.be.rejectedWith(
                AssertionError,
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
                "The predicate for the 1st event argument threw an AssertionError: anyUint expected its argument to be an integer, but its type was 'string'"
=======
                "Error in \"WithStringArg\" event: Error in the 1st argument assertion: The predicate threw when called: anyUint expected its argument to be an integer, but its type was 'string'",
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
              );
            });

            it("should fail when the event argument is negative", async () => {
              await expect(
                expect(contract.emitInt(-1))
                  .to.emit(contract, "WithIntArg")
                  .withArgs(anyUint),
              ).to.be.rejectedWith(
                AssertionError,
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
                "The predicate for the 1st event argument threw an AssertionError: anyUint expected its argument to be an unsigned integer, but it was negative, with value -1"
=======
                'Error in "WithIntArg" event: Error in the 1st argument assertion: The predicate threw when called: anyUint expected its argument to be an unsigned integer, but it was negative, with value -1',
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
              );
            });
          });
        });
      });
    });

    describe("With one call that emits two separate events", () => {
      it("should successfully catch each event independently", async () => {
        await expect(contract.emitUintAndString(1, "a string")).to.emit(
          contract,
          "WithUintArg",
        );
        await expect(contract.emitUintAndString(1, "a string")).to.emit(
          contract,
          "WithStringArg",
        );
      });

      describe("When detecting two events from one call (chaining)", () => {
        it("should succeed when both expected events are indeed emitted", async () => {
          await expect(contract.emitUintAndString(1, "a string"))
            .to.emit(contract, "WithUintArg")
            .and.to.emit(contract, "WithStringArg");
        });

        it("should succeed when the expected event is emitted and the unexpected event is not", async () => {
          await expect(contract.emitWithoutArgs())
            .to.emit(contract, "WithoutArgs")
            .and.not.to.emit(otherContract, "WithUintArg");
        });

        describe("When one of the expected events is emitted and the other is not", () => {
          it("should fail when the first expected event is emitted but the second is not", async () => {
            await expect(
              expect(contract.emitUint(1))
                .to.emit(contract, "WithUintArg")
                .and.to.emit(contract, "WithStringArg"),
            ).to.be.eventually.rejectedWith(
              AssertionError,
              'Expected event "WithStringArg" to be emitted, but it wasn\'t',
            );
          });

          it("should fail when the second expected event is emitted but the first is not", async () => {
            await expect(
              expect(contract.emitUint(1))
                .to.emit(contract, "WithStringArg")
                .and.to.emit(contract, "WithUintArg"),
            ).to.be.eventually.rejectedWith(
              AssertionError,
              'Expected event "WithStringArg" to be emitted, but it wasn\'t',
            );
          });
        });

        describe("When specifying .withArgs()", () => {
          it("should pass when expecting the correct args from the first event", async () => {
            await expect(contract.emitUintAndString(1, "a string"))
              .to.emit(contract, "WithUintArg")
              .withArgs(1)
              .and.to.emit(contract, "WithStringArg");
          });
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
          it("Should pass when expecting the correct args from the second event", async function () {
=======

          it("should pass when expecting the correct args from the second event", async () => {
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
            await expect(contract.emitUintAndString(1, "a string"))
              .to.emit(contract, "WithUintArg")
              .and.to.emit(contract, "WithStringArg")
              .withArgs("a string");
          });
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
          it("Should pass when expecting the correct args from both events", async function () {
=======

          it("should pass when expecting the correct args from both events", async () => {
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
            await expect(contract.emitUintAndString(1, "a string"))
              .to.emit(contract, "WithUintArg")
              .withArgs(1)
              .and.to.emit(contract, "WithStringArg")
              .withArgs("a string");
          });
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
          it("Should fail when expecting the wrong argument value for the first event", async function () {
=======

          it("should fail when expecting the wrong argument value for the first event", async () => {
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
            await expect(
              expect(contract.emitUintAndString(1, "a string"))
                .to.emit(contract, "WithUintArg")
                .withArgs(2)
                .and.to.emit(contract, "WithStringArg"),
            ).to.be.eventually.rejectedWith(
              AssertionError,
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
              "expected 1 to equal 2"
            );
          });
          it("Should fail when expecting the wrong argument value for the second event", async function () {
=======
              'Error in "WithUintArg" event: Error in the 1st argument assertion: expected 1 to equal 2.',
            );
          });

          it("should fail when expecting the wrong argument value for the second event", async () => {
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
            await expect(
              expect(contract.emitUintAndString(1, "a string"))
                .to.emit(contract, "WithUintArg")
                .and.to.emit(contract, "WithStringArg")
                .withArgs("a different string"),
            ).to.be.eventually.rejectedWith(
              AssertionError,
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
              "expected 'a string' to equal 'a different string'"
            );
          });
          it("Should fail when expecting too many arguments from the first event", async function () {
=======
              "Error in \"WithStringArg\" event: Error in the 1st argument assertion: expected 'a string' to equal 'a different string'",
            );
          });

          it("should fail when expecting too many arguments from the first event", async () => {
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
            await expect(
              expect(contract.emitUintAndString(1, "a string"))
                .to.emit(contract, "WithUintArg")
                .withArgs(1, 2)
                .and.to.emit(contract, "WithStringArg"),
            ).to.be.eventually.rejectedWith(
              AssertionError,
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
              'Expected "WithUintArg" event to have 2 argument(s), but it has 1'
            );
          });
          it("Should fail when expecting too many arguments from the second event", async function () {
=======
              'Error in "WithUintArg" event: Expected arguments array to have length 2, but it has 1',
            );
          });

          it("should fail when expecting too many arguments from the second event", async () => {
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
            await expect(
              expect(contract.emitUintAndString(1, "a string"))
                .to.emit(contract, "WithUintArg")
                .and.to.emit(contract, "WithStringArg")
                .withArgs("a different string", "yet another string"),
            ).to.be.eventually.rejectedWith(
              AssertionError,
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
              'Expected "WithStringArg" event to have 2 argument(s), but it has 1'
            );
          });
          it("Should fail when expecting too few arguments from the first event", async function () {
=======
              'Error in "WithStringArg" event: Expected arguments array to have length 2, but it has 1',
            );
          });

          it("should fail when expecting too few arguments from the first event", async () => {
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
            await expect(
              expect(
                contract.emitTwoUintsAndTwoStrings(
                  1,
                  2,
                  "a string",
                  "another string",
                ),
              )
                .to.emit(contract, "WithTwoUintArgs")
                .withArgs(1)
                .and.to.emit(contract, "WithTwoStringArgs"),
            ).to.be.eventually.rejectedWith(
              AssertionError,
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
              'Expected "WithTwoUintArgs" event to have 1 argument(s), but it has 2'
            );
          });
          it("Should fail when expecting too few arguments from the second event", async function () {
=======
              'Error in "WithTwoUintArgs" event: Expected arguments array to have length 1, but it has 2',
            );
          });

          it("should fail when expecting too few arguments from the second event", async () => {
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
            await expect(
              expect(
                contract.emitTwoUintsAndTwoStrings(
                  1,
                  2,
                  "a string",
                  "another string",
                ),
              )
                .to.emit(contract, "WithTwoUintArgs")
                .and.to.emit(contract, "WithTwoStringArgs")
                .withArgs("a string"),
            ).to.be.eventually.rejectedWith(
              AssertionError,
<<<<<<< HEAD:packages/hardhat-chai-matchers/test/events.ts
              'Expected "WithTwoStringArgs" event to have 1 argument(s), but it has 2'
=======
              'Error in "WithTwoStringArgs" event: Expected arguments array to have length 1, but it has 2',
>>>>>>> 64ba9d80dc5d99bc8803d3cb6d6a9d5f8928e0c5:v-next/hardhat-ethers-chai-matchers/test/matchers/events.ts
            );
          });
        });

        describe("With a contract that emits the same event twice but with different arguments", () => {
          it("should pass when expectations are met", async () => {
            await expect(contract.emitUintTwice(1, 2))
              .to.emit(contract, "WithUintArg")
              .withArgs(1)
              .and.to.emit(contract, "WithUintArg")
              .withArgs(2);
          });

          it("should fail when the first event's argument is not matched", async () => {
            await expect(
              expect(contract.emitUintTwice(1, 2))
                .to.emit(contract, "WithUintArg")
                .withArgs(3)
                .and.to.emit(contract, "WithUintArg")
                .withArgs(2),
            ).to.be.eventually.rejectedWith(
              AssertionError,
              'The specified arguments ([ 3 ]) were not included in any of the 2 emitted "WithUintArg" events',
            );
          });

          it("should fail when the second event's argument is not matched", async () => {
            await expect(
              expect(contract.emitUintTwice(1, 2))
                .to.emit(contract, "WithUintArg")
                .withArgs(1)
                .and.to.emit(contract, "WithUintArg")
                .withArgs(3),
            ).to.be.eventually.rejectedWith(
              AssertionError,
              'The specified arguments ([ 3 ]) were not included in any of the 2 emitted "WithUintArg" events',
            );
          });

          it("should fail when none of the emitted events match the given argument", async () => {
            await expect(
              expect(contract.emitUintTwice(1, 2))
                .to.emit(contract, "WithUintArg")
                .withArgs(3),
            ).to.be.eventually.rejectedWith(
              AssertionError,
              'The specified arguments ([ 3 ]) were not included in any of the 2 emitted "WithUintArg" events',
            );
          });
        });
      });
    });

    describe("When nested events are emitted", () => {
      describe("With the nested event emitted from the same contract", () => {
        it("should pass when the expected event is emitted", async () => {
          await expect(contract.emitNestedUintFromSameContract(1))
            .to.emit(contract, "WithUintArg")
            .withArgs(1);
        });

        it("should fail when the expected event is not emitted", async () => {
          await expect(
            expect(contract.emitNestedUintFromSameContract(1)).to.emit(
              contract,
              "WithStringArg",
            ),
          ).to.be.eventually.rejectedWith(
            AssertionError,
            'Expected event "WithStringArg" to be emitted, but it wasn\'t',
          );
        });
      });

      describe("With the nested event emitted from a different contract", () => {
        it("should pass when the expected event is emitted", async () => {
          await expect(contract.emitNestedUintFromAnotherContract(1))
            .to.emit(otherContract, "WithUintArg")
            .withArgs(1);
        });

        it("should fail when the expected event is emitted but not by the contract that was passed", async () => {
          await expect(
            expect(contract.emitNestedUintFromAnotherContract(1))
              .to.emit(contract, "WithUintArg")
              .withArgs(1),
          ).to.be.eventually.rejectedWith(
            AssertionError,
            'Expected event "WithUintArg" to be emitted, but it wasn\'t',
          );
        });
      });
    });

    it("With executed transaction", async () => {
      const tx = await contract.emitWithoutArgs();
      await expect(tx).to.emit(contract, "WithoutArgs");
    });

    it("With transaction hash", async () => {
      const tx = await contract.emitWithoutArgs();
      await expect(tx.hash).to.emit(contract, "WithoutArgs");
    });

    describe("When event is overloaded", () => {
      it("should fail when the event name is ambiguous", async () => {
        await expect(
          expect(overrideEventContract.emitSimpleEventWithUintArg(1n)).to.emit(
            overrideEventContract,
            "simpleEvent",
          ),
        ).to.be.eventually.rejectedWith(
          AssertionError,
          `ambiguous event description (i.e. matches "simpleEvent(uint256)", "simpleEvent()")`,
        );
      });

      it("should pass when the event name is not ambiguous", async () => {
        await expect(overrideEventContract.emitSimpleEventWithUintArg(1n))
          .to.emit(overrideEventContract, "simpleEvent(uint256)")
          .withArgs(1);
        await expect(overrideEventContract.emitSimpleEventWithoutArg()).to.emit(
          overrideEventContract,
          "simpleEvent()",
        );
      });
    });
  }
});
