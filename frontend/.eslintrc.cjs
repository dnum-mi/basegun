/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    // 'standard-with-typescript', // À décommenter quand le code sera typé
    'standard',
    '@vue/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    './.eslintrc-auto-import.json',
  ],
  plugins: [
    'vue',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.app.json'],
  },
  env: {
    'vue/setup-compiler-macros': true,
    browser: true,
    es2021: true,
  },
  rules: {
    'comma-dangle': [2, 'always-multiline'],
    '@typescript-eslint/comma-dangle': [2, 'always-multiline'],
    'vue/no-v-html': 0,
    'no-irregular-whitespace': 0,
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/src/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
    {
      files: ['src/utils/**/*.{j,t}s?(x)'],
      rules: {
        camelcase: 'off',
      },
    },
    {
      files: ['**/src/**/*.e2e.js*', '**/src/**/*.cy.js'],
      globals: {
        cy: true,
      },
    },
  ],
}
