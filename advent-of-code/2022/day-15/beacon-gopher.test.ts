import { readFile } from 'fs/promises';
import path from 'path';

import { beaconGopher } from './beacon-gopher';

const example = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

type Solution = ReturnType<typeof beaconGopher>;

describe('testing sandTetris', () => {
	it('should return the correct solution for example test', () => {
		const response = beaconGopher(example, 10);
		const solution: Solution = {
			part1: 26,
			part2: 0,
		};
		expect(response).toStrictEqual(solution);
	});
	it.skip('should return the correct solution for the input file', async () => {
		const input = (await readFile(
			path.join(__dirname, 'input.txt'),
			'utf-8'
		)).slice(0, -1);
		const solution: Solution = {
			part1: 0,
			part2: 0,
		};
		expect(beaconGopher(input)).toStrictEqual(solution);
	});
});
