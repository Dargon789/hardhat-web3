"use strict";

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:eslint-plugin/recommended",
<<<<<<< HEAD
    "plugin:n/recommended",
=======
    "plugin:node/recommended",
>>>>>>> fac1221b81 ("hardhat": patch)
    "plugin:prettier/recommended",
  ],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["tests/**/*.js"],
      env: { mocha: true },
    },
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
};
