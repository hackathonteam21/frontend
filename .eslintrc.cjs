module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh',"simple-import-sort"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@next/next/no-img-element": "off",
    "no-unused-vars": "off",
    "no-control-regex": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  },
}
