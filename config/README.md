# Eslint Configs

## Node

### Packages to install

- `eslint`
- `@types/eslint`
- `eslint-config-prettier`
- `eslint-import-resolver-typescript`
- `eslint-plugin-import`
- `eslint-plugin-prefer-arrow-functions`
- `eslint-plugin-unused-imports`
- `eslint-plugin-vitest`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`

```bash
	pnpm add -D eslint @types/eslint eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-prefer-arrow-functions eslint-plugin-unused-imports eslint-plugin-vitest @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

---

## React + Vite

### Packages to install

- `eslint`
- `@types/eslint`
- `eslint-config-prettier`
- `eslint-import-resolver-typescript`
- `eslint-plugin-import`
- `eslint-plugin-prefer-arrow-functions`
- `eslint-plugin-unused-imports`
- `eslint-plugin-vitest`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `eslint-plugin-react`
- `eslint-plugin-testing-library`
- `eslint-config-react-app`
- `eslint-plugin-jsx-expressions`

```bash
	pnpm add -D eslint @types/eslint eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-prefer-arrow-functions eslint-plugin-unused-imports eslint-plugin-vitest @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react eslint-plugin-testing-library eslint-config-react-app eslint-plugin-jsx-expressions
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
