const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

module.exports = createJestConfig(customJestConfig);
