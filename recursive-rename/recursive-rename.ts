import { access, readdir, stat, rename } from 'fs/promises';
import path from 'path';

import chalk from 'chalk';
import argumentParser from 'minimist-lite';
import prompt from 'prompt';
import { z } from 'zod';

// eslint-disable-next-line no-restricted-imports
import { formatToken } from '../helpers/string';
// eslint-disable-next-line no-restricted-imports
import { getError } from '../helpers/error';

import { RenameErrors } from './recursive-rename.types';

import type {
	RenameOptions,
	RenameResult,
	RenameResultType,
} from './recursive-rename.types';

/* eslint-disable id-length */
const paramsSchema = z.strictObject({
	_: z.tuple([z.string()]),
	'--': z.string().array().length(0).optional(),
	yes: z.boolean().optional(),
	y: z.boolean().optional(),
	verbose: z.boolean().optional(),
	v: z.boolean().optional(),
	'only-changes': z.boolean().optional(),
	o: z.boolean().optional(),
	tree: z.boolean().optional(),
	t: z.boolean().optional(),
	help: z.boolean().optional(),
	h: z.boolean().optional(),
});
/* eslint-enable id-length */

export type Params = z.infer<typeof paramsSchema>;

interface RecursiveLogResponse {
	logs: string[];
	success: RenameResult[];
	error: RenameResult[];
	unchanged: RenameResult[];
}

interface RecursiveLogParams {
	results: RenameResult[];
	labels: Record<RenameResultType, string>;
	verbose?: boolean;
	onlyChanges?: boolean;
	tree?: boolean;
	isConfirmation?: boolean;
	depth?: number;
}

export const getRecursiveLogs = ({
	results,
	labels,
	verbose,
	onlyChanges,
	tree,
	isConfirmation,
	depth = 1,
}: RecursiveLogParams): RecursiveLogResponse => {
	const response: RecursiveLogResponse = {
		logs: [],
		success: [],
		error: [],
		unchanged: [],
	};

	for (const result of results) {
		const {
			type,
			path: resultPath,
			oldName,
			newName,
			error,
			children,
		} = result;

		response[type].push(result);

		if (
			verbose &&
			(!onlyChanges || type !== 'unchanged' || (tree && children))
		) {
			const log = [
				tree && '  '.repeat(depth - 1),
				tree && chalk.dim('|_ '),
				!tree && `${labels[type]} `,
				!tree && `${chalk.dim(resultPath)}/`,
				type === 'unchanged' ? oldName : chalk.strikethrough(oldName),
				type !== 'unchanged' &&
					chalk[type === 'success' ? 'green' : 'red'](` ${newName}`),
				type === 'error' && ` ${chalk.bgRed(` ${error} `)}`,
			]
				.filter(Boolean)
				.join('');

			response.logs.push(log);
		}

		if (children) {
			const subLogs = getRecursiveLogs({
				results: children,
				labels,
				verbose,
				onlyChanges,
				tree,
				isConfirmation,
				depth: depth + 1,
			});
			response.logs.push(...subLogs.logs);
			response.success.push(...subLogs.success);
			response.error.push(...subLogs.error);
			response.unchanged.push(...subLogs.unchanged);
		}
	}

	return response;
};

export const getRenameLogs = (
	results: RenameResult[],
	verbose?: boolean,
	onlyChanges?: boolean,
	tree?: boolean,
	isConfirmation?: boolean
): string => {
	const labels: Record<RenameResultType, string> = {
		success: chalk.bgGreenBright(
			!isConfirmation ? '  SUCCESS  ' : '  POSSIBLE '
		),
		error: chalk.bgRedBright(!isConfirmation ? '   ERROR   ' : '   ISSUE   '),
		unchanged: chalk.bgYellowBright(' UNCHANGED '),
	};

	const { logs, success, error, unchanged } = getRecursiveLogs({
		results,
		labels,
		verbose,
		onlyChanges,
		tree,
		isConfirmation,
	});

	logs.push(
		[
			'\n',
			labels.success,
			chalk.bold.green(` ${success.length} `),
			labels.error,
			chalk.bold.red(` ${error.length} `),
			labels.unchanged,
			chalk.bold.yellow(` ${unchanged.length} `),
			'\n',
		].join('')
	);

	return logs.join('\n');
};

