![Hardhat Banner](https://user-images.githubusercontent.com/176499/96893278-ebc67580-1460-11eb-9530-d5df3a3d65d0.png) [![NPM Package](https://img.shields.io/npm/v/hardhat.svg?style=flat-square)](https://www.npmjs.org/package/hardhat) [![GitPOAP Badge](https://public-api.gitpoap.io/v1/repo/NomicFoundation/hardhat/badge)](https://www.gitpoap.io/gh/NomicFoundation/hardhat)

---

> **🚀 Hardhat 3 alpha release is out! [Learn more.](https://hardhat.org/hardhat3-alpha)**

Hardhat is an Ethereum development environment for professionals. It facilitates performing frequent tasks, such as running tests, automatically checking code for mistakes or interacting with a smart contract. Check out the [plugin list](https://hardhat.org/plugins/) to use it with your existing tools.

Built by the [Nomic Foundation](https://nomic.foundation/) for the Ethereum community.

Join our [Hardhat Support Discord server](https://hardhat.org/discord) to stay up to date on new releases, plugins and tutorials.

---

> 💡 **The Nomic Foundation is hiring! Check [our open positions](https://www.nomic.foundation/jobs?utm_source=myALpQnzlM).**

---

## Documentation

On [Hardhat's website](https://hardhat.org) you will find:

- [Guides to get started](https://hardhat.org/getting-started/)
- [Hardhat Network](https://hardhat.org/hardhat-network/)
- [Plugin list](https://hardhat.org/plugins/)

# EDR - Ethereum Development Runtime

**EDR**, or **Ethereum Development Runtime** in full, is a library for creating developer tooling on top of the Ethereum Virtual Machine (EVM), such as an EVM debugger or state inspector.

EDR finds its origins in Hardhat Network but incorporates the lessons we have learned over the years to provide high-performance building blocks for EVM tooling. EDR is written in Rust and provides bindings for the Node API (TypeScript), making it accessible to JavaScript and TypeScript developers.

## Features

- **High-performance EVM execution** thanks to [REVM](https://github.com/bluealloy/revm/)
- **Multi-chain protocol support** with built-in providers for Ethereum L1 and OP Stack chains, and an extensible chain type system for custom chains.
- **Full Ethereum JSON-RPC provider** implementation with support for forking remote JSON-RPC endpoints, locally simulated chains, and configurable mining modes (auto-mine, interval, and mempool ordering).
- **`console.log` support** for Solidity with source-mapped logging and argument decoding.
- **Solidity stack traces** with source-mapped error reporting for reverts, panics, custom errors, and out-of-gas conditions.
- **Hierarchical call traces** with decoded function names, arguments, and event logs.
- **Step-level debug traces** with program counter, opcode, gas, stack, memory, and storage information.
- **Solidity test runner** with unit, fuzz (property-based), and invariant test execution, including Foundry-compatible cheatcodes, fork-mode testing against live networks, and counterexample shrinking.
- **Source-level code coverage** via Solidity instrumentation.
- **Per-function and per-deployment gas reports** with proxy delegation chain tracking.

## Spec Compliance

For a list of EIPs and chain specifications that EDR does not fully support, including workarounds, see [spec-compliance/](spec-compliance/README.md).

## Production Usage

- [Hardhat 3](https://hardhat.org/)
- [Hardhat 2](https://hardhat.org/hardhat2)

## Happy building!

👷‍♀️👷‍♂️👷‍♀️👷‍♂️👷‍♀️👷‍♂️👷‍♀️👷‍♂️👷‍♀️👷‍♂️👷‍♀️👷‍♂️👷‍♀️👷‍♂️

