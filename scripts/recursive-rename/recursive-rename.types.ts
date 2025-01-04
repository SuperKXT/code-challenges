export const RENAME_ERRORS = {
	badArguments:
		"invalid arguments provided. use -h or --help to check the correct usage",
	badPath: "the given path must be a directory",
	exists: "path already exists",
} as const;

export const RENAME_RESULT_TYPE = ["success", "error", "unchanged"] as const;

export type RenameResultType = (typeof RENAME_RESULT_TYPE)[number];

type AgnosticResult = {
	type: RenameResultType;
	path: string;
	oldName: string;
	newName?: string;
	error?: string;
	children?: RenameResult[];
};

type ValidResult = {
	type: "success";
	newName: string;
	error?: undefined;
} & AgnosticResult;

type ErrorResult = {
	type: "error";
	newName: string;
	error: string;
} & AgnosticResult;

type UnchangedResult = {
	type: "unchanged";
	newName?: undefined;
	error?: undefined;
} & AgnosticResult;

export type RenameResult = ErrorResult | UnchangedResult | ValidResult;

export type RenameOptions = {
	verbose?: boolean;
	yes?: boolean;
	onlyChanges?: boolean;
	tree?: boolean;
	help?: boolean;
};
