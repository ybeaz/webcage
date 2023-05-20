export default {
  verbose: true,
  testURL: 'http://127.0.0.1/',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/**/(*.)test.(js|jsx|ts|tsx)'],
  globals: {
    'ts-jest': {
      babel: true,
      tsconfig: 'tsconfig.json',
    },
  },
}
