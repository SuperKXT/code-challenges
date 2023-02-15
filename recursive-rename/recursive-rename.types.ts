export enum RenameErrors {
	EXISTS = 'path already exists',
	BAD_PATH = 'the given path must be a directory',
	BAD_ARGUMENTS = 'invalid arguments provided. use -h or --help to check the correct usage',
}

export const renameResultType = ['success', 'error', 'unchanged'] as const;

export type RenameResultType = (typeof renameResultType)[number];

interface AgnosticResult {
	type: RenameResultType;
	path: string;
	oldName: string;
	newName?: string;
	error?: string;
	children?: RenameResult[];
}

interface ValidResult extends AgnosticResult {
	type: 'success';
	newName: string;
	error?: undefined;
}

interface ErrorResult extends AgnosticResult {
	type: 'error';
	newName: string;
	error: string;
}

interface UnchangedResult extends AgnosticResult {
	type: 'unchanged';
	newName?: undefined;
	error?: undefined;
}

export type RenameResult = ValidResult | ErrorResult | UnchangedResult;

export interface RenameOptions {
	verbose?: boolean;
	yes?: boolean;
	onlyChanges?: boolean;
	tree?: boolean;
	help?: boolean;
}
