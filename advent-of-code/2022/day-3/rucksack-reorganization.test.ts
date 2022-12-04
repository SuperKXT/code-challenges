import { rucksackReorganization } from './rucksack-reorganization';

const input = [
	'vJrwpWtwJgWrhcsFMMfFFhFp', /* cspell: disable-line */
	'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', /* cspell: disable-line */
	'PmmdzqPrVvPwwTWBwg', /* cspell: disable-line */
	'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', /* cspell: disable-line */
	'ttgJtRGJQctTZtZT', /* cspell: disable-line */
	'CrZsJsPPZsGzwwsLwLmpwMDw', /* cspell: disable-line */
].join('\n');

type Solution = Awaited<ReturnType<typeof rucksackReorganization>>;

describe('testing rucksackReorganization', () => {
	it('should return the correct solution for the example input', async () => {
		const response = await rucksackReorganization(input);
		const solution: Solution = {
			commonPriority: 157,
			badgePriority: 70,
		};
		expect(response).toStrictEqual(solution);
	});
	it('should return the correct solution for the input file', async () => {
		const response = await rucksackReorganization();
		const solution: Solution = {
			commonPriority: 8176,
			badgePriority: 2689,
		};
		expect(response).toStrictEqual(solution);
	});
});
