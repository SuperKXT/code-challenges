import {
	statSync,
	readdirSync,
	renameSync,
	existsSync,
} from 'fs';
import path from 'path';

import chalk from 'chalk';
import argumentParser from 'minimist-lite';
import prompt from 'prompt';
import { z } from 'zod';

import { formatToken } from '../helpers/string';

import {
	RenameErrors,
	RenameOptions,
	RenameResult,
	RenameResultType,
	renameResultType,
} from './recursive-rename.types';

const paramsSchema = z.strictObject(
	{
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
	}
);

export type Params = z.infer<typeof paramsSchema>;

interface RecursiveLogResponse {
	logs: string[],
	success: RenameResult[],
	error: RenameResult[],
	unchanged: RenameResult[],
}

export const getRecursiveLogs = (
	results: RenameResult[],
	labels: Record<RenameResultType, string>,
	verbose?: boolean,
	onlyChanges?: boolean,
	tree?: boolean,
	isConfirmation?: boolean,
	depth: number = 1
): RecursiveLogResponse => {

	const response: RecursiveLogResponse = {
		logs: [],
		success: [],
		error: [],
		unchanged: [],
	};

	for (const result of results) {

		const {
			type,
			path,
			oldName,
			newName,
			error,
			children,
		} = result;

		response[type].push(result);

		if (
			verbose
			&& (!onlyChanges || type !== 'unchanged' || (tree && children))
		) {
			const log = [
				tree && '  '.repeat(depth - 1),
				tree && chalk.dim('|_ '),
				!tree && labels[type],
				!tree && chalk.dim(path),
				type === 'unchanged' ? oldName : chalk.strikethrough(oldName),
				type !== 'unchanged' && chalk[type === 'success' ? 'green' : 'red'](newName),
				type === 'error' && chalk.bgRed(error),
			].filter(Boolean).join('');

			response.logs.push(log);
		}

		if (children) {
			const subLogs = getRecursiveLogs(
				children,
				labels,
				verbose,
				onlyChanges,
				tree,
				isConfirmation,
				depth + 1
			);
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
		success: chalk.bgGreen(!isConfirmation ? '  SUCCESS  ' : '  POSSIBLE '),
		error: chalk.bgRed(!isConfirmation ? '   ERROR   ' : '   ISSUE   '),
		unchanged: chalk.bgYellow(' UNCHANGED '),
	};

	const {
		logs,
		success,
		error,
		unchanged,
	} = getRecursiveLogs(
		results,
		labels,
		verbose,
		onlyChanges,
		tree,
		isConfirmation
	);

	logs.push([
		'\n',
		labels.success,
		chalk.green(success.length),
		labels.error,
		chalk.red(error.length),
		labels.unchanged,
		chalk.yellow(unchanged.length),
		'\n',
	].join(' '));

	return logs.join('\n');

};

const findFiles = (
	folder: string
): RenameResult[] => {

	const files = readdirSync(folder);
	files.sort((a, b) =>
		a.localeCompare(b)
	);

	const response: RenameResult[] = [];

	for (const file of files) {

		const oldPath = path.join(folder, file);
		const [
			name = '',
			extension = '',
		] = file.split(/\.(?!.*\..*)/);

		const newName = `${formatToken(name, 'kebab')}${extension ? '.' : ''}${extension}`;
		const newPath = (
			newName !== file
				? path.join(folder, newName)
				: oldPath
		);
		let children: RenameResult['children'] = undefined;

		try {
			if (statSync(oldPath).isDirectory()) {
				children = findFiles(oldPath);
			}
			if (newName !== file) {

				if (existsSync(newPath)) {
					response.push({
						type: 'error',
						path: folder,
						oldName: file,
						newName,
						error: RenameErrors.EXISTS,
						children,
					});
				}
				else {
					response.push({
						type: 'success',
						path: folder,
						oldName: file,
						newName,
						children,
					});
				}
			}
			else {
				response.push({
					type: 'unchanged',
					path: folder,
					oldName: file,
					children,
				});
			}
		}
		catch (error: any) {
			response.push({
				type: 'error',
				path: folder,
				oldName: file,
				newName,
				error: RenameErrors.EXISTS,
				children,
			});
		}
	}

	return response;

};

const renameFiles = (
	folder: string,
	files: RenameResult[]
): RenameResult[] => {

	const results: RenameResult[] = [];

	for (const file of files) {

		const oldPath = path.join(folder, file.oldName);
		const newPath = path.join(folder, file.newName ?? file.oldName);

		const children = (
			file.children
				? renameFiles(newPath, file.children)
				: undefined
		);

		if (file.type === 'success') {
			try {
				renameSync(oldPath, newPath);
			}
			catch (error: any) {
				results.push({
					...file,
					type: 'error',
					error: error.message ?? error,
					children,
				});
				continue;
			}
		}

		results.push({
			...file,
			children,
		});

	}

	return results;

};

export const RECURSIVE_RENAME_HELP = [
	'kebab-rename PATH \x12b[9m[OPTIONS]',
	'\n',

].join('\n');

export const recursiveRename = async (
	folder: string,
	{
		yes,
		verbose,
		onlyChanges,
		tree,
	}: RenameOptions
): Promise<RenameResult[]> => {

	folder = folder.replace(/\/+$/, '');

	const isFolder = (
		existsSync(folder)
		&& statSync(folder).isDirectory()
	);
	if (!isFolder) {
		throw new Error(RenameErrors.BAD_PATH);
	}

	const files = findFiles(folder);

	if (!yes) {

		console.info(getRenameLogs(
			files,
			verbose,
			onlyChanges,
			tree,
			true
		));

		prompt.start();
		prompt.message = '';
		prompt.delimiter = '';
		const { confirm } = await prompt.get({
			properties: {
				confirm: {
					description: 'Do you want to continue? [y/n]: ',
					type: 'string',
					pattern: /^[yn]$/i,
					message: 'Please enter y for yes or n for no',
				},
			},
		});

		if (confirm !== 'y' && confirm !== 'Y') {
			return [];
		}

	}

	const results = renameFiles(folder, files);

	console.info(
		getRenameLogs(
			results,
			verbose,
			onlyChanges,
			tree
		)
	);

	return results;

};

if (process.env.NODE_ENV !== 'test') {
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
		});

	}
	catch {
		throw new Error(RenameErrors.BAD_ARGUMENTS);
	}
}
