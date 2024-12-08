# Rules & Guidelines for developers
These rules must be strictly followed by all developers in order to maintain a clean and consistent codebase.
If you have any questions or suggestions, please contact the team.

## General
- All code and comments must be written in English.
- All code must pass linter checks.

## Performance
- Use the most optimal algorithms and data structures for each solution.
- Minimise API calls and database queries. Use caching where necessary.
- Keep the bundle size to a minimum. Use asyncronous imports to load modules only when needed.
- Avoid using third-party libraries unless absolutely necessary
- Optimize images and assets
- Conduct performance tests of your code, maintain the following requirements:
    - Server response time: < 200ms
    - Page load time: < 2s
    - Asset size: < 500KB

## Code Quality
- Use consistent naming conventions:
  - camelCase for variables and functions
  - PascalCase for classes and components
  - UPPER_SNAKE_CASE for constants
- All variables, functions, and classes must have self-explanatory and descriptive names.
- All code must be properly formatted and indented.
- Functions should focus on a single task as per the Single Responsibility Principle.
- Minimise the amount of non-reusable functions.
- Avoid magic numbers - use named constants
- Write defensive code (validate inputs, handle edge cases)

## Documentation
- Only document complex code. Minimise the use of comments by writing self-explanatory code.
- Always document known issues and their workarounds
- Follow the JSDoc standard for documenting functions and classes.

## Security
- Follow the [OWASP guidelines](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist).
- Never store sensitive information in the codebase. Use environment variables instead.
- Sensitive logic should be protected by authentication and authorisation.
- Keep dependencies up-to-date.

## Source Control
- Use conventions for branch names: feature/, fix/, hotfix/.
- Commit messages must be clear, specific and concise.
- Squash commits before merging.
- Avoid commiting directly to the master or release branches. Use pull requests instead.
- At least one other team member must review and approve your pull request before merging.
- Before creating a pull request:
    - Ensure that your code is up-to-date with the latest changes in the target branch.
    - Remove all console.logs

## React-specific
- Use native React features, avoiding third-party libraries unless absolutely necessary.
- Keep state as local as possible
- Avoid prop drilling
- (Recommended) Use best practices from [Bulletproof React](https://github.com/alan2207/bulletproof-react/blob/master/README.md)

## CSS & Styling
- Use PostCSS modules for styling. Avoid inline styles
- Keep style specificity to a minimum
- Avoid magic numbers for margins, paddings, etc. Use named constants
