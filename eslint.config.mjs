import pluginPrettier from 'eslint-plugin-prettier'
import pluginTs from "@typescript-eslint/eslint-plugin"
import parserTs from "@typescript-eslint/parser"

export default [
    {
        ignores: [
            'node_modules',
            'clf',
            'typechain-types',
            'artifacts',
            'deployments',
            'cache'
        ]
    },
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: parserTs,
            parserOptions: {
                project: "./tsconfig.json"
            }
        },
        plugins: {
            "@typescript-eslint": pluginTs,
            prettier: pluginPrettier,
        },
        rules: {
            ...pluginTs.configs.recommended.rules,
            "prettier/prettier": "error",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off"
        }
    }
]