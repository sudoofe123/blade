const ignores = ['/node_modules/'];

module.exports = {
  testPathIgnorePatterns: [...ignores, 'native.test'],
  collectCoverageFrom: ['./src/**/*.web.{ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  moduleFileExtensions: ['web.ts', 'web.tsx', 'ts', 'tsx', 'js', 'json', 'node'],
  testMatch: ['**/*.test.{ts,tsx}'],
  transform: {
    '\\.(js|ts|tsx)?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', 'jest-useragent-mock'],
};
