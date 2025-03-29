const { createConfig } = require("../../config-v-next/eslint.config.cjs");

const configs = createConfig(__filename, { onlyHardhatError: false });

/**
 * * @type {import("eslint").Linter.Config}
 */
const overrideConfig = {
  files: ["src/**/*.ts"],
};

configs.push(overrideConfig);

module.exports = configs;
