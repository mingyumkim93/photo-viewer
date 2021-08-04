module.exports = {
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/prettier",
    "@vue/typescript",
    "@vue/prettier/@typescript-eslint"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "off" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "off" : "off",
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        trailingComma: "none",
        printWidth: 120,
        endOfLine: "auto"
      }
    ]
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};
