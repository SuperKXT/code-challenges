import { tryMontyHall } from "./monty-hall.js";

test("testing tryMontyHall", () => {
	const iterations = 10_000;
	const result = {
		100: tryMontyHall({ iterations, doors: 100 }),
		3: tryMontyHall({ iterations, doors: 3 }),
	};
	const percentages = {
		100: {
			stay: (result[100].stay / iterations) * 100,
			change: (result[100].change / iterations) * 100,
		},
		3: {
			stay: (result[3].stay / iterations) * 100,
			change: (result[3].change / iterations) * 100,
		},
	};
	expect(Math.round(percentages[100].stay)).toBe(1);
	expect(Math.round(percentages[100].change)).toBe(99);
	expect([33, 34]).toContain(Math.round(percentages[3].stay));
	expect([66, 67]).toContain(Math.round(percentages[3].change));
});
