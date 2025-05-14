import { resolveFromRoot } from "@nomicfoundation/hardhat-utils/path";
import type { TestHooks } from "hardhat/types/hooks";

export default async (): Promise<Partial<TestHooks>> => {
  const handlers: Partial<TestHooks> = {
    registerFileForTestRunner: async (context, filePath, next) => {
      const absoluteFilePath = resolveFromRoot(process.cwd(), filePath);

      const absoluteNodeTestsPath = resolveFromRoot(
        process.cwd(),
        context.config.paths.tests.solidity,
      );

      if (absoluteFilePath.includes(absoluteNodeTestsPath)) {
        return "solidity";
      }

      return next(context, filePath);
    },
  };

  return handlers;
};
