import type { TestHooks } from "hardhat/types/hooks";

import { resolveFromRoot } from "@nomicfoundation/hardhat-utils/path";

export default async (): Promise<Partial<TestHooks>> => {
  const handlers: Partial<TestHooks> = {
    registerFileForTestRunner: async (context, filePath, next) => {
      const absoluteFilePath = resolveFromRoot(process.cwd(), filePath);

      const absoluteNodeTestsPath = resolveFromRoot(
        process.cwd(),
        context.config.paths.tests.mocha,
      );

      if (absoluteFilePath.includes(absoluteNodeTestsPath)) {
        return "mocha";
      }

      return next(context, filePath);
    },
  };

  return handlers;
};
