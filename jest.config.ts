export default {
  verbose: true,
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
