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

interface File {
	old: string,
	new: string,
	error?: string,
	unchanged?: boolean,
}
type FileOrFolder = File | [File, FileOrFolder[]];
type Test = FileOrFolder[];

const tempPath = path.join(tmpdir(), 'test');

const tests: Test[] = [
	[
		[
			{ old: 'folder', new: 'folder', unchanged: true, }, [
				{ old: 'folderFile1', new: 'folder-file-1', },
				{ old: 'folder_file_2', new: 'folder-file-2', },
				{ old: '  folder  file 3', new: 'folder-file-3', },
			]
		],
		{ old: 'file   1', new: 'file-1', },
		{ old: 'FILE_2', new: 'file-2', },
		{ old: 'file-3', new: 'file-3', unchanged: true, },
	],
	[
		[
			{ old: 'folder', new: 'folder', unchanged: true, }, [
				{ old: 'file 1', new: 'file-1', error: RenameErrors.EXISTS, },
				{ old: 'file-1', new: 'file-1', unchanged: true, },
			],
		],
		{ old: 'file-1', new: 'file-1', unchanged: true, },
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
	for (const file of files) {
		const isDirectory = Array.isArray(file);
		const path = `${directory}/${isDirectory ? file[0].old : file.old}`;
		if (isDirectory) {
			mkdirSync(path);
			createFiles(file[1], path);
			continue;
		}
		appendFileSync(path, '');
	}
};

const checkFiles = (
	files: Test,
	directory: string = tempPath
) => {
	for (const file of files) {
		const isDirectory = Array.isArray(file);
		const current = isDirectory ? file[0] : file;
		const path = `${directory}/${!current.error && !current.unchanged && current.new ? current.new : current.old}`;
		if (!existsSync(path)) {
			throw new Error(`${path} expected but not found in renamed folder`);
		}
		if (isDirectory) {
			checkFiles(file[1], path);
		}
	}
};

const getResponse = (
	files: Test,
	directory: string = tempPath
): RenameResult => {
	files.sort((a, b) => {
		const aFile = Array.isArray(a) ? a[0] : a;
		const bFile = Array.isArray(b) ? b[0] : b;
		return aFile.old.localeCompare(bFile.old);
	});
	const response: RenameResult = {
		renames: [],
		errors: [],
		unchanged: [],
	};
	for (const file of files) {
		const isDirectory = Array.isArray(file);
		const current = isDirectory ? file[0] : file;
		const oldPath = `${directory}/${current.old}`;
		const newPath = `${directory}/${current.new}`;
		if (!current.error && !current.unchanged) {
			response.renames.push({
				oldPath,
				newPath,
			});
		}
		if (current.error) {
			response.errors.push({
				oldPath,
				newPath,
				error: current.error,
			});
		}
		if (current.unchanged) {
			response.unchanged.push(oldPath);
		}
		if (isDirectory) {
			const path = `${directory}/${!current.error && !current.unchanged && current.new ? current.new : current.old}`;
			const { renames, errors, unchanged } = getResponse(file[1], path);
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
