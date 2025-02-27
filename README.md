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

### Code Formatting

Variables will be made using camelCase.
E.G: var thisIsAnExample

Classes and Functions will be made using PascalCase
E.G; function ThisIsAFunction
class ThisIsAClass

Code should be clean, readable and tidy, with comments explaining the more in depth or advanced parts.

On the creation of a new branch, a pull request should be made immediately after creation. And make sure said branch name is relevant to whatever you are (going to be) working on. DO NOT merge your own pull request EVER.

Do not make commits directly into main, unless everyone in the team agrees. 

Have consistent use of whitespace, space everything out.
E.G; const x = 5 + 3; instead of const x=5+3;

Make sure lines aren't too big, anything that would go off the screen in VS Code or move the screen along is too long.

Everything should be made in its simplest form first, before adding more to it.

On the completion of a feature/finishing up with using a branch, do a code review with a teammate to check if it is alright, as well as making sure that everyone in the group is able to understand it.


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
