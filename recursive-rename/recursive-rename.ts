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
	},
	{
		invalid_type_error: 'correct usage: kebab-rename PATH [-y --yes -v --verbose -o --only-changes -t --tree]',
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
		success: `\x1b[42m ${!isConfirmation ? 'SUCCESS' : 'POSSIBLE'} \x1b[0m`,
		error: `\x1b[41m ${!isConfirmation ? 'ERROR' : 'ISSUE'} \x1b[0m`,
		unchanged: `\x1b[43m ${'UNCHANGED'} \x1b[0m`,
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
			oldName,
			newName,
			error,
			children,
		} = result;

		response[type].push(result);

		if (
			verbose
			&& (!onlyChanges || type !== 'unchanged' || children)
		) {
			const log = [
				`${'  '.repeat(depth - 1)}\x1b[2m|_\x1b[0m`,
				`${oldName}`,
				type !== 'unchanged' && '\x1b[2m=>\x1b[0m',
				newName,
				labels[type],
				type === 'error' && `\x1b[31m${error}\x1b[0m`,
			].filter(Boolean).join(' ');

			response.logs.push(log);
		}

		if (children) {
			const subLogs = getRecursiveLogs(
				children,
				verbose,
				onlyChanges,
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
		success: !isConfirmation ? 'SUCCESS' : 'POSSIBLE',
		errors: !isConfirmation ? 'ERROR' : 'ISSUE',
		unchanged: 'UNCHANGED',
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
		`\x1b[42m${labels.success}\x1b[0m`,
		`\x1b[32m${success.length}\x1b[0m`,
		`\x1b[41m${labels.errors}\x1b[0m`,
		`\x1b[31m${error.length}\x1b[0m`,
		`\x1b[43m${labels.unchanged}\x1b[0m`,
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
						oldName: file,
						newName,
						error: RenameErrors.EXISTS,
						children,
					});
				}
				else {
					response.push({
						type: 'success',
						oldName: file,
						newName,
						children,
					});
				}
			}
			else {
				response.push({
					type: 'unchanged',
					oldName: file,
					children,
				});
			}
		}
		catch (error: any) {
			response.push({
				type: 'error',
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
	if (!statSync(folder).isDirectory()) {
		throw new Error('the given path must be a directory');
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

	const args = argumentParser<Params>(process.argv.slice(2), {
		alias: {
			yes: 'y',
			verbose: 'v',
			'only-changes': 'o',
			tree: 't',
		},
	});

	const {
		_: [folder],
		verbose,
		yes,
		'only-changes': onlyChanges,
		tree,
	} = paramsSchema.parse(args);

	recursiveRename(folder, {
		yes,
		verbose,
		onlyChanges,
		tree,
	});

}
