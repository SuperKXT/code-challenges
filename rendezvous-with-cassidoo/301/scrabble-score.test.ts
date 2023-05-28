import { scrabbleScore } from './scrabble-score';

test('should test scrabbleScore', () => {
	const response1 = scrabbleScore('FIZZBUZZ');
	expect(response1).toBe(49);

	const response2 = scrabbleScore('EDBFKJQ');
	expect(response2).toBe(33);
});
