module.exports = {
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx", "*.cjs", "*.mjs"],
      parser: "@typescript-eslint/parser",
      env: {
        browser: true,
        node: true,
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "prettier",
      ],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["tsconfig.json", "tsconfig.eslint.json"],
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".md", ".mdx"],
      },
      plugins: ["@typescript-eslint", "simple-import-sort"],
      rules: {
        "@typescript-eslint/ban-ts-comment": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/consistent-type-imports": "warn",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          { ignoreRestSiblings: true },
        ],
        "no-unused-vars": "off",
        "no-extra-boolean-cast": "off",
        "prettier/prettier": [
          "error",
          {
            endOfLine: "auto",
          },
        ],
        "simple-import-sort/imports": "warn",
        "simple-import-sort/exports": "warn",
      },
    },
    {
      files: ["*.mdx", "*.md"],
      extends: "plugin:mdx/recommended",
      settings: {
        "mdx/code-blocks": false,
        "mdx/language-mapper": false,
      },
      rules: {
        "no-unused-expressions": "off",
      },
    },
  ],
};
