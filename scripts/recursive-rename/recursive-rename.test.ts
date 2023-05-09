import { appendFileSync, existsSync, mkdirSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

import { getRenameLogs, recursiveRename } from './recursive-rename';
import { RENAME_ERRORS } from './recursive-rename.types';

import type { RenameOptions, RenameResult } from './recursive-rename.types';

const TEMP_PATH = path.join(tmpdir(), 'test');

type Test = RenameResult[];

const TESTS: Test[] = [
	[
		{
			children: [
				{
					newName: 'folder-file-1.txt',
					oldName: 'folderFile1.txt',
					path: path.join(TEMP_PATH, 'folder'),
					type: 'success',
				},
				{
					newName: 'folder-file-2.js',
					oldName: 'folder_file_2.js',
					path: path.join(TEMP_PATH, 'folder'),
					type: 'success',
				},
				{
					newName: 'folder-file-3.ts',
					oldName: '  folder  file 3.ts',
					path: path.join(TEMP_PATH, 'folder'),
					type: 'success',
				},
			],
			oldName: 'folder',
			path: TEMP_PATH,
			type: 'unchanged',
		},
		{
			newName: 'file-1.txt',
			oldName: 'file   1.txt',
			path: TEMP_PATH,
			type: 'success',
		},
		{
			newName: 'file-2.txt',
			oldName: 'FILE_2.txt',
			path: TEMP_PATH,
			type: 'success',
		},
		{
			oldName: 'file-3.txt',
			path: TEMP_PATH,
			type: 'unchanged',
		},
	],
	[
		{
			children: [
				{
					error: RENAME_ERRORS.exists,
					newName: 'file-1.json',
					oldName: 'file 1.json',
					path: path.join(TEMP_PATH, 'folder'),
					type: 'error',
				},
				{
					oldName: 'file-1.json',
					path: path.join(TEMP_PATH, 'folder'),
					type: 'unchanged',
				},
			],
			oldName: 'folder',
			path: TEMP_PATH,
			type: 'unchanged',
		},
		{
			newName: 'file-1.yml',
			oldName: 'file 1.yml',
			path: TEMP_PATH,
			type: 'success',
		},
	],
];

const recursiveSort = (files: RenameResult[]): RenameResult[] => {
	files.sort((first, second) => first.oldName.localeCompare(second.oldName));
	return files.map(({ children, ...file }) => ({
		...file,
		children: children ? recursiveSort(children) : undefined,
	}));
};

const SORTED_TESTS = TESTS.map(recursiveSort);

// eslint-disable-next-line jest/no-hooks
beforeEach(() => {
	if (existsSync(TEMP_PATH)) {
		rmSync(TEMP_PATH, {
			force: true,
			recursive: true,
		});
	}

	mkdirSync(TEMP_PATH);
});

// eslint-disable-next-line jest/no-hooks
afterEach(() => {
	rmSync(TEMP_PATH, {
		force: true,
		recursive: true,
	});
});

const createFiles = (files: Test, directory: string = TEMP_PATH) => {
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

const checkFiles = (files: Test, directory: string = TEMP_PATH) => {
	for (const { type, oldName, newName, children } of files) {
		const currentName = path.join(
			directory,
			type === 'success' ? newName : oldName
		);
		if (!existsSync(currentName)) {
			throw new Error(
				`${currentName} expected but not found in renamed folder`
			);
		}

		if (children) checkFiles(children, currentName);
	}
};

describe('testing recursive-rename function', () => {
	it.each(SORTED_TESTS)(
		'should setup the files and rename recursively',
		async (...files) => {
			const logSpy = vi
				.spyOn(global.console, 'info')
				.mockImplementation(() => false);

			createFiles(files);

			const options: RenameOptions = {
				onlyChanges: false,
				tree: false,
				verbose: true,
				yes: true,
			};

			const output = await recursiveRename(TEMP_PATH, options);

			checkFiles(files);

			expect(output).toStrictEqual(files);
			expect(logSpy).toHaveBeenCalledTimes(1);
			expect(logSpy).toHaveBeenCalledWith(
				getRenameLogs(files, options.verbose, options.onlyChanges, options.tree)
			);

			logSpy.mockRestore();
		}
	);

	it('should throw an error for invalid path', async () => {
		await expect(
			recursiveRename('./invalid-path', { yes: true })
		).rejects.toThrow(RENAME_ERRORS.badPath);
		await expect(
			recursiveRename(path.join(__dirname, 'README.md'), { yes: true })
		).rejects.toThrow(RENAME_ERRORS.badPath);
	});
});
