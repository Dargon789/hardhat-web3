<<<<<<< HEAD
import type { OutputControlledEmitter } from "../../src/internal/with-spinners";

import { assert } from "chai";
import sinon from "sinon";
import EventEmitter from "events";
import { withSpinners } from "../../src/internal/with-spinners";

describe("withSpinners", () => {
  let eventEmitter: OutputControlledEmitter;
=======
import { assert } from "chai";
import sinon from "sinon";
import EventEmitter from "events";
import * as spinners from "../../src/internal/with-spinners";

describe("withSpinners", () => {
  let eventEmitter: EventEmitter;
>>>>>>> fac1221b81 ("hardhat": patch)

  function containsArray(baseArray: Array<string | symbol>, values: string[]) {
    return values.every((value) => baseArray.includes(value));
  }

  beforeEach(() => {
<<<<<<< HEAD
    eventEmitter = new EventEmitter() as OutputControlledEmitter;
=======
    eventEmitter = new EventEmitter();
>>>>>>> fac1221b81 ("hardhat": patch)
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should attach the connection events", () => {
<<<<<<< HEAD
    const emitter = withSpinners(eventEmitter);
=======
    const emitter = spinners.withSpinners(eventEmitter);
>>>>>>> fac1221b81 ("hardhat": patch)
    assert.isTrue(
      containsArray(emitter.eventNames(), [
        "connection_start",
        "connection_success",
        "connection_failure",
      ])
    );
  });

  it("should attach the derivation events", () => {
<<<<<<< HEAD
    const emitter = withSpinners(eventEmitter);
=======
    const emitter = spinners.withSpinners(eventEmitter);
>>>>>>> fac1221b81 ("hardhat": patch)
    assert.isTrue(
      containsArray(emitter.eventNames(), [
        "derivation_start",
        "derivation_success",
        "derivation_failure",
        "derivation_progress",
      ])
    );
  });

  it("should attach the confirmation events", () => {
<<<<<<< HEAD
    const emitter = withSpinners(eventEmitter);
=======
    const emitter = spinners.withSpinners(eventEmitter);
>>>>>>> fac1221b81 ("hardhat": patch)
    assert.isTrue(
      containsArray(emitter.eventNames(), [
        "confirmation_start",
        "confirmation_success",
        "confirmation_failure",
      ])
    );
  });
});
