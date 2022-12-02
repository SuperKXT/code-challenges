import { rockPaperScissors } from './rock-paper-scissor';

describe('testing rockPaperScissors', () => {
	it('should return rock paper scissor score for player', async () => {
		const response = await rockPaperScissors();
		expect(response).toStrictEqual({
			part1: 12772,
			part2: 11618,
		});
	});
});
