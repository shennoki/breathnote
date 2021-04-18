module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  globalSetup: '<rootDir>/test/setupEnv.ts',
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    // https://github.com/zeit/next.js/issues/8663#issue-490553899
    'ts-jest': {
      tsconfig: '<rootDir>/test/tsconfig.jest.json',
    },
  },
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*'],
  coverageDirectory: './coverage/',
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/test/mocks/fileMock.ts',
  },
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: ['node_modules'],
}
