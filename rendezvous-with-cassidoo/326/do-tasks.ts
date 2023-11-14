/* eslint-disable no-param-reassign */
type Task = { name: string; duration: number };

export const doWork = <
	const Tasks extends readonly Task[],
	Time extends number,
>(
	tasks: Tasks,
	time: Time,
): string[] => {
	const names: string[] = [];
	if (!tasks.length) return [];
	while (time > 0) {
		const current = tasks.reduce((min, curr) =>
			min.duration < curr.duration ? min : curr,
		);
		if (time < current.duration) break;
		time = (time - current.duration) as never;
		current.duration = Infinity;
		names[tasks.indexOf(current)] = current.name;
	}
	return names.filter(Boolean);
};
