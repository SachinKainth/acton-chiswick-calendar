export default {
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "js/core/**/*.js",
    "!js/core/**/*.test.js"
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "json-summary"]
};
