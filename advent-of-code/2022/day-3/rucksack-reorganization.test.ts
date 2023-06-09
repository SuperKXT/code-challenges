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

test('testing rucksackReorganization against example input', async () => {
	const response = await rucksackReorganization(INPUT);
	const solution: Solution = {
		badgePriority: 70,
		commonPriority: 157,
	};
	expect(response).toStrictEqual(solution);
});

test('testing rucksackReorganization against actual input', async () => {
	const response = await rucksackReorganization();
	const solution: Solution = {
		badgePriority: 2689,
		commonPriority: 8176,
	};
	expect(response).toStrictEqual(solution);
});
