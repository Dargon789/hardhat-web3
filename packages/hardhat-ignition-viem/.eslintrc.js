<<<<<<< Updated upstream
const {
  slowImportsCommonIgnoredModules,
} = require("../../config/eslint/constants");

=======
>>>>>>> Stashed changes
module.exports = {
  extends: [`${__dirname}/../../config/eslint/eslintrc.js`],
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
    sourceType: "module",
  },
<<<<<<< Updated upstream
  overrides: [
    {
      files: ["src/index.ts"],
      rules: {
        "@nomicfoundation/slow-imports/no-top-level-external-import": [
          "error",
          {
            ignoreModules: [...slowImportsCommonIgnoredModules],
          },
        ],
      },
    },
  ],
=======
  ignorePatterns: [".eslintrc.js", "**/fixture-projects/**/*"],
>>>>>>> Stashed changes
};
