module.exports = {
  extends: [`${__dirname}/../../config/eslint/eslintrc.js`],
  parserOptions: {
<<<<<<< Updated upstream
    project: `${__dirname}/src/tsconfig.json`,
=======
    project: `${__dirname}/tsconfig.json`,
>>>>>>> Stashed changes
    sourceType: "module",
  },
  ignorePatterns: [".eslintrc.js", "./dist/**/*", "./node_modules/**/*"],
};
