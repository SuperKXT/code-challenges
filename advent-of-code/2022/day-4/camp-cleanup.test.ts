import { campCleanup } from './camp-cleanup';

const INPUT = [
	'2-4,6-8',
	'2-3,4-5',
	'5-7,7-9',
	'2-8,3-7',
	'6-6,4-6',
	'2-6,4-8',
].join('\n');

type Solution = Awaited<ReturnType<typeof campCleanup>>;

test('testing campCleanup against example input', async () => {
	const response = await campCleanup(INPUT);
	const solution: Solution = {
		fullOverlap: 2,
		overlap: 4,
	};
	expect(response).toStrictEqual(solution);
});
test('testing campCleanup against real input', async () => {
	const response = await campCleanup();
	const solution: Solution = {
		fullOverlap: 498,
		overlap: 859,
	};
	expect(response).toStrictEqual(solution);
});
