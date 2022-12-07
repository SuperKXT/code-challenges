import { readFile } from 'fs/promises';
import path from 'path';

import { raumdeuter } from './raumdeuter';

type Solution = ReturnType<typeof raumdeuter>;

interface Test {
	input: string,
	output: Solution,
};

const example = [
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


describe('testing raumdeuter', () => {
	it('should return the correct solution for example test', () => {
		expect(raumdeuter(example)).toStrictEqual({
			smallFiles: 95437,
			deletedSize: 24933642,
		});
	});
	it('should return the correct solution for the input file', async () => {
		const input = await readFile(
			path.join(__dirname, 'input.txt'),
			'utf-8'
		);
		expect(raumdeuter(input)).toStrictEqual({
			smallFiles: 1086293,
			deletedSize: 366028,
		});
	});
});
