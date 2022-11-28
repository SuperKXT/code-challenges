import {
	appendFileSync,
	existsSync,
	mkdirSync,
	rmSync,
} from 'fs';
import { tmpdir } from 'os';
import path from 'path';

import {
	getRecursiveRenameLog,
	recursiveRename,
	RenameErrors,
	RenameResult,
} from './recursive-rename';

const tempPath = path.join(tmpdir(), 'test');

interface AgnosticFile {
	type: 'success' | 'error' | 'unchanged',
	oldName: string,
	newName?: string,
	error?: string,
	children?: File[],
}

interface ValidFile extends AgnosticFile {
	type: 'success',
	newName: string,
	error?: undefined,
}

interface ErrorFile extends AgnosticFile {
	type: 'error',
	newName: string,
	error: string,
}

interface UnchangedFile extends AgnosticFile {
	type: 'unchanged',
	newName?: undefined,
	error?: undefined,
}

type File = (
	| ValidFile
	| ErrorFile
	| UnchangedFile
);

type Test = File[];


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
			type: 'unchanged',
			oldName: 'file-1.yml',
		},
	],
];

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

const getResponse = (
	files: Test,
	directory: string = tempPath
): RenameResult => {
	files.sort((a, b) => {
		return a.oldName.localeCompare(b.oldName);
	});
	const response: RenameResult = {
		renames: [],
		errors: [],
		unchanged: [],
	};
	for (const { type, oldName, newName, error, children } of files) {
		const oldPath = path.join(directory, oldName);
		const newPath = path.join(directory, newName ?? oldName);
		if (type === 'success') {
			response.renames.push({
				oldPath,
				newPath,
			});
		}
		if (type === 'error') {
			response.errors.push({
				oldPath,
				newPath,
				error,
			});
		}
		if (type === 'unchanged') {
			response.unchanged.push(oldPath);
		}
		if (children) {
			const { renames, errors, unchanged } = getResponse(children, newPath);
			response.renames.push(...renames);
			response.unchanged.push(...unchanged);
			response.errors.push(...errors);
		}
	}
	return response;
};

describe('testing recursive-rename function', () => {
	it.each(tests)('should setup the files and rename recursively', async (...files) => {

		const logSpy = jest.spyOn(global.console, 'info').mockImplementation();

		const expectedOutput = getResponse(files);
		createFiles(files);

		const output = await recursiveRename(tempPath, { yes: true });
		expect(output).toStrictEqual(expectedOutput);
		checkFiles(files);
		expect(logSpy).toBeCalled();
		expect(logSpy).toBeCalledTimes(1);
		expect(logSpy).toBeCalledWith(
			getRecursiveRenameLog(expectedOutput)
		);

		logSpy.mockRestore();

	});
});
