export const aoc2024Day2 = (input: string) => {
	let safeCount = 0;
	for (const row of input.split('\n')) {
		const trimmed = row.trim();
		if (!trimmed) continue;
		const report = trimmed.split(' ');
		let isSafe = true;
		const isAsc = Number(report[1]) > Number(report[0]);
		for (let idx = 1; idx < report.length; idx++) {
			const curr = Number(report[idx]);
			const prev = Number(report[idx - 1]);
			const diff = Math.abs(curr - prev);
			if (
				(isAsc && curr < prev) ||
				(!isAsc && curr > prev) ||
				diff < 1 ||
				diff > 3
			) {
				isSafe = false;
			}
		}
		if (isSafe) {
			safeCount++;
		}
	}
	return { safeCount };
};
