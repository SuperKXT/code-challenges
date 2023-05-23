import { scrabbleScore } from './scrabble-score';

test('should test scrabbleScore', () => {
	const response = scrabbleScore('FIZZBUZZ');
	expect(response).toBe(49);
});
