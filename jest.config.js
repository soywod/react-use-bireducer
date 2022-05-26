/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  collectCoverage: true,
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  testRegex: ".(test|spec).tsx?$",
};

module.exports = config;
