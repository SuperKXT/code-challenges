import crypto from "node:crypto";

import { config } from "../../config.js";

const getRandomDoor = (doors: number) => {
	return (crypto.randomBytes(1).toString("ascii").charCodeAt(0) % doors) + 1;
};

export const tryMontyHall = (args: { iterations: number; doors: number }) => {
	let stay = 0;
	let change = 0;

	for (let i = 0; i < args.iterations; i++) {
		const correctPosition = getRandomDoor(args.doors);
		const firstPosition = getRandomDoor(args.doors);
		let secondChoice = 0;
		for (let pos = 1; pos <= args.doors; pos++) {
			const removed = pos !== correctPosition && pos !== firstPosition;
			if (!removed && pos !== firstPosition) secondChoice = pos;
		}

		stay += firstPosition === correctPosition ? 1 : 0;
		change += secondChoice === correctPosition ? 1 : 0;
	}
	return { stay, change };
};

if (!config.isTest) {
	console.time("Time");
	const iterations = 100_000;
	const doors = 100;

	const { stay, change } = tryMontyHall({ iterations, doors });
	console.info(
		`Doors: ${doors}`,
		`\nIterations: ${iterations}`,
		`\nStay: ${stay}, ${((stay / iterations) * 100).toFixed(3)}%`,
		`\nChange: ${change}, ${((change / iterations) * 100).toFixed(3)}%`,
	);
	console.timeEnd("Time");
}
