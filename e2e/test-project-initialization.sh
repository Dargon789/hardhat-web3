<<<<<<< HEAD
#!/usr/bin/env bash
=======
# !/usr/bin/env bash
>>>>>>> fac1221b81 ("hardhat": patch)
# fail if any commands fails
set -e

# Use this function because yarn init -y throws a warning, and the whole script will fail
# because of "set -e"
create_package_json() {
  cat >package.json <<EOF
{
  "name": "tmp",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "description": ""
}
EOF
}

<<<<<<< HEAD
assert_no_empty_files() {
  for file in $(find . -maxdepth 1 -type f); do
    if [ ! -s $file ]; then
      echo "File $file is empty, this should not happen"
      exit 1
    fi
  done
}

=======
>>>>>>> fac1221b81 ("hardhat": patch)
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
TESTS_DIR="${TMP_DIR}/projects-initialization-tests-$(date +%Y-%m-%d-%H-%M-%S)"
mkdir $TESTS_DIR

# store the path to hardhat-core so it can be used in the tmp folder
HARDHAT_CORE_FOLDER_PATH="$(pwd)/../packages/hardhat-core"

printf "[e2e] Starting e2e initialization tests in $TESTS_DIR\n\n"
=======
TESTS_DIR=projects-initialization-tests-$(date +%Y-%m-%d-%H-%M-%S)
mkdir $TESTS_DIR

echo "[e2e] Starting e2e initialization tests in $TESTS_DIR\n\n"
>>>>>>> fac1221b81 ("hardhat": patch)

pkg_managers="npm pnpm yarn"

# log version of each package manager
echo "[e2e] Package managers versions:"
for pkg_manager in $pkg_managers; do
  echo "[e2e] $pkg_manager version: $($pkg_manager --version)"
done

for pkg_manager in $pkg_managers; do
<<<<<<< HEAD
  pkg_runner=$pkg_manager
  if [ "$pkg_manager" = "npm" ]; then
    pkg_runner="npx"
  fi

  if [ "$pkg_manager" = "pnpm" ] && [ "$IS_WINDOWS" = "true" ]; then
    # TODO: There is a bug with pnpm on Windows; the HH initialization runs twice. Skip pnpm on Windows for the moment.
    continue
  fi

  printf "\n\n[e2e] Running tests with package manager '$pkg_manager' and package runner '$pkg_runner'\n"
=======
  echo "\n\n[e2e] Running tests with package manager: $pkg_manager"
>>>>>>> fac1221b81 ("hardhat": patch)

  # pkg_manager, javascript, cjs
  echo "[e2e] Testing: $pkg_manager, javascript, cjs"
  mkdir ${TESTS_DIR}/${pkg_manager}-javascript-cjs
  cd ${TESTS_DIR}/${pkg_manager}-javascript-cjs
  create_package_json
<<<<<<< HEAD
  $pkg_manager add $HARDHAT_CORE_FOLDER_PATH/$HARDHAT_TGZ_FILE >/dev/null 2>&1
  HARDHAT_CREATE_JAVASCRIPT_PROJECT_WITH_DEFAULTS=true $pkg_runner hardhat init
  assert_no_empty_files
  $pkg_runner hardhat compile
  $pkg_runner hardhat test
  $pkg_runner hardhat coverage
  REPORT_GAS=true $pkg_runner hardhat test
=======
  $pkg_manager add ../../../packages/hardhat-core/$HARDHAT_TGZ_FILE >/dev/null 2>&1
  HARDHAT_CREATE_JAVASCRIPT_PROJECT_WITH_DEFAULTS=true npx hardhat init
  npx hardhat compile
  npx hardhat test
>>>>>>> fac1221b81 ("hardhat": patch)
  cd -

  # pkg_manager, javascript, esm
  echo "[e2e] Testing: $pkg_manager, javascript, esm"
  mkdir ${TESTS_DIR}/${pkg_manager}-javascript-esm
  cd ${TESTS_DIR}/${pkg_manager}-javascript-esm
  create_package_json
  jq '. += {"type": "module"}' package.json >esm-package.json
  mv esm-package.json package.json
<<<<<<< HEAD
  $pkg_manager add $HARDHAT_CORE_FOLDER_PATH/$HARDHAT_TGZ_FILE >/dev/null 2>&1
  HARDHAT_CREATE_JAVASCRIPT_PROJECT_WITH_DEFAULTS=true $pkg_runner hardhat init
  assert_no_empty_files
  $pkg_runner hardhat compile
  $pkg_runner hardhat test
  $pkg_runner hardhat coverage
  REPORT_GAS=true $pkg_runner hardhat test
=======
  $pkg_manager add ../../../packages/hardhat-core/$HARDHAT_TGZ_FILE >/dev/null 2>&1
  HARDHAT_CREATE_JAVASCRIPT_PROJECT_WITH_DEFAULTS=true npx hardhat init
  npx hardhat compile
  npx hardhat test
