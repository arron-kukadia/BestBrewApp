const { FlatCompat } = require('@eslint/eslintrc')
const js = require('@eslint/js')
const path = require('path')
const prettierPlugin = require('eslint-plugin-prettier')

const compat = new FlatCompat({
  baseDirectory: path.resolve(__dirname),
  recommendedConfig: js.configs.recommended,
})

module.exports = [
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      'babel.config.js',
      'metro.config.js',
      'jest.config.js',
      'jest.setup.js',
      'eslint.config.js',
    ],
  },
  js.configs.recommended,
  ...compat.extends('expo'),
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
]
