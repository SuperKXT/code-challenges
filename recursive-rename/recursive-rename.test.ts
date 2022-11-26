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
	RecursiveRenameReturn,
} from './recursive-rename';

type File = string | [string, File[]];

interface Test {
	initialFiles: File[],
	renamedFiles: File[],
	expectedOutput: RecursiveRenameReturn,
}

const tempPath = path.join(tmpdir(), 'test');

const tests: Test[] = [
	{
		initialFiles: [
			['folder', [
				'folderFile1',
				'folder_file_2',
				'  folder  file 3',
			]],
			'file   1',
			'FILE_2',
			'file-3',
			['Folder    No 2', []],
		],
		renamedFiles: [
			['folder', [
				'folder-file-1',
				'folder-file-2',
				'folder-file-3',
			]],
			'file-1',
			'file-2',
			'file-3',
			['folder-no-2', []],
		],
		expectedOutput: {
			renamed: 6,
			problems: [],
		},
	},
	{
		initialFiles: [
			['folder', [
				'file 1',
				'file-1',
			]],
			'file   1',
		],
		renamedFiles: [
			['folder', [
				'file 1',
				'file-1',
			]],
			'file-1',
		],
		expectedOutput: {
			renamed: 1,
			problems: [
				`\x1b[33m${tempPath}/folder/file 1\x1b[0m: could not rename to \x1b[33m${tempPath}/folder/file-1\x1b[0m. path already exists`
			],
		},
	},
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
	files: File[],
	directory: string = tempPath
) => {
	for (const file of files) {
		const path = `${directory}/${typeof file === 'string' ? file : file[0]}`;
		if (typeof file !== 'string') {
			mkdirSync(path);
			createFiles(file[1], path);
			continue;
		}
		appendFileSync(path, '');
	}
};

const checkFiles = (
	files: File[],
	directory: string = tempPath
) => {
	for (const file of files) {
		const path = `${directory}/${typeof file === 'string' ? file : file[0]}`;
		if (!existsSync(path)) {
			throw new Error(`${path} expected but not found in renamed folder`);
		}
		if (typeof file !== 'string') {
			checkFiles(file[1], path);
		}
	}
};

describe('testing recursive-rename function', () => {
	it.each(tests)('should setup the files and rename recursively', (test) => {

		const { initialFiles, renamedFiles, expectedOutput } = test;

		const logSpy = jest.spyOn(global.console, 'info').mockImplementation();

		createFiles(initialFiles);
		const output = recursiveRename(tempPath);
		expect(output).toStrictEqual(expectedOutput);
		checkFiles(renamedFiles);
		expect(logSpy).toBeCalled();
		expect(logSpy).toBeCalledTimes(1);
		expect(logSpy).toBeCalledWith(
			getRecursiveRenameLog(expectedOutput)
		);

		logSpy.mockRestore();

	});
});
