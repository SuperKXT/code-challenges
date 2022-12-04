import { campCleanup } from './camp-cleanup';

const input = [
	'2-4,6-8',
	'2-3,4-5',
	'5-7,7-9',
	'2-8,3-7',
	'6-6,4-6',
	'2-6,4-8',
].join('\n');

// type Solution = Awaited<ReturnType<typeof rucksackReorganization>>;

describe('testing campCleanup', () => {
	it('should return 2 for the example input', async () => {
		const response = await campCleanup(input);
		expect(response).toStrictEqual(2);
	});
	it('should return 498 for the input file', async () => {
		const response = await campCleanup();
		expect(response).toStrictEqual(498);
	});
});
