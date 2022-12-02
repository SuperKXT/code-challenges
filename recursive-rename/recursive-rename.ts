import {
	statSync,
	readdirSync,
	renameSync,
	existsSync,
} from 'fs';
import path from 'path';

import argumentParser from 'minimist-lite';
import prompt from 'prompt';
import { z } from 'zod';

import { formatToken } from '../helpers/string';

import {
	RenameErrors,
	RenameOptions,
	RenameResult,
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
	verbose?: boolean,
	onlyChanges?: boolean,
	tree?: boolean,
	isConfirmation?: boolean,
	depth: number = 1
): RecursiveLogResponse => {

	const labels = {
		success: `\x1b[42m${!isConfirmation ? '  SUCCESS  ' : '  POSSIBLE '}\x1b[0m`,
		error: `\x1b[41m${!isConfirmation ? '   ERROR   ' : '   ISSUE   '}\x1b[0m`,
		unchanged: `\x1b[43m${' UNCHANGED '}\x1b[0m`,
	};

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
				tree && `${'  '.repeat(depth - 1)}\x1b[2m|_\x1b[0m `,
				!tree && labels[type],
				!tree && ` \x1b[2m${path}/\x1b[0m`,
				`${type === 'unchanged' ? '' : '\x1b[9m'}${oldName}\x1b[0m`,
				type !== 'unchanged' && ` ${type === 'success' ? '\x1b[32m' : '\x1b[31m'}${newName}\x1b[0m`,
				type === 'error' && ` \x1b[41m ${error} \x1b[0m`,
			].filter(Boolean).join('');

			response.logs.push(log);
		}

		if (children) {
			const subLogs = getRecursiveLogs(
				children,
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

	const labels = {
		success: `\x1b[42m${!isConfirmation ? '  SUCCESS  ' : '  POSSIBLE '}\x1b[0m`,
		error: `\x1b[41m${!isConfirmation ? '   ERROR   ' : '   ISSUE   '}\x1b[0m`,
		unchanged: `\x1b[43m${' UNCHANGED '}\x1b[0m`,
	};

	const {
		logs,
		success,
		error,
		unchanged,
	} = getRecursiveLogs(
		results,
		verbose,
		onlyChanges,
		tree,
		isConfirmation
	);

	logs.push([
		'\n',
		labels.success,
		`\x1b[32m${success.length}\x1b[0m`,
		labels.error,
		`\x1b[31m${error.length}\x1b[0m`,
		labels.unchanged,
		`\x1b[33m${unchanged.length}\x1b[0m`,
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
