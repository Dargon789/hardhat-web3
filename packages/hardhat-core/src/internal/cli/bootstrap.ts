#!/usr/bin/env node

<<<<<<< HEAD
import picocolors from "picocolors";
=======
import { SUPPORTED_NODE_VERSIONS } from "./constants";
>>>>>>> 21729dc206 (Added support for Typed objects)

import { isNodeVersionToWarnOn } from "./is-node-version-to-warn-on";

if (isNodeVersionToWarnOn(process.version)) {
  console.warn(
<<<<<<< HEAD
    picocolors.yellow(picocolors.bold(`WARNING:`)),
=======
    chalk.yellow.bold(`WARNING:`),
>>>>>>> 21729dc206 (Added support for Typed objects)
    `You are currently using Node.js ${process.version}, which is not supported by Hardhat. This can lead to unexpected behavior. See https://hardhat.org/nodejs-versions`
  );
  console.log();
  console.log();
}

require("./cli");