const getExists = async (file: string): Promise<boolean> => {
	return access(file)
		.then(() => true)
		.catch(() => false);
};

const getIsFolder = async (file: string): Promise<boolean> => {
	return getExists(file)
		.then(async () => stat(file))
		.then((stats) => stats.isDirectory())
		.catch(() => false);
};

const findFiles = async (folder: string): Promise<RenameResult[]> => {
	const files = await readdir(folder);
	files.sort((first, second) => first.localeCompare(second));

	return Promise.all(
		files.map(async (file) => {
			const oldPath = path.join(folder, file);
			const [name = '', extension = ''] = file.split(/\.(?!.*\..*)/u);

			const newName = `${formatToken(name, 'kebab')}${
				extension ? '.' : ''
			}${extension}`;
			const newPath = newName !== file ? path.join(folder, newName) : oldPath;
			let children: RenameResult['children'];

			try {
				const isFolder = await getIsFolder(oldPath);
				if (isFolder) children = await findFiles(oldPath);

				if (newName === file)
					return {
						type: 'unchanged',
						path: folder,
						oldName: file,
						children,
					};

				const exists = await getExists(newPath);

				if (exists) throw new Error(RenameErrors.EXISTS);

				return {
					type: 'success',
					path: folder,
					oldName: file,
					newName,
					children,
				};
			} catch (error) {
				return {
					type: 'error',
					path: folder,
					oldName: file,
					newName,
					error: getError(error),
					children,
				};
			}
		})
	);
};

const renameFiles = async (
	folder: string,
	files: RenameResult[]
): Promise<RenameResult[]> => {
	return Promise.all(
		files.map(async (file) => {
			const oldPath = path.join(folder, file.oldName);
			const newPath = path.join(folder, file.newName ?? file.oldName);

			const children = file.children
				? await renameFiles(newPath, file.children)
				: undefined;

			if (file.type === 'success')
				try {
					await rename(oldPath, newPath);
				} catch (error) {
					return {
						...file,
						type: 'error',
						error: getError(error),
						children,
					};
				}

			return {
				...file,
				children,
			};
		})
	);
};

export const RECURSIVE_RENAME_HELP = [
	'kebab-rename PATH \x12b[9m[OPTIONS]',
	'\n',
].join('\n');

export const recursiveRename = async (
	location: string,
	{ yes, verbose, onlyChanges, tree }: RenameOptions
): Promise<RenameResult[]> => {
	const folder = location.replace(/\/+$/u, '');

	if (!(await getIsFolder(folder))) throw new Error(RenameErrors.BAD_PATH);

	const files = await findFiles(folder);

	if (!yes) {
		console.info(getRenameLogs(files, verbose, onlyChanges, tree, true));

		prompt.start();
		prompt.message = '';
		prompt.delimiter = '';
		const { confirm } = await prompt.get({
			properties: {
				confirm: {
					description: 'Do you want to continue? [y/n]: ',
					type: 'string',
					pattern: /^[yn]$/iu,
					message: 'Please enter y for yes or n for no',
				},
			},
		});

		if (confirm !== 'y' && confirm !== 'Y') return [];
	}

	const results = await renameFiles(folder, files);

	console.info(getRenameLogs(results, verbose, onlyChanges, tree));

	return results;
};

if (process.env.NODE_ENV !== 'test')
	try {
		const args = argumentParser<Params>(process.argv.slice(2), {
			alias: {
				yes: 'y',
				verbose: 'v',
				'only-changes': 'o',
				tree: 't',
				help: 'h',
			},
		});

		const {
			_: [folder],
			verbose,
			yes,
			'only-changes': onlyChanges,
			tree,
			help,
		} = paramsSchema.parse(args);

		recursiveRename(folder, {
			yes,
			verbose,
			onlyChanges,
			tree,
			help,
		}).catch(console.error);
	} catch {
		throw new Error(RenameErrors.BAD_ARGUMENTS);
	}
