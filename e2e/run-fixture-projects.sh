<<<<<<< HEAD
#!/usr/bin/env bash
=======
# !/usr/bin/env bash
>>>>>>> fac1221b81 ("hardhat": patch)

#
# NOTE: you can pass the name of a single fixture-projects folder to this script to execute a single test project.
# E.g.: ./run-fixture-projects.sh vars
#

# fail if any commands fails
set -e

# build hardhat-core
echo "[e2e] Building and packing hardhat-core"
cd ../packages/hardhat-core
pnpm install
pnpm build
<<<<<<< HEAD
HARDHAT_TGZ_FILE=$(pnpm pack | grep "hardhat-*.*.*.tgz")
=======
HARDHAT_TGZ_FILE=$(pnpm pack)
>>>>>>> fac1221b81 ("hardhat": patch)
echo "[e2e] Built $HARDHAT_TGZ_FILE"
cd - >/dev/null

# create a temporary directory to run the tests
<<<<<<< HEAD
TMP_DIR=$(mktemp -d)
FIXTURE_PROJECTS_DIR="${TMP_DIR}/fixture-projects-run-$(date +%Y-%m-%d-%H-%M-%S)"
cp -r fixture-projects $FIXTURE_PROJECTS_DIR
# also copy the helper script
cp helpers.sh $FIXTURE_PROJECTS_DIR/helpers.sh

# store the path to hardhat-core so it can be used in the tmp folder
HARDHAT_CORE_FOLDER_PATH="$(pwd)/../packages/hardhat-core"

# run all the e2e tests in the temporary directory
printf "[e2e] Running tests in $FIXTURE_PROJECTS_DIR\n\n"

# log version of each package manager
printf "[e2e] Package manager version: npm version $(npm --version)\n\n"
=======
FIXTURE_PROJECTS_DIR=fixture-projects-run-$(date +%Y-%m-%d-%H-%M-%S)
cp -r fixture-projects $FIXTURE_PROJECTS_DIR

# run all the e2e tests in the temporary directory
echo "[e2e] Running tests in $FIXTURE_PROJECTS_DIR\n\n"

# log version of each package manager
echo "[e2e] Package manager version: npm version $(npm --version)\n\n"
>>>>>>> fac1221b81 ("hardhat": patch)

for dir in ${FIXTURE_PROJECTS_DIR}/*; do
  if [ -d "$dir" ]; then

    if [ -n "$1" ] && [ "$(basename "$dir")" != "$1" ]; then
      # only execute the tests for the project passed as argument to this script, if any
      continue
    fi

    echo "[e2e] Running tests in $dir"
    cd "$dir"

    echo "[e2e] Installing modules in $dir"
<<<<<<< HEAD
    npm add $HARDHAT_CORE_FOLDER_PATH/$HARDHAT_TGZ_FILE >/dev/null 2>&1
    npm install >/dev/null 2>&1 # install modules specified in the package.json
=======
    npm add ../../../packages/hardhat-core/$HARDHAT_TGZ_FILE >/dev/null 2>&1
    npm install >/dev/null 2>&1 # install moduled specified in the package.json
>>>>>>> fac1221b81 ("hardhat": patch)
    echo "[e2e] All modules have been installed in $dir"

    echo "[e2e] Starting test in $dir"
    ./test.sh
    cd -

<<<<<<< HEAD
    printf "[e2e] Finished test in $dir\n\n"
  fi
done

printf "\n[e2e] All tests passed\n"
=======
    echo "[e2e] Finished test in $dir\n\n"
  fi
done

echo "\n[e2e] All tests passed\n"
>>>>>>> fac1221b81 ("hardhat": patch)

# remove the temporary directory
rm -fr $FIXTURE_PROJECTS_DIR
