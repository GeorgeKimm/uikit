# Project Context for AI Agents

## Project Overview
This project is a flexible and extensible UI Kit library built with React, MUI, and Tailwind CSS. It is designed to be published as an npm package `@george-kunka/ui-kit`.

## Tech Stack
- **Framework**: React (v18/19)
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: 
  - Tailwind CSS (v3) for utility classes.
  - MUI (Material UI) v6/v7 for base components and theming.
  - `clsx` and `tailwind-merge` for class management.
- **Documentation/Development**: Storybook (v8)

## Project Structure
- `src/components`: Contains all UI components, organized by Atomic Design principles:
  - `atoms`: Basic building blocks (Buttons, Inputs, Icons).
  - `molecules`: Combinations of atoms (Form fields with labels, Search bars).
  - `organisms`: Complex UI sections (Headers, Cards with multiple actions).
- `src/theme`: MUI theme configuration (`theme.ts`).
- `src/index.ts`: Main entry point, exports all components and the theme provider.
- `src/index.css`: Global styles and Tailwind directives.
- `.storybook`: Storybook configuration.

## Development Guidelines

### Component Creation
1.  **Location**: Place new components in `src/components/[type]/[ComponentName]`.
2.  **Files**: Each component directory should contain:
    - `[ComponentName].tsx`: The component implementation.
    - `[ComponentName].stories.tsx`: Storybook stories.
    - `index.ts`: Re-export the component.
3.  **Styling**:
    - Prioritize **Tailwind CSS** for layout, spacing, colors, and typography.
    - Use MUI's `sx` prop or `styled` API only when Tailwind is insufficient or for complex MUI-specific overrides.
    - Ensure `className` props are passed down and merged using `twMerge` (from `tailwind-merge`) and `clsx`.
4.  **Props**:
    - Extend MUI component props where applicable.
    - Define explicit interfaces for props.

### Storybook
- Every component **MUST** have a corresponding `.stories.tsx` file.
- Stories should cover various states (default, variants, disabled, etc.).
- Use `autodocs` tag for automatic documentation generation.

### Build & Publish
- The project is built using Vite in library mode (`vite.config.ts`).
- Entry points: `src/index.ts`.
- Output: `dist` folder (ESM and UMD formats).

## Key Configuration Files
- **`package.json`**: 
  - Uses `peerDependencies` for React, MUI, and Emotion (NOT in dependencies to avoid duplicates).
  - Includes `exports` field for modern Node.js module resolution.
  - Only `clsx` and `tailwind-merge` are in `dependencies`.
- **`tailwind.config.js`**: 
  - Tailwind configuration with `preflight: false` to avoid conflicts with MUI CssBaseline.
  - Content paths include `src/**` and `.storybook/**` for proper class detection.
- **`vite.config.ts`**: 
  - Library build mode with ESM and UMD formats.
  - All peer dependencies marked as external.
  - Sourcemaps enabled for debugging.
- **`tsconfig.json`**: Project references setup for app and node configs.
- **`.storybook/preview.tsx`**: Storybook preview with MUI ThemeProvider decorator.
