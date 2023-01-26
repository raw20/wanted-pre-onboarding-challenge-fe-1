/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/src/test/styleMock.ts",
  },
};