>>>>>>> fac1221b81 ("hardhat": patch)
  cd -

  # pkg_manager, typescript, cjs
  echo "[e2e] Testing: $pkg_manager, typescript, cjs"
  mkdir ${TESTS_DIR}/${pkg_manager}-typescript-cjs
  cd ${TESTS_DIR}/${pkg_manager}-typescript-cjs
  create_package_json
<<<<<<< HEAD
  $pkg_manager add $HARDHAT_CORE_FOLDER_PATH/$HARDHAT_TGZ_FILE >/dev/null 2>&1
  HARDHAT_CREATE_TYPESCRIPT_PROJECT_WITH_DEFAULTS=true $pkg_runner hardhat init
  assert_no_empty_files
  $pkg_runner hardhat compile
  $pkg_runner hardhat test
  $pkg_runner hardhat coverage
  REPORT_GAS=true $pkg_runner hardhat test
=======
  $pkg_manager add ../../../packages/hardhat-core/$HARDHAT_TGZ_FILE >/dev/null 2>&1
  HARDHAT_CREATE_TYPESCRIPT_PROJECT_WITH_DEFAULTS=true npx hardhat init
  npx hardhat compile
  npx hardhat test
>>>>>>> fac1221b81 ("hardhat": patch)
  cd -

  # pkg_manager, typescript, esm
  echo "[e2e] Testing: $pkg_manager, typescript, esm"
  mkdir ${TESTS_DIR}/${pkg_manager}-typescript-esm
  cd ${TESTS_DIR}/${pkg_manager}-typescript-esm
  create_package_json
  jq '. += {"type": "module"}' package.json >esm-package.json
  mv esm-package.json package.json
<<<<<<< HEAD
  $pkg_manager add $HARDHAT_CORE_FOLDER_PATH/$HARDHAT_TGZ_FILE >/dev/null 2>&1
  if HARDHAT_CREATE_TYPESCRIPT_PROJECT_WITH_DEFAULTS=true $pkg_runner hardhat init; then
=======
  $pkg_manager add ../../../packages/hardhat-core/$HARDHAT_TGZ_FILE >/dev/null 2>&1
  if HARDHAT_CREATE_TYPESCRIPT_PROJECT_WITH_DEFAULTS=true npx hardhat init; then
>>>>>>> fac1221b81 ("hardhat": patch)
    echo "[e2e] Initialization should have failed"
    exit 1
  else
    echo "[e2e] Initialization failed as expected"
  fi
  cd -

  # pkg_manager, typescript-viem, cjs
  echo "[e2e] Testing: $pkg_manager, typescript-viem, cjs"
  mkdir ${TESTS_DIR}/${pkg_manager}-typescript-viem-cjs
  cd ${TESTS_DIR}/${pkg_manager}-typescript-viem-cjs
  create_package_json
<<<<<<< HEAD
  $pkg_manager add $HARDHAT_CORE_FOLDER_PATH/$HARDHAT_TGZ_FILE >/dev/null 2>&1
  HARDHAT_CREATE_TYPESCRIPT_VIEM_PROJECT_WITH_DEFAULTS=true $pkg_runner hardhat init
  assert_no_empty_files
  $pkg_runner hardhat compile
  $pkg_runner hardhat test
  SOLIDITY_COVERAGE=true $pkg_runner hardhat coverage
  REPORT_GAS=true $pkg_runner hardhat test
=======
  $pkg_manager add ../../../packages/hardhat-core/$HARDHAT_TGZ_FILE >/dev/null 2>&1
  HARDHAT_CREATE_TYPESCRIPT_VIEM_PROJECT_WITH_DEFAULTS=true npx hardhat init
  npx hardhat compile
  npx hardhat test
>>>>>>> fac1221b81 ("hardhat": patch)
  cd -

  # pkg_manager, typescript-viem, esm
  echo "[e2e] Testing: $pkg_manager, typescript-viem, esm"
  mkdir ${TESTS_DIR}/${pkg_manager}-typescript-viem-esm
  cd ${TESTS_DIR}/${pkg_manager}-typescript-viem-esm
  create_package_json
  jq '. += {"type": "module"}' package.json >esm-package.json
  mv esm-package.json package.json
<<<<<<< HEAD
  $pkg_manager add $HARDHAT_CORE_FOLDER_PATH/$HARDHAT_TGZ_FILE >/dev/null 2>&1
  if HARDHAT_CREATE_TYPESCRIPT_VIEM_PROJECT_WITH_DEFAULTS=true $pkg_runner hardhat init; then
=======
  $pkg_manager add ../../../packages/hardhat-core/$HARDHAT_TGZ_FILE >/dev/null 2>&1
  if HARDHAT_CREATE_TYPESCRIPT_VIEM_PROJECT_WITH_DEFAULTS=true npx hardhat init; then
>>>>>>> fac1221b81 ("hardhat": patch)
    echo "[e2e] Initialization should have failed"
    exit 1
  else
    echo "[e2e] Initialization failed as expected"
  fi
  cd -

done

<<<<<<< HEAD
printf "\n[e2e] All tests passed\n"
=======
echo "\n[e2e] All tests passed\n"
>>>>>>> fac1221b81 ("hardhat": patch)

# remove the temporary directory
rm -fr $TESTS_DIR
