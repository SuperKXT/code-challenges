import {
	statSync,
	readdirSync,
	renameSync,
	existsSync,
} from 'fs';

import { formatToken } from '~/helpers/string';

export const getRecursiveRenameLog = (
	renamed: number,
	problems: string[] = []
): string => {
	const logs: string[] = [];
	logs.push(`\x1b[32m${renamed}\x1b[0m renames successful!`);
	if (problems.length > 0) {
		logs.push(`\n\x1b[31m${problems.length}\x1b[0m renames failed:`);
		logs.push(problems.join('\n'));
	}
	return logs.join('\n');
};

export const recursiveRename = (
	folder: string,
	isRecursive?: boolean
): number => {
	const files = readdirSync(folder);
	const problems: string[] = [];
	let renamed = 0;
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
				renamed++;
			}
			if (stats.isDirectory()) {
				renamed += recursiveRename(
					newPath ?? oldPath,
					true
				);
			}

		}
		catch (error: any) {
			problems.push(`\x1b[31m${oldPath}\x1b[0m:  ${error.message ?? error}`);
		}
	}
	if (!isRecursive) {
		console.info(
			getRecursiveRenameLog(renamed, problems)
		);
	}
	return renamed;
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
