import {
	appendFileSync,
	existsSync,
	mkdirSync,
	rmSync,
} from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { getRecursiveRenameLog, recursiveRename } from './recursive-rename';

type File = string | [string, File[]];

interface Test {
	files: File[],
	result: File[],
	renamed: number,
	logs: string,
}

const tests: Test[] = [
	{
		files: [
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
		result: [
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
		renamed: 6,
		logs: getRecursiveRenameLog(6),
	}
];

const tempPath = path.join(tmpdir(), 'test');

beforeEach(() => {
	if (existsSync(tempPath)) {
		rmSync(tempPath, {
			recursive: true,
			force: true,
		});
	}
	mkdirSync(tempPath);
});

// // afterEach(() => {
// // 	rmSync(tempPath, {
// // 		recursive: true,
// // 		force: true,
// // 	});
// // });

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
	it.each(tests)('should setup the files and rename recursively', ({ files, result, renamed, logs }) => {

		const logSpy = jest.spyOn(global.console, 'info');

		createFiles(files);
		const output = recursiveRename(tempPath);
		expect(output).toBe(renamed);
		checkFiles(result);
		expect(logSpy).toBeCalled();
		expect(logSpy).toBeCalledTimes(1);
		expect(logSpy).toBeCalledWith(logs);

		logSpy.mockRestore();

	});
});
