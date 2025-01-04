import { rockPaperScissors } from "./rock-paper-scissor.js";

test("testing rockPaperScissors", async () => {
	const response = await rockPaperScissors();
	expect(response).toStrictEqual({
		part1: 12772,
		part2: 11618,
	});
});
