/** cSpell: disable */
import { scrabbleScore } from './scrabble-score.js';

test('should test scrabbleScore', () => {
	const response1 = scrabbleScore('FIZZBUZZ');
	expect(response1).toBe(49);
	assertType<49>(response1);

	const response2 = scrabbleScore('EDBFKJQ');
	expect(response2).toBe(33);
	assertType<33>(response2);
});
