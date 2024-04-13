# Eslint Configs

## Node

### Packages to install

- `eslint`
- `@types/eslint`
- `@typescript-eslint/parser`
- `@typescript-eslint/eslint-plugin`
- `eslint-import-resolver-typescript`
- `eslint-plugin-import`
- `eslint-plugin-n`
- `eslint-plugin-unused-imports`
- `eslint-plugin-vitest`
- `eslint-plugin-only-warn`
- `cspell`

```bash
pnpm add -D eslint @types/eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-n eslint-plugin-unused-imports eslint-plugin-vitest eslint-plugin-only-warn cspell
```

---

## React + Vite

### Packages to install

- `eslint`
- `@types/eslint`
- `@typescript-eslint/parser`
- `@typescript-eslint/eslint-plugin`
- `eslint-import-resolver-typescript`
- `eslint-plugin-import`
- `eslint-plugin-jsx-a11y`
- `eslint-plugin-jsx-expressions`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `eslint-plugin-sort-keys-plus`
- `eslint-plugin-testing-library`
- `eslint-plugin-unused-imports`
- `eslint-plugin-vitest`
- `eslint-plugin-only-warn`
- `cspell`
- `jsdom`

```bash
pnpm add -D eslint @types/eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-jsx-expressions eslint-plugin-react eslint-plugin-react-hooks  eslint-plugin-react-refresh eslint-plugin-sort-keys-plus eslint-plugin-testing-library eslint-plugin-unused-imports eslint-plugin-vitest eslint-plugin-only-warn jsdom cspell
```

### Showing lint errors and warnings in Vite

```bash
pnpm add -D vite-plugin-eslint
```

In `vite.config.ts`:

```ts
...
import eslint from 'vite-plugin-eslint';
...
export defineConfig({
	plugins: [..., eslint()],
	...
})

```
