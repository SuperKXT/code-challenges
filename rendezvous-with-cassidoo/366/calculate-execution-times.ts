type Log = {
	name: string;
	time: number;
	event: 'start' | 'end';
};
export const calculateExecutionTimes = <const Logs extends [Log, ...Log[]]>(
	logs: Logs,
): never => {
	const times: Record<string, number> = {};
	for (const curr of logs) {
		if (curr.event === 'start') {
			times[curr.name] = curr.time;
		} else {
			times[curr.name] = curr.time - (times[curr.name] ?? 0);
		}
	}
	return times as never;
};
