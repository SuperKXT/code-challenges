import { WordleWord } from './word-list';
import { findWordle, Arguments } from './wordle';

interface Test {
	arguments: Arguments,
	results: WordleWord[],
}

const tests: Test[] = [
	{
		arguments: {
			pattern: 'q*e-(ueq)-(ueq)',
			known: 'qul',
		},
		results: ['quell'],
	},
	{
		arguments: {
			/* cspell: disable-next-line */
			known: 'crut',
		},
		/* cspell: disable-next-line */
		results: ['cruet', 'eruct', 'cruft', 'curst', 'crout', 'recut', 'truck', 'cuter', 'crust', 'court', 'curat', 'truce', 'curet'],
	},
	{
		arguments: {
			/* cspell: disable-next-line */
			available: 'prudeaqwzxjhiu',
			pattern: 'p*u-(pu)*',
		},
		results: ['prude'],
	},
	{
		arguments: {
			known: 'loc',
			/* cspell: disable-next-line */
			available: 'qwygjzxmloc',
			pattern: '-(l)o-(o)-(co)*',
		},
		results: ['colly', 'coyly'],
	},
];

describe('find wordle word', () => {

	for (const test of tests) {
		it(`should find ${test.results.length} results for test # ${tests.indexOf(test) + 1}`, () => {
			const results = findWordle(test.arguments);
			expect(results).toStrictEqual(test.results);
		});
	}

});