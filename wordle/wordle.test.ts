import { findWordle, defaultArgs } from './wordle';

import type { WordleWord } from './word-list';
import type { Arguments } from './wordle';

interface Test {
	args: Partial<Arguments>;
	results: WordleWord[];
}

const testCases: Test[] = [
	{
		args: {
			pattern: 'q*e(ueq)(ueq)',
			known: 'qul',
		},
		results: ['quell'],
	},
	{
		args: {
			/* cspell: disable-next-line */
			known: 'crut',
		},
		/* cspell: disable */
		results: [
			'cruet',
			'eruct',
			'cruft',
			'curst',
			'crout',
			'recut',
			'truck',
			'cuter',
			'crust',
			'court',
			'curat',
			'truce',
			'curet',
		],
		/* cspell: enable */
	},
	{
		args: {
			/* cspell: disable-next-line */
			available: 'prudeaqwzxjhiu',
			pattern: 'p*u(pu)*',
		},
		results: ['prude'],
	},
	{
		args: {
			known: 'loc',
			/* cspell: disable-next-line */
			available: 'qwygjzxmloc',
			pattern: '(l)o(o)(co)*',
		},
		results: ['colly', 'coyly'],
	},
	{
		args: {
			known: 'loc',
			/* cspell: disable-next-line */
			available: 'qwygjzxmloc',
			pattern: '(l)o(o)(co)*',
			repeat: false,
		},
		results: [],
	},
	{
		args: {
			/* cspell: disable-next-line */
			available: 'qwtypafghjkzxvbm',
			repeat: false,
		},
		/* cspell: disable-next-line */
		results: ['bawty', 'thawy', 'pawky', 'mawky', 'gawky', 'vampy'],
	},
	{
		args: {
			/* cspell: disable-next-line */
			unavailable: 'asduiopkbn',
			known: 'ec',
			pattern: 'e(e)c*(ce)',
		},
		results: ['excel'],
	},
];

describe('find wordle word', () => {
	it.each(testCases)(
		'should find matched words by the given flags',
		({ args: args, results }) => {
			const response = findWordle({ ...defaultArgs, ...args });
			expect(response).toStrictEqual(results);
		}
	);
});
