```markdown
# AI-RedTeam-Framework Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development conventions and patterns used in the AI-RedTeam-Framework repository. The project is written in TypeScript and uses the Astro framework. You'll learn how to structure files, write and organize code, follow commit message standards, and understand the project's testing approach.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `redTeamTools.ts`, `attackVectors.test.ts`

### Import Style
- Use **relative imports** for modules within the project.
  - Example:
    ```typescript
    import { analyzeThreat } from './threatAnalyzer';
    ```

### Export Style
- Use **named exports** for all modules.
  - Example:
    ```typescript
    // In redTeamTools.ts
    export function runRedTeamSimulation() { ... }
    ```

### Commit Messages
- Follow **conventional commit** format.
- Use the `feat` prefix for new features.
- Keep commit messages concise (average ~24 characters).
  - Example:
    ```
    feat: add threat analysis module
    ```

## Workflows

_No automated workflows detected in this repository._

## Testing Patterns

- Test files use the pattern: `*.test.*`
  - Example: `attackVectors.test.ts`
- The specific testing framework is **unknown** from analysis, but tests are co-located with source files or in the same directory.
- Example test file structure:
  ```typescript
  // attackVectors.test.ts
  import { analyzeAttackVector } from './attackVectors';

  describe('analyzeAttackVector', () => {
    it('should detect known vectors', () => {
      // test implementation
    });
  });
  ```

## Commands
| Command | Purpose |
|---------|---------|
| /commit-convention | Show commit message guidelines |
| /file-naming       | Show file naming rules         |
| /import-style      | Show import/export patterns    |
| /test-patterns     | Show test file conventions     |
```
