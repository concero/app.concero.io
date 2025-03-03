import pluginPrettier from 'eslint-plugin-prettier'
import pluginTs from '@typescript-eslint/eslint-plugin'
import parserTs from '@typescript-eslint/parser'
import { fixupPluginRules } from '@eslint/compat'
import storybook from 'eslint-plugin-storybook'
export default [
	{
		ignores: ['node_modules', 'clf', 'typechain-types', 'artifacts', 'deployments', 'cache'],
	},
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: parserTs,
			parserOptions: {
				project: './tsconfig.app.json',
			},
		},

		plugins: {
			'@typescript-eslint': pluginTs,
			prettier: pluginPrettier,
		},
		rules: {
			...pluginTs.configs.recommended.rules,
			'prettier/prettier': 'error',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
		},
	},
	{ ignores: ['!.storybook'] },
	{
		settings: {
			storybook: { version: 'detect' },
		},
	},

	{
		files: ['**/*.stories.{ts,tsx}', '.storybook/**/*.{ts, tsx}'],
		plugins: {
			storybook: fixupPluginRules(storybook),
		},

		rules: {
			'storybook/await-interactions': 'off',
			'storybook/use-storybook-testing-library': 'error',
			'storybook/context-in-play-function': 'error',
			'storybook/default-exports': 'error',
			'storybook/no-uninstalled-addons': 'error',
			'storybook/prefer-pascal-case': 'warn',
		},
	},
]
