module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'import-helpers'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'import-helpers/order-imports': [
          'warn',
          {
            newlinesBetween: 'always', // new line between groups
            groups: ['/^react/', 'module', ['parent', 'sibling', 'index']],
            alphabetize: {order: 'asc', ignoreCase: true},
          },
        ],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
