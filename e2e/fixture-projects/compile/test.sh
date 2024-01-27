#! /usr/bin/env sh

# fail if any commands fails
set -e

# import helpers functions
<<<<<<< HEAD
. ../helpers.sh
=======
. ../../helpers.sh
>>>>>>> fac1221b81 ("hardhat": patch)

echo "Running tests: $(basename "$(pwd)")"

echo "it should compile the contracts in the default project folder"
run_test_and_handle_failure "npx hardhat compile" 0
