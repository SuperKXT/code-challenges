import { calculateExecutionTimes } from './calculate-execution-times.js';

test('testing calculateExecutionTimes against test 1', () => {
	const result = calculateExecutionTimes([
		{ name: 'main', time: 0, event: 'start' },
		{ name: 'subTask1', time: 5, event: 'start' },
		{ name: 'subTask1', time: 10, event: 'end' },
		{ name: 'subTask2', time: 15, event: 'start' },
		{ name: 'subTask2', time: 20, event: 'end' },
		{ name: 'main', time: 25, event: 'end' },
	]);
	const expected = {
		main: 25 as const,
		subTask1: 5 as const,
		subTask2: 5 as const,
	};
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
