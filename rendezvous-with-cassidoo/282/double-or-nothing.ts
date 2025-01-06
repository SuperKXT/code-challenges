import crypto from "node:crypto";

import chalk from "chalk";
import prompt from "prompt";

import { config } from "../../config.js";
import { stringifyError } from "../../helpers/error.helpers.js";
import { confirmPrompt } from "../../helpers/prompt.helpers.js";

const MAX_CHOICE = 5;
const PRIZE = 10;

const spin = async (
	score: number = PRIZE,
	multiplier: 1 | 2 = 1,
): Promise<number> => {
	const { question: choice } = await prompt.get({
		description: `\nYour pick? [0-${MAX_CHOICE}]: `,
		maximum: MAX_CHOICE,
		message: `Must be an integer between 0 and ${MAX_CHOICE}`,
		minimum: 0,
		required: true,
		type: "integer",
	});
	const spinResult = crypto.randomInt(0, MAX_CHOICE + 1);
	const correct = spinResult === Number(choice);
	if (correct) {
		const newScore = score * multiplier;
		console.info(chalk.green(`CORRECT! You have $${newScore}`));
		const isDouble = await confirmPrompt("Double or Nothing?");
		if (!isDouble) return newScore;

		return await spin(newScore, 2);
	}
	console.info(
		chalk.red("INCORRECT!"),
		chalk.blue(`Spin Result: ${spinResult}, Your Choice: ${String(choice)}`),
	);
	return 0;
};

export const doubleOrNothing = async (): Promise<number> => {
	console.info(chalk.bgRed("\nWelcome to Spin The Wheel!"));
	const score = await spin();
	console.info(chalk.red("\nGAME OVER! "), `You Won: $${score}\n`);
	const replay = await confirmPrompt("Go Again?");
	if (replay) return await doubleOrNothing();

	return score;
};

if (config.isTest)
	doubleOrNothing().catch((error: unknown) => {
		console.error(stringifyError(error));
	});
