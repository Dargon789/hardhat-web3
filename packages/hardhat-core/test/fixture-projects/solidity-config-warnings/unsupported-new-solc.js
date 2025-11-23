<<<<<<< HEAD
const { getNextUnsupportedVersion } = require("../../helpers/compilation");
=======
const {
  getNextUnsupportedVersion,
} = require("../../internal/hardhat-network/stack-traces/compilers-list");
>>>>>>> 21729dc206 (Added support for Typed objects)

module.exports = {
  solidity: getNextUnsupportedVersion(),
};
