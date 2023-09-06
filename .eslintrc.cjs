module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react-refresh'],
  ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts', 'vitest.config.ts', 'webpack.config.js', 'dist', 'node_modules'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    '@typescript-eslint/semi': ['error', 'never'],
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'object-curly-newline': 'off',
    '@typescript-eslint/indent': 'off',
    'max-len': [
      'warn',
      {
        code: 120,
      },
    ],
  },
}
