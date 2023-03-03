import { rucksackReorganization } from './rucksack-reorganization';

const input = [
	/** cSpell: disable */
	'vJrwpWtwJgWrhcsFMMfFFhFp',
	'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
	'PmmdzqPrVvPwwTWBwg',
	'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
	'ttgJtRGJQctTZtZT',
	'CrZsJsPPZsGzwwsLwLmpwMDw',
	/** cSpell: enable */
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
