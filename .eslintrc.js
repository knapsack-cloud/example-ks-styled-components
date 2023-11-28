module.exports = {
  env: {
    browser: true,
    es6: true, // Add ES6 environment support
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ], // Add TypeScript support
  parser: '@typescript-eslint/parser', // Use TypeScript parser
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018, // Updated to support ES2018 features
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
