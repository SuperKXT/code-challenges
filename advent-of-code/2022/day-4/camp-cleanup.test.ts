import { campCleanup } from './camp-cleanup';

const input = [
	'2-4,6-8',
	'2-3,4-5',
	'5-7,7-9',
	'2-8,3-7',
	'6-6,4-6',
	'2-6,4-8',
].join('\n');

type Solution = Awaited<ReturnType<typeof campCleanup>>;

describe('testing campCleanup', () => {
	it('should return the correct solution for the example input', async () => {
		const response = await campCleanup(input);
		const solution: Solution = {
			fullOverlap: 2,
			overlap: 4,
		};
		expect(response).toStrictEqual(solution);
	});
	it('should return the correct solution for the input file', async () => {
		const response = await campCleanup();
		const solution: Solution = {
			fullOverlap: 498,
			overlap: 859,
		};
		expect(response).toStrictEqual(solution);
	});
});
