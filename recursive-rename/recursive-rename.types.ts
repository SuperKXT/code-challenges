export const RENAME_ERRORS = {
	badArguments:
		'invalid arguments provided. use -h or --help to check the correct usage',
	badPath: 'the given path must be a directory',
	exists: 'path already exists',
} as const;

export const RENAME_RESULT_TYPE = ['success', 'error', 'unchanged'] as const;

export type RenameResultType = (typeof RENAME_RESULT_TYPE)[number];

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

export type RenameResult = ErrorResult | UnchangedResult | ValidResult;

export interface RenameOptions {
	verbose?: boolean;
	yes?: boolean;
	onlyChanges?: boolean;
	tree?: boolean;
	help?: boolean;
}
