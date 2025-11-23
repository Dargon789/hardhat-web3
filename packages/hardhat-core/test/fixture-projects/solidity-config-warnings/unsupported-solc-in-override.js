<<<<<<< HEAD
const { getNextUnsupportedVersion } = require("../../helpers/compilation");
=======
const {
  getNextUnsupportedVersion,
} = require("../../internal/hardhat-network/stack-traces/compilers-list");
>>>>>>> 21729dc206 (Added support for Typed objects)

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.7.0",
      },
    ],
    overrides: {
      "contracts/Foo.sol": { version: getNextUnsupportedVersion() },
    },
  },
};
