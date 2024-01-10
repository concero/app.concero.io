module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "standard-with-typescript",
        "prettier",
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "prettier"

    ],
    "rules": {
        "@typescript-eslint/restrict-plus-operands": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "parameter",
        "format": ["camelCase", "PascalCase", "UPPER_CASE", "snake_case"],
        "leadingUnderscore": "allow"
      }
    ],
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-unused-vars": ["warn"],
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
        "@typescript-eslint/no-empty-interface": "warn",
        "@typescript-eslint/no-invalid-void-type": "warn",
        "@typescript-eslint/ban-types": "warn",
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "react/display-name": "warn",
        "react/jsx-key": "warn",
        "react/no-unescaped-entities": "off",
        "no-prototype-builtins": "off",
        "n/handle-callback-err" : "off",
        "no-case-declarations": "warn",

    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}
