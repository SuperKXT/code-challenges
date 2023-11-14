import { doWork } from './do-tasks.js';

test('testing doWork against test 1', () => {
	const tasks = [
		{ name: 'Task 1', duration: 4 },
		{ name: 'Task 2', duration: 2 },
		{ name: 'Task 3', duration: 7 },
		{ name: 'Task 4', duration: 5 },
		{ name: 'Task 5', duration: 1 },
		{ name: 'Task 6', duration: 3 },
	] as const;

	const result = doWork(tasks, 6);
	const expected = ['Task 2', 'Task 5', 'Task 6'] as const;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
