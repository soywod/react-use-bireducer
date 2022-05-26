/** @type {import('@types/eslint').Linter.BaseConfig} */
const config = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "react-hooks", "import", "unused-imports", "sort-keys-fix"],
};

module.exports = config;
