/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { readFile } from 'fs/promises';
import path from 'path';

import { config } from '../../../config.js';

export const day15Path = path.join(
	config.dirname,
	'advent-of-code',
	'2024',
	'day-15',
);

const gridCellEnum = {
	empty: '.',
	box: 'O',
	wall: '#',
	robot: '@',
} as const;
type TGridCell = (typeof gridCellEnum)[keyof typeof gridCellEnum];

type TGridRow = TGridCell[];
type TGrid = TGridRow[];

const movements = ['^', 'v', '>', '<'] as const;
type TMovement = (typeof movements)[number];

export const aoc2024Day15 = (input: string) => {
	const split = input.trim().split('\n\n');
	const grid: TGrid = [];
	const swappedGrid: TGrid = [];
	let rows = 1;
	let cols = 1;
	const pos = [0, 0] as [number, number];
	let cY = 0;
	let cX = 0;
	for (const curr of split[0]?.trim() ?? '') {
		if (curr === '\n') {
			rows++;
			cols = cX + 1;
			cY++;
			cX = 0;
			continue;
		}
		const row = grid[cY] ?? [];
		if (!grid[cY]) grid[cY] = row;

		const swappedRow = swappedGrid[cX] ?? [];
		if (!swappedGrid[cX]) swappedGrid[cX] = swappedRow;

		if (curr === gridCellEnum.robot) {
			if (pos[0] !== 0 && pos[1] !== 1) throw new Error('Invalid input');
			pos[0] = cY;
			pos[1] = cX;
		}

		if (
			curr !== gridCellEnum.empty &&
			curr !== gridCellEnum.wall &&
			curr !== gridCellEnum.box &&
			curr !== gridCellEnum.robot
		)
			throw new Error('Invalid input');

		row[cX] = curr;
		swappedRow[cY] = curr;
		cX++;
	}

	const moves =
		split[1]
			?.trim()
			.split('')
			.filter((s): s is TMovement => movements.includes(s)) ?? [];

	if (!grid.length || !grid[0] || !moves.length)
		throw new Error('Invalid input');

	for (const move of moves) {
		// const prevGrid = grid.map((r) => r.slice());
		const row = grid[pos[0]] ?? [];
		const col = swappedGrid[pos[1]] ?? [];
		const nextEmpty = [pos[0], pos[1]] as [number, number];
		const nextPos = [pos[0], pos[1]] as [number, number];
		if (move === '^') {
			nextPos[0] = pos[0] - 1;
			for (let nX = pos[0] - 1; nX >= 0; nX--) {
				if (col[nX] === gridCellEnum.wall) {
					nextEmpty[0] = -1;
					break;
				} else if (col[nX] === gridCellEnum.empty) {
					nextEmpty[0] = nX;
					break;
				}
			}
		} else if (move === 'v') {
			nextPos[0] = pos[0] + 1;
			for (let nX = pos[0] + 1; nX < col.length; nX++) {
				if (col[nX] === gridCellEnum.wall) {
					nextEmpty[0] = -1;
					break;
				} else if (col[nX] === gridCellEnum.empty) {
					nextEmpty[0] = nX;
					break;
				}
			}
		} else if (move === '>') {
			nextPos[1] = pos[1] + 1;
			for (let nY = pos[1] + 1; nY < row.length; nY++) {
				if (row[nY] === gridCellEnum.wall) {
					nextEmpty[1] = -1;
					break;
				} else if (row[nY] === gridCellEnum.empty) {
					nextEmpty[1] = nY;
					break;
				}
			}
			nextEmpty[1] = row.findIndex(
				(c, i) => i > pos[1] && c === gridCellEnum.empty,
			);
		} else {
			nextPos[1] = pos[1] - 1;
			for (let nY = pos[1] - 1; nY >= 0; nY--) {
				if (row[nY] === gridCellEnum.wall) {
					nextEmpty[1] = -1;
					break;
				} else if (row[nY] === gridCellEnum.empty) {
					nextEmpty[1] = nY;
					break;
				}
			}
		}

		const nextCell = grid[nextPos[0]]![nextPos[1]];
		if (
			nextCell === gridCellEnum.wall ||
			nextEmpty[0] === -1 ||
			nextEmpty[1] === -1
		)
			continue;
		grid[pos[0]]![pos[1]] = gridCellEnum.empty;
		grid[nextPos[0]]![nextPos[1]] = gridCellEnum.robot;
		swappedGrid[pos[1]]![pos[0]] = gridCellEnum.empty;
		swappedGrid[nextPos[1]]![nextPos[0]] = gridCellEnum.robot;
		if (nextCell === gridCellEnum.box) {
			grid[nextEmpty[0]]![nextEmpty[1]] = gridCellEnum.box;
			swappedGrid[nextEmpty[1]]![nextEmpty[0]] = gridCellEnum.box;
			// console.log(`Move: ${move}`);
			// console.log(nextEmpty);
			// console.log(prevGrid.map((r) => r.join('')).join('\n'));
			// console.log(grid.map((r) => r.join('')).join('\n'));
			// console.log('\n\n');
		}
		pos[0] = nextPos[0];
		pos[1] = nextPos[1];
	}

	let sum = 0;
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			if (grid[y]![x] !== gridCellEnum.box) continue;
			sum += y * 100 + x;
		}
	}

	console.log(grid.map((r) => r.join('')).join('\n'));

	return { sum };
};

if (!config.isTest) {
	console.time('aoc-2024-day-15');
	const input = await readFile(path.join(day15Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day15(input);
	console.info(res);
	console.timeEnd('aoc-2024-day-15');
}
