import {
	statSync,
	readdirSync,
	renameSync,
	existsSync,
} from 'fs';

import argumentParser from 'minimist-lite';
import path from 'path';
import prompt from 'prompt';
import { z } from 'zod';

import { formatToken } from '../helpers/string';

const argumentSchema = z.strictObject(
	{
		_: z.tuple([z.string()]),
		'--': z.string().array().length(0).optional(),
		yes: z.boolean(),
		y: z.boolean(),
		verbose: z.boolean(),
		v: z.boolean(),
	},
	{
		invalid_type_error: 'correct usage: kebab-rename PATH [-y --yes -v --verbose]',
	}
);

export type Arguments = z.infer<typeof argumentSchema>;

export const defaultArguments: Omit<Arguments, '_'> = {
	yes: false,
	y: false,
	verbose: false,
	v: false,
};

export interface RenameResult {
	renames: {
		oldPath: string,
		newPath: string,
	}[],
	errors: {
		oldPath: string,
		newPath: string,
		error: string,
	}[],
	unchanged: string[],
}

interface Options {
	verbose?: boolean,
	yes?: boolean,
}

interface LogArgs extends RenameResult {
	verbose?: boolean,
	confirmation?: boolean,
}

export enum RenameErrors {
	EXISTS = 'path already exists',
}

export const getRecursiveRenameLog = ({
	renames,
	errors,
	unchanged,
	confirmation,
	verbose,
}: LogArgs): string => {

	const logs: string[] = [];

	const labels = {
		renames: !confirmation ? 'SUCCESS' : 'POSSIBLE',
		errors: !confirmation ? 'ERROR' : 'ISSUE',
		unchanged: 'UNCHANGED',
	};

	if (verbose) {

		logs.push(renames.map(
			({ oldPath, newPath }) => [
				`\x1b[42m${labels.renames}\x1b[0m`,
				`${oldPath}`,
				'\t->\t',
				`\x1b[32m${newPath}\x1b[0m`,
			].filter(Boolean).join(' ')
		).join('\n'));

		logs.push(errors.map(
			({ oldPath, newPath, error }) => [
				`\x1b[41m${labels.errors}\x1b[0m`,
				`${oldPath}`,
				'\t->\t',
				`\x1b[31m${newPath}\x1b[0m`,
				`:${error}`,
			].filter(Boolean).join(' ')
		).join('\n'));

		logs.push(unchanged.map(
			string => [
				`\x1b[43m${labels.unchanged}\x1b[0m`,
				`${string}`,
			].filter(Boolean).join(' ')
		).join('\n'));

	}

	logs.push([
		`\x1b[42m${labels.renames}\x1b[0m`,
		`\x1b[32m${renames.length}\x1b[0m`,
		`\x1b[41m${labels.errors}\x1b[0m`,
		`\x1b[31m${errors.length}\x1b[0m`,
		`\x1b[43m${labels.unchanged}\x1b[0m`,
		`\x1b[33m${unchanged.length}\x1b[0m`,
	].join(' '));

	return logs.join('\n\n') + '\n';

};

const getFilesRecursively = (directory: string) => {
	const filesInDirectory = readdirSync(directory);
	for (const file of filesInDirectory) {
		const absolute = path.join(directory, file);
		if (statSync(absolute).isDirectory()) {
			getFilesRecursively(absolute);
		} else {
			files.push(absolute);
		}
	}
};

const findFiles = (
	folder: string
): RenameResult => {

	const files = readdirSync(folder);
	files.sort((a, b) =>
		a.localeCompare(b)
	);

	const response: RenameResult = {
		renames: [],
		unchanged: [],
		errors: [],
	};

	for (const file of files) {

		const [
			name = '',
			extension = '',
		] = file.split(/\.(?!.*\..*)/);

		const oldPath = path.join(folder, name, extension);
		const newName = formatToken(name, 'kebab');
		const newPath = (
			newName !== file
				? path.join(folder, newName, extension)
				: oldPath
		);
		try {
			if (newName !== file) {
				if (existsSync(newPath)) {
					response.errors.push({
						oldPath,
						newPath,
						error: RenameErrors.EXISTS,
					});

				}
				else {
					response.renames.push({
						oldPath,
						newPath,
					});
				}
			}
			else {
				response.unchanged.push(oldPath);
			}
			const stats = statSync(oldPath);
			if (stats.isDirectory()) {
				const { renames, unchanged, errors } = findFiles(newPath);
				response.renames.push(...renames);
				response.errors.push(...errors);
				response.unchanged.push(...unchanged);
			}
		}
		catch (error: any) {
			response.errors.push({
				oldPath,
				newPath,
				error: error.message ?? error,
			});
		}
	}

	return response;

};

export const recursiveRename = async (
	folder: string,
	options: Options
): Promise<RenameResult> => {

	folder = folder.replace(/\/+$/, '');
	if (!statSync(folder).isDirectory()) {
		throw new Error('the given path must be a directory');
	}

	const { renames, unchanged, errors } = findFiles(folder);
	const response: Required<RenameResult> = {
		renames: [],
		errors,
		unchanged,
	};

	if (!options.yes) {

		console.info(
			getRecursiveRenameLog({
				renames,
				unchanged,
				errors,
				verbose: options.verbose,
				confirmation: true,
			})
		);

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
			return response;
		}

	}

	for (const { oldPath, newPath } of renames) {
		try {
			renameSync(oldPath, newPath);
			response.renames.push({ oldPath, newPath });
		}
		catch (error: any) {
			response.errors.push({
				oldPath,
				newPath,
				error: error.message ?? error,
			});
		}
	}

	console.info(
		getRecursiveRenameLog({
			...response,
			verbose: options.verbose,
		})
	);
	return response;
};

if (process.env.NODE_ENV !== 'test') {

	const { _: [folder], verbose, yes } = argumentParser<Arguments>(process.argv.slice(2), {
		alias: {
			yes: 'y',
			verbose: 'v',
		},
		default: defaultArguments,
	});

	recursiveRename(folder, { verbose, yes });

}
