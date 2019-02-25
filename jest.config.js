module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
    'ts',
    'tsx'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    'vue-router': '<rootDir>/tests/unit/setup/router',
    'vue-auto-routing': '<rootDir>/tests/unit/setup/router',
    'vue-router-layout':'<rootDir>/tests/unit/setup/router',
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "html"],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,js,vue}',
    '!src/**/*.d.ts',
    '!src/router.ts',
    '!src/main.ts',
    '!src/registerRouteConfig.ts',
    '!**/node_modules/**',
  ],
  setupTestFrameworkScriptFile: "<rootDir>/tests/unit/setup/index.ts",
  testURL: 'http://localhost/'
}