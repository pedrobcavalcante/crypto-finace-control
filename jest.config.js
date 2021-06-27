
const config = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'        
  ],
  coveragePathIgnorePatterns: [   
    "<rootDir>/src/main/",
    ".mock.ts"
],
  coverageDirectory: "coverage",    
  testEnvironment: "node",
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
};

module.exports = config
