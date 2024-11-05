import { pathsToModuleNameMapper, JestConfigWithTsJest } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  transform: {
    "^.+\\.(t|j)sx?$": [
      "ts-jest",
      { tsconfig: "<rootDir>/tsconfig.test.json" },
    ],
  },
  roots: ["<rootDir>"],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  modulePaths: [compilerOptions.baseUrl],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
    useESM: true,
  }),
  moduleDirectories: ["node_modules", "<rootDir>"],
};
export default config;
