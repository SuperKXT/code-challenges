import {
	statSync,
	readdirSync,
	renameSync,
	existsSync,
} from 'fs';

import { formatToken } from '../helpers/string';

export interface RecursiveRenameReturn {
	renamed: number,
	problems: string[],
}

export const getRecursiveRenameLog = (
	{ renamed, problems }: RecursiveRenameReturn
): string => {
	const logs: string[] = [];
	logs.push(`\x1b[32m${renamed}\x1b[0m renames successful!`);
	if (problems.length > 0) {
		logs.push(`\n\x1b[31m${problems.length}\x1b[0m renames failed:`);
		logs.push(problems.join('\n'));
	}
	return logs.join('\n') + '\n';
};

export const recursiveRename = (
	folder: string,
	isRecursive?: boolean
): RecursiveRenameReturn => {
	const files = readdirSync(folder);
	const output: RecursiveRenameReturn = {
		renamed: 0,
		problems: [],
	};
	for (const file of files) {
		const oldPath = `${folder}/${file}`;
		try {
			const stats = statSync(oldPath);
			const kebabName = formatToken(file, 'kebab');
			const newPath = (
				kebabName !== file
					? `${folder}/${kebabName}`
					: undefined
			);
			if (newPath) {
				if (existsSync(newPath)) {
					throw new Error(`could not rename to \x1b[33m${newPath}\x1b[0m. path already exists`);
				}
				renameSync(oldPath, newPath);
				output.renamed++;
			}
			if (stats.isDirectory()) {
				const { renamed, problems } = recursiveRename(
					newPath ?? oldPath,
					true
				);
				output.renamed += renamed;
				output.problems.push(...problems);
			}

		}
		catch (error: any) {
			output.problems.push(`\x1b[33m${oldPath}\x1b[0m: ${error.message ?? error}`);
		}
	}
	if (!isRecursive) {
		console.info(
			getRecursiveRenameLog(output)
		);
	}
	return output;
};

if (process.env.NODE_ENV !== 'test') {

	const directory = process.argv[2];
	if (!directory || typeof directory !== 'string') {
		throw new Error('a path must be passed to the script');
	}
	const stats = statSync(directory);
	if (!stats.isDirectory()) {
		throw new Error('the given path must be a directory');
	}

	recursiveRename(directory);

}
