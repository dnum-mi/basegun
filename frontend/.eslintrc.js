module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:vue/vue3-recommended',
  ],
  plugins: [
    'vue',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  env: {
    'vue/setup-compiler-macros': true,
    browser: true,
    es2021: true,
  },
  rules: {
    'comma-dangle': [2, 'always-multiline'],
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
      files: ['**/src/**/*.e2e.js*', '**/src/**/*.cy.js'],
      globals: {
        cy: true,
      },
    },
  ],
}
