# Code Formatting and Workflow Guidelines

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
   - When creating a new branch/issue, **immediately** create a pull request (PR).
   - The branch name should be descriptive and relevant to the task you're working on.
   - **Never** merge your own PR. It’s important to have someone else review your code before approving and merging. Don't just look at the code and go "good enough" sit down and interact with the code so it works.

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

---

# Studio Rules

1. **Progress == Usable Software:**
   - Focus on delivering working, usable software. The goal is to create features that are functional and can be used, rather than just pushing forward with incomplete work.

2. **Write Understandable and Maintainable Code:**
   - Only write code that everyone on your team can understand and maintain. This ensures that all team members can collaborate effectively and can modify the codebase as needed.

3. **Team Discussion Before Changes:**
   - Always discuss with your team before making any changes to the codebase. This helps avoid conflicts, misunderstandings, and ensures everyone is aligned on the direction of the project.

4. **Be Iterative:**
   - There is no such thing as a "finished" software project. Approach development iteratively and continuously improve. Each iteration should bring a small but valuable improvement.

5. **One Feature Finished is Better than Many Nearly Finished:**
   - Focus on completing individual features fully before moving on to others. It's better to have one feature done well than many that are incomplete.

6. **Make the Simplest Possible Version:**
   - Start with the simplest possible version of a feature or functionality, and then add incremental improvements over time. This helps ensure stability and allows for easier debugging.

7. **Individual Deployment Work:**
   - Do individual deployment work outside of class time. Ensure that all deployment steps are completed independently to avoid disruptions during class or team time.

---

# Commit Messages Standards

## Message Types:

**build**: Changes that affect the build system or external dependencies

**chore**: Regular code maintenance, such as refactoring or updating dependencies

**ci**: Changes to our CI configuration files and scripts

**docs**: Documentation only changes

**feat**: A new feature

**fix**: A bug fix

**perf**: A code change that improves performance

**refactor**: A code change that neither fixes a bug nor adds a feature

**style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)

**test**: Adding missing tests or correcting existing tests

### Examples:

`feat(javascript): add a new feature`

`fix(html): fix a bug`

`docs(css): update documentation`


## Running Svelte

Once you've created a project and installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
