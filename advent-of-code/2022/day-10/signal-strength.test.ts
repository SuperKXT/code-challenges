import { readFile } from 'fs/promises';
import path from 'path';

import { signalStrength } from './signal-strength';

const EXAMPLE = `
addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

type Solution = ReturnType<typeof signalStrength>;

test('testing signalStrength against example input', () => {
	const response = signalStrength(EXAMPLE);
	const solution: Solution = {
		crtOutput: [
			'##..##..##..##..##..##..##..##..##..##..',
			'###...###...###...###...###...###...###.',
			'####....####....####....####....####....',
			'#####.....#####.....#####.....#####.....',
			'######......######......######......####',
			'#######.......#######.......#######.....',
		].join('\n'),
		strength: 13140,
	};
	expect(response).toStrictEqual(solution);
});

test('testing signalStrength against real input', async () => {
	const input = await readFile(path.join(__dirname, 'input.txt'), 'utf-8');
	const solution: Solution = {
		crtOutput: [
			'###...##...##..####.#..#.#....#..#.####.',
			'#..#.#..#.#..#.#....#.#..#....#..#.#....',
			'###..#..#.#....###..##...#....####.###..',
			'#..#.####.#....#....#.#..#....#..#.#....',
			'#..#.#..#.#..#.#....#.#..#....#..#.#....',
			'###..#..#..##..####.#..#.####.#..#.#....',
		].join('\n'),
		strength: 16060,
	};
	expect(signalStrength(input)).toStrictEqual(solution);
});
