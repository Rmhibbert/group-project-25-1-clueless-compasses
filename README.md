# Coding Standards

### Commit Message Conventions

You should follow the **conventional commits** convention when committing changes to your repository. A **conventional commit** consists of a **type**, **scope** and **description**. The **type** and **description** are mandatory, while the **scope** is optional. The **type** must be one of the following:

- **build**: Changes that affect the build system or external dependencies
- **chore**: Regular code maintenance, such as refactoring or updating dependencies
- **ci**: Changes to our CI configuration files and scripts
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

## Examples

- `feat(javascript): add a new feature`
- `fix(html): fix a bug`
- `docs(css): update documentation`

## Code Formatting Guidelines

1. **Variable Naming Convention:**
   - Use **camelCase** for variable names.
   - Example:
     ```javascript
     let thisIsAnExample;
     ```

2. **Class and Function Naming Convention:**
   - Use **PascalCase** for classes and functions.
   - Example:
     ```javascript
     function ThisIsAFunction() { ... }  
     class ThisIsAClass { ... }
     ```

3. **Clean and Readable Code:**
   - Write code that is clean, readable, and tidy.
   - Use comments to explain more complex or advanced sections of the code to ensure that teammates can follow along.

4. **Branch Management:**
   - When creating a new branch, **immediately** create a pull request (PR).
   - The branch name should be descriptive and relevant to the task you're working on.
   - **Never** merge your own PR. It’s important to have someone else review your code before merging.

5. **Main Branch Commit Policy:**
   - Do not commit directly to the **main** branch unless the entire team has agreed to do so.

6. **Consistent Whitespace:**
   - Ensure consistent use of whitespace to improve readability. For example:
     ```javascript
     const x = 5 + 3; // instead of const x=5+3;
     ```

7. **Line Length:**
   - Avoid lines of code that are too long or require scrolling horizontally in VS Code. Break up long lines to maintain readability.

8. **Simplicity First:**
   - Begin by implementing a feature or function in its simplest form. Once it’s working, you can refactor or add more complexity if needed.

9. **Code Reviews:**
   - When finishing a feature or completing work on a branch, **conduct a code review** with a teammate. This ensures quality, consistency, and that everyone in the team can understand the code.

## Running Svelte

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
