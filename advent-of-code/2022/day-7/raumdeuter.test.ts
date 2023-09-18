import { readFile } from 'fs/promises';
import path from 'path';

import { raumdeuter } from './raumdeuter.js';

const EXAMPLE = [
	'$ cd /',
	'$ ls',
	'dir a',
	'14848514 b.txt',
	'8504156 c.dat',
	'dir d',
	'$ cd a',
	'$ ls',
	'dir e',
	'29116 f',
	'2557 g',
	'62596 h.lst',
	'$ cd e',
	'$ ls',
	'584 i',
	'$ cd ..',
	'$ cd ..',
	'$ cd d',
	'$ ls',
	'4060174 j',
	'8033020 d.log',
	'5626152 d.ext',
	'7214296 k',
].join('\n');

test('testing raumdeuter against example input', () => {
	expect(raumdeuter(EXAMPLE)).toStrictEqual({
		deletedSize: 24933642,
		smallFiles: 95437,
	});
});

test('testing raumdeuter against real input', async () => {
	const input = await readFile(path.join(__dirname, 'input.txt'), 'utf-8');
	expect(raumdeuter(input)).toStrictEqual({
		deletedSize: 366028,
		smallFiles: 1086293,
	});
});
