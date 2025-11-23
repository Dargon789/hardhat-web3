const {
  getNextUnsupportedVersion,
  getNextNextUnsupportedVersion,
<<<<<<< HEAD
} = require("../../helpers/compilation");
=======
} = require("../../internal/hardhat-network/stack-traces/compilers-list");
>>>>>>> 21729dc206 (Added support for Typed objects)

module.exports = {
  solidity: {
    compilers: [
      {
        version: getNextUnsupportedVersion(),
      },
      {
        version: getNextNextUnsupportedVersion(),
      },
    ],
  },
};
