import { readFile } from 'fs/promises';
import path from 'path';

import { orderedPairs } from './ordered-pairs';

const example = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

type Solution = ReturnType<typeof orderedPairs>;

describe('testing orderedPairs', () => {
	it('should return the correct solution for example test', () => {
		const response = orderedPairs(example);
		const solution: Solution = {
			indicesSum: 13,
			part2: 140,
		};
		expect(response).toStrictEqual(solution);
	});
	it('should return the correct solution for the input file', async () => {
		const input = (
			await readFile(path.join(__dirname, 'input.txt'), 'utf-8')
		).slice(0, -1);
		const solution: Solution = {
			indicesSum: 5013,
			part2: 25038,
		};
		expect(orderedPairs(input)).toStrictEqual(solution);
	});
});
