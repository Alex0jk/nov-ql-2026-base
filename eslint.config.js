import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['.claude/**'] },
  js.configs.recommended,
  {
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'no-eval': 'error',
      'no-console': 'error',
      'max-lines': ['error', { max: 150, skipBlankLines: false, skipComments: false }],
      'max-lines-per-function': ['error', { max: 25, skipBlankLines: false, skipComments: false }],
    },
  },
  { files: ['src/**/*.js'], languageOptions: { globals: globals.browser } },
  {
    files: ['scripts/**/*.js', 'test/**/*.js', 'eslint.config.js'],
    languageOptions: { globals: globals.node },
  },
  { files: ['scripts/**/*.js'], rules: { 'no-console': 'off' } },
];
