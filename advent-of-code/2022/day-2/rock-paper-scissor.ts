import { readFile } from 'fs/promises';
import path from 'path';

import { z } from 'zod';

const arg1Schema = z.enum(['A', 'B', 'C']);
type VersusMove = z.infer<typeof arg1Schema>;

const arg2Schema = z.enum(['X', 'Y', 'Z']);
type PlayerMove = z.infer<typeof arg2Schema>;

type Result = z.infer<typeof arg2Schema>;

const matchSchema = z.tuple([arg1Schema, arg2Schema]);

const playerRules = {
	X: {
		score: 1,
		wins: 'C',
		loses: 'B',
	},
	Y: {
		score: 2,
		wins: 'A',
		loses: 'C',
	},
	Z: {
		score: 3,
		wins: 'B',
		loses: 'A',
	},
} satisfies {
	[key in PlayerMove]: {
		score: 1 | 2 | 3;
		wins: VersusMove;
		loses: VersusMove;
	};
};

const versusRules = {
	A: {
		wins: 'Z',
		loses: 'Y',
		draws: 'X',
	},
	B: {
		wins: 'X',
		loses: 'Z',
		draws: 'Y',
	},
	C: {
		wins: 'Y',
		loses: 'X',
		draws: 'Z',
	},
} satisfies {
	[key in VersusMove]: {
		wins: PlayerMove;
		loses: PlayerMove;
		draws: PlayerMove;
	};
};

const getPart1Score = (
	versusMove: VersusMove,
	playerMove: PlayerMove
): number => {
	const { score, wins, loses } = playerRules[playerMove];
	switch (versusMove) {
		case wins:
			return score + 6;
		case loses:
			return score + 0;
		default:
			return score + 3;
	}
};

const getPart2Score = (versusMove: VersusMove, result: Result): number => {
	const { wins, loses, draws } = versusRules[versusMove];
	switch (result) {
		case 'Z':
			return playerRules[loses].score + 6;
		case 'X':
			return playerRules[wins].score + 0;
		default:
			return playerRules[draws].score + 3;
	}
};

export interface RockPaperScissorsSolution {
	part1: number;
	part2: number;
}

export const rockPaperScissors =
	async (): Promise<RockPaperScissorsSolution> => {
		const input = await readFile(path.join(__dirname, 'input.txt'), 'utf-8');

		const score = input.split('\n').reduce(
			({ part1, part2 }, row) => {
				try {
					const [versus, playerOrResult] = matchSchema.parse(row.split(' '));
					return {
						part1: part1 + getPart1Score(versus, playerOrResult),
						part2: part2 + getPart2Score(versus, playerOrResult),
					};
				} catch (error) {
					return { part1, part2 };
				}
			},
			{ part1: 0, part2: 0 }
		);

		return score;
	};
