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

echo "it should flatten all the files in the folder because no file names are passed"
run_test_and_handle_failure "npx hardhat flatten" 0

echo "it should flatten only the 'Lock.sol' file because it is passed as an argument"
run_test_and_handle_failure "npx hardhat flatten contracts/Lock.sol" 0
