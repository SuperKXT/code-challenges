import { readFile } from 'fs/promises';
import path from 'path';

import { z } from 'zod';

const ARG_1_SCHEMA = z.enum(['a', 'b', 'c']);
type VersusMove = z.infer<typeof ARG_1_SCHEMA>;

const ARG_2_SCHEMA = z.enum(['x', 'y', 'z']);
type PlayerMove = z.infer<typeof ARG_2_SCHEMA>;

type Result = z.infer<typeof ARG_2_SCHEMA>;

const MATCH_SCHEMA = z.tuple([ARG_1_SCHEMA, ARG_2_SCHEMA]);

const PLAYER_RULES = {
	x: {
		loses: 'b',
		score: 1,
		wins: 'c',
	},
	y: {
		loses: 'c',
		score: 2,
		wins: 'a',
	},
	z: {
		loses: 'a',
		score: 3,
		wins: 'b',
	},
} satisfies {
	[key in PlayerMove]: {
		score: 1 | 2 | 3;
		wins: VersusMove;
		loses: VersusMove;
	};
};

const VERSUS_RULES = {
	a: {
		draws: 'x',
		loses: 'y',
		wins: 'z',
	},
	b: {
		draws: 'y',
		loses: 'z',
		wins: 'x',
	},
	c: {
		draws: 'z',
		loses: 'x',
		wins: 'y',
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
	const { score, wins, loses } = PLAYER_RULES[playerMove];
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
	const { wins, loses, draws } = VERSUS_RULES[versusMove];
	switch (result) {
		case 'z':
			return PLAYER_RULES[loses].score + 6;
		case 'x':
			return PLAYER_RULES[wins].score + 0;
		default:
			return PLAYER_RULES[draws].score + 3;
	}
};

export type RockPaperScissorsSolution = {
	part1: number;
	part2: number;
}

export const rockPaperScissors =
	async (): Promise<RockPaperScissorsSolution> => {
		const input = await readFile(path.join(__dirname, 'input.txt'), 'utf-8');

		const score = input.split('\n').reduce(
			({ part1, part2 }, row) => {
				try {
					const [versus, playerOrResult] = MATCH_SCHEMA.parse(row.split(' '));
					return {
						part1: part1 + getPart1Score(versus, playerOrResult),
						part2: part2 + getPart2Score(versus, playerOrResult),
					};
				} catch {
					return { part1, part2 };
				}
			},
			{ part1: 0, part2: 0 }
		);

		return score;
	};
