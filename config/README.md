# Eslint Configs

## Node

### Packages to install

- `eslint`
- `@types/eslint`
- `@typescript-eslint/parser`
- `@typescript-eslint/eslint-plugin`
- `eslint-config-prettier`
- `eslint-import-resolver-typescript`
- `eslint-plugin-import`
- `eslint-plugin-unused-imports`
- `eslint-plugin-vitest`
- `cspell`

```bash
pnpm add -D eslint @types/eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-unused-imports eslint-plugin-vitest cspell
```

---

## React + Vite

### Packages to install

- `eslint`
- `@types/eslint`
- `@typescript-eslint/parser`
- `@typescript-eslint/eslint-plugin`
- `eslint-config-prettier`
- `eslint-import-resolver-typescript`
- `eslint-plugin-import`
- `eslint-plugin-jsx-a11y`
- `eslint-plugin-jsx-expressions`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `eslint-plugin-testing-library`
- `eslint-plugin-unused-imports`
- `eslint-plugin-vitest`
- `cspell`
- `jsdom`

```bash
pnpm add -D eslint @types/eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-jsx-expressions eslint-plugin-react eslint-plugin-react-hooks  eslint-plugin-react-refresh eslint-plugin-testing-library eslint-plugin-unused-imports eslint-plugin-vitest jsdom cspell
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
