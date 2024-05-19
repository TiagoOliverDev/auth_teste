// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!axios)"
  ],
  moduleNameMapper: {
    // se estiver usando mapeamento de módulos, configure aqui
  }
};
