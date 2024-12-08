import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import pluginImport from "eslint-plugin-import";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "no-relative-import-paths": noRelativeImportPaths,
      import: pluginImport,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        {
          allowSameFolder: true,
        },
      ],
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          warnOnUnassignedImports: true,
          groups: [
            ["builtin", "external"],
            ["internal", "parent"],
            ["sibling", "index"],
            "type",
            "object",
            "unknown",
          ],
        },
      ],
    },
  }
);
