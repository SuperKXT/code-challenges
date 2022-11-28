import {
	appendFileSync,
	existsSync,
	mkdirSync,
	rmSync,
} from 'fs';
import { tmpdir } from 'os';
import path from 'path';

import {
	getRenameLogs,
	recursiveRename,
} from './recursive-rename';
import {
	RenameErrors,
	RenameResult,
} from './recursive-rename.types';

const tempPath = path.join(tmpdir(), 'test');

type Test = RenameResult[];

const tests: Test[] = [
	[
		{
			type: 'unchanged',
			oldName: 'folder',
			children: [
				{
					type: 'success',
					oldName: 'folderFile1.txt',
					newName: 'folder-file-1.txt',
				},
				{
					type: 'success',
					oldName: 'folder_file_2.js',
					newName: 'folder-file-2.js',
				},
				{
					type: 'success',
					oldName: '  folder  file 3.ts',
					newName: 'folder-file-3.ts',
				},
			],
		},
		{
			type: 'success',
			oldName: 'file   1.txt',
			newName: 'file-1.txt',
		},
		{
			type: 'success',
			oldName: 'FILE_2.txt',
			newName: 'file-2.txt',
		},
		{
			type: 'unchanged',
			oldName: 'file-3.txt',
		},
	],
	[
		{
			type: 'unchanged',
			oldName: 'folder',
			children: [
				{
					type: 'error',
					oldName: 'file 1.json',
					newName: 'file-1.json',
					error: RenameErrors.EXISTS,
				},
				{
					type: 'unchanged',
					oldName: 'file-1.json',
				},
			],
		},
		{
			type: 'success',
			oldName: 'file 1.yml',
			newName: 'file-1.yml',
		},
	],
];

const recursiveSort = (
	files: RenameResult[]
): RenameResult[] => {
	files.sort((a, b) => a.oldName.localeCompare(b.oldName));
	return files.map(({ children, ...file }) => ({
		...file,
		children: children ? recursiveSort(children) : undefined,
	}));
};

export const sortedTests = tests.map(recursiveSort);

beforeEach(() => {
	if (existsSync(tempPath)) {
		rmSync(tempPath, {
			recursive: true,
			force: true,
		});
	}
	mkdirSync(tempPath);
});

afterEach(() => {
	rmSync(tempPath, {
		recursive: true,
		force: true,
	});
});

const createFiles = (
	files: Test,
	directory: string = tempPath
) => {
	for (const { oldName, children } of files) {
		const oldPath = path.join(directory, oldName);
		if (children) {
			mkdirSync(oldPath);
			createFiles(children, oldPath);
			continue;
		}
		appendFileSync(oldPath, '');
	}
};

const checkFiles = (
	files: Test,
	directory: string = tempPath
) => {
	for (const { type, oldName, newName, children } of files) {
		const currentName = path.join(
			directory,
			type === 'success'
				? newName
				: oldName
		);
		if (!existsSync(currentName)) {
			throw new Error(`${currentName} expected but not found in renamed folder`);
		}
		if (children) {
			checkFiles(children, currentName);
		}
	}
};

describe('testing recursive-rename function', () => {
	it.each(sortedTests)('should setup the files and rename recursively', async (...files) => {

		const logSpy = jest.spyOn(global.console, 'info').mockImplementation();

		createFiles(files);

		const output = await recursiveRename(tempPath, { yes: true });
		expect(output).toStrictEqual(files);
		checkFiles(files);
		expect(logSpy).toBeCalled();
		expect(logSpy).toBeCalledTimes(1);
		expect(logSpy).toBeCalledWith(
			getRenameLogs(files)
		);

		logSpy.mockRestore();

	});
});
