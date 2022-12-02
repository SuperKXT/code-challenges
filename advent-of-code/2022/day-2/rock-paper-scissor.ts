import { readFile } from 'fs/promises';
import path from 'path';

import { z } from 'zod';

const versusSchema = z.enum(['A', 'B', 'C']);
type VersusMove = z.infer<typeof versusSchema>;

const playerSchema = z.enum(['X', 'Y', 'Z']);
type PlayerMove = z.infer<typeof playerSchema>;

const matchSchema = z.tuple([versusSchema, playerSchema]);

const rules = {
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
			score: 1 | 2 | 3,
			wins: VersusMove,
			loses: VersusMove,
		}
	};

const getScore = (
	versusMove: VersusMove,
	playerMove: PlayerMove
): number => {
	const { score, wins, loses } = rules[playerMove];
	switch (versusMove) {
		case wins: return score + 6;
		case loses: return score + 0;
		default: return score + 3;
	}
};

export const rockPaperScissors = async (): Promise<number> => {

	const input = await readFile(
		path.join(__dirname, 'input.txt'),
		'utf-8'
	);

	const score = input.split('\n').reduce(
		(score, row) => {
			try {
				const [versus, player] = matchSchema.parse(row.split(' '));
				return score + getScore(versus, player);
			}
			catch (error) {
				return score;
			}
		}
		, 0
	);

	return score;

};
