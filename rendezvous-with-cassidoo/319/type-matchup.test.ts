import { typeMatchup } from './type-matchup.js';

test('testing buildStaircase against test 1', async () => {
	const result = await typeMatchup('fighting');
	const expected = {
		weakAgainst: ['flying', 'psychic', 'fairy'],
		strongAgainst: ['normal', 'rock', 'steel', 'ice', 'dark'],
	};
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing buildStaircase against test 2', () => {
	expect(async () => {
		return typeMatchup('cassidy');
	}).rejects.toThrow('Invalid Pokemon type: cassidy');
});
