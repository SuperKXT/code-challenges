import { rucksackReorganization } from './rucksack-reorganization';

const input = [
	'vJrwpWtwJgWrhcsFMMfFFhFp', /* cspell: disable-line */
	'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', /* cspell: disable-line */
	'PmmdzqPrVvPwwTWBwg', /* cspell: disable-line */
	'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', /* cspell: disable-line */
	'ttgJtRGJQctTZtZT', /* cspell: disable-line */
	'CrZsJsPPZsGzwwsLwLmpwMDw', /* cspell: disable-line */
].join('\n');

describe('testing rucksackReorganization', () => {
	it('should return 157 for the example input', async () => {
		const response = await rucksackReorganization(input);
		expect(response).toStrictEqual(157);
	});
	it('should return 8176 for the input file', async () => {
		const response = await rucksackReorganization();
		expect(response).toStrictEqual(8176);
	});
});
