import { scoreWordGame } from './score-word-game.js';

test('testing scoreWordGame against test 1', () => {
	const wordList = ['apple', 'banana', 'cherry', 'date', 'fig'];

	const letterScores = [...Array(26).keys()].reduce<Record<string, number>>(
		(scores, i) => {
			scores[String.fromCharCode(97 + i)] = i + 1;
			return scores;
		},
		{},
	);
	const result = scoreWordGame(wordList, letterScores);
	const expected = 'cherry';
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
