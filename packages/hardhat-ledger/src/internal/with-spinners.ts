import ora from "ora";
import EventEmitter from "events";

<<<<<<< HEAD
export type OutputControlledEmitter = EventEmitter & {
  isOutputEnabled: boolean;
};

export function withSpinners<T extends OutputControlledEmitter>(emitter: T): T {
=======
export function withSpinners<T extends EventEmitter>(emitter: T): T {
>>>>>>> fac1221b81 ("hardhat": patch)
  attachSpinner(emitter, {
    startText: "[hardhat-ledger] Connecting wallet",
    eventPrefix: "connection",
  });

  attachSpinner(emitter, {
    startText: "[hardhat-ledger] Waiting for confirmation",
    eventPrefix: "confirmation",
  });

  const derivationSpinner = attachSpinner(emitter, {
    startText: "[hardhat-ledger] Finding derivation path",
    eventPrefix: "derivation",
  });
<<<<<<< HEAD
  emitter.on("derivation_progress", (path: string, index: number) =>
    emitter.isOutputEnabled
      ? (derivationSpinner.text = `[hardhat-ledger] Deriving address #${index} (path "${path}")`)
      : undefined
=======
  emitter.on(
    "derivation_progress",
    (path: string, index: number) =>
      (derivationSpinner.text = `[hardhat-ledger] Deriving address #${index} (path "${path}")`)
>>>>>>> fac1221b81 ("hardhat": patch)
  );

  return emitter;
}

function attachSpinner(
<<<<<<< HEAD
  emitter: OutputControlledEmitter,
=======
  emmiter: EventEmitter,
>>>>>>> fac1221b81 ("hardhat": patch)
  spinnerOptions: {
    startText: string;
    eventPrefix: string;
  }
): ora.Ora {
  const { startText, eventPrefix } = spinnerOptions;
<<<<<<< HEAD
  const spinner = ora({ text: startText, discardStdin: false });

  emitter.on(`${eventPrefix}_start`, () =>
    emitter.isOutputEnabled ? spinner.start() : undefined
  );
  emitter.on(`${eventPrefix}_success`, () =>
    emitter.isOutputEnabled ? spinner.succeed() : undefined
  );
  emitter.on(`${eventPrefix}_failure`, () =>
    emitter.isOutputEnabled ? spinner.fail() : undefined
  );
=======
  const spinner = ora(startText);

  emmiter.on(`${eventPrefix}_start`, () => spinner.start());
  emmiter.on(`${eventPrefix}_success`, () => spinner.succeed());
  emmiter.on(`${eventPrefix}_failure`, () => spinner.fail());
>>>>>>> fac1221b81 ("hardhat": patch)

  return spinner;
}
