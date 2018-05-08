module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-console': 1,
    'no-unused-vars': 1,
    'react/jsx-uses-vars': 2,
    'react/jsx-uses-react': 2,
    'array-callback-return': 2,
  },
};
