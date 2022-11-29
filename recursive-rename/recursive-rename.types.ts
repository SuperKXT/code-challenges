export enum RenameErrors {
	EXISTS = 'path already exists',
}

interface AgnosticResult {
	type: 'success' | 'error' | 'unchanged',
	oldName: string,
	newName?: string,
	error?: string,
	children?: RenameResult[],
}

interface ValidResult extends AgnosticResult {
	type: 'success',
	newName: string,
	error?: undefined,
}

interface ErrorResult extends AgnosticResult {
	type: 'error',
	newName: string,
	error: string,
}

interface UnchangedResult extends AgnosticResult {
	type: 'unchanged',
	newName?: undefined,
	error?: undefined,
}

export type RenameResult = (
	| ValidResult
	| ErrorResult
	| UnchangedResult
);

export interface RenameOptions {
	verbose?: boolean,
	yes?: boolean,
	onlyChanges?: boolean,
	tree?: boolean,
}
