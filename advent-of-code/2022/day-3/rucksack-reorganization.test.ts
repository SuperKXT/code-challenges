import { rucksackReorganization } from './rucksack-reorganization';

const INPUT = [
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
		const response = await rucksackReorganization(INPUT);
		const solution: Solution = {
			badgePriority: 70,
			commonPriority: 157,
		};
		expect(response).toStrictEqual(solution);
	});
	it('should return the correct solution for the input file', async () => {
		const response = await rucksackReorganization();
		const solution: Solution = {
			badgePriority: 2689,
			commonPriority: 8176,
		};
		expect(response).toStrictEqual(solution);
	});
});
