/** @type {import('prettier').Options} */
const config = {
  arrowParens: "avoid",
  importOrder: ["^src/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  bracketSpacing: false,
  printWidth: 100,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
};

module.exports = config;
