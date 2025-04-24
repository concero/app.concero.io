## Editor Configuration Recommendations

For a smooth development experience with this library, consider using the following VS Code settings:
For convenience, you can create a separate settings profile in VSCode

```json
{
	"files.autoSave": "afterDelay", // Enables automatic saving of files after a short delay, ensuring no work is lost.
	"files.eol": "\n", // Ensures the use of Unix-style line endings for consistency across platforms.
	"emmet.includeLanguages": {
		"postcss": "css" // Configures Emmet to work with PostCSS as if it were CSS, improving productivity with shorthand syntax.
	},
	"editor.formatOnSave": true, // Automatically formats the code every time a file is saved.
	"editor.defaultFormatter": "esbenp.prettier-vscode", // Specifies Prettier as the default code formatter for all file types.
	"[javascript]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode" // Ensures Prettier is used as the formatter specifically for JavaScript files.
	},
	"[typescript]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode",
		"editor.formatOnSave": true
	},
	"[typescriptreact]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode",
		"editor.formatOnSave": true
	},
	"eslint.useFlatConfig": true, // For support eslint config
	"cssvar.files": ["**/*.css", "**/*.pcss"], // For global css/pcss variables
	"cssVariables.lookupFiles": [
		"**/*.css",
		"**/*.scss",
		"**/*.sass",
		"**/*.less",
		"node_modules/@concero/ui-kit/dist/styles/concero/index.css"
	]
}
```

Recommended extensions:

- [CSS Variable Autocomplete](https://marketplace.visualstudio.com/items/?itemName=vunguyentuan.vscode-css-variables) !!!
- [CSS Modules](https://marketplace.visualstudio.com/items?itemName=clinyong.vscode-css-modules)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [PostCSS Language Support](https://marketplace.visualstudio.com/items?itemName=csstools.postcss)
- [PostCSS Intellisense and Highlighting](https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-postcss)
- [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
