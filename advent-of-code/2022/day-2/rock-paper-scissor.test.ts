import { rockPaperScissors } from './rock-paper-scissor';

test('testing rockPaperScissors', async () => {
	const response = await rockPaperScissors();
	expect(response).toStrictEqual({
		part1: 12772,
		part2: 11618,
	});
});
