module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [],
  ignorePatterns: ['dist', '.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [],
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [],
  rules: {},
  settings: {
    react: {
      version: 'detect',
    },
  },
};