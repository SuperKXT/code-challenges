import crypto from 'crypto';

import chalk from 'chalk';
import prompt from 'prompt';

import { confirmPrompt } from '../../helpers/prompt';

const MAX_CHOICE = 5;
const PRIZE = 10;

const spin = async (
	score: number = PRIZE,
	multiplier: 1 | 2 = 1
): Promise<number> => {
	const { question: choice } = await prompt.get({
		description: `\nYour pick? [0-${MAX_CHOICE}]: `,
		type: 'integer',
		minimum: 0,
		maximum: MAX_CHOICE,
		message: `Must be an integer between 0 and ${MAX_CHOICE}`,
		required: true,
	});
	const spinResult = crypto.randomInt(0, MAX_CHOICE + 1);
	const correct = spinResult === Number(choice);
	if (correct) {
		score *= multiplier;
		console.info(chalk.green(`CORRECT! You have $${score}`));
		const isDouble = await confirmPrompt('Double or Nothing?');
		if (!isDouble) return score;
		return spin(score, 2);
	} else {
		console.info(
			chalk.red('INCORRECT!'),
			chalk.blue(`Spin Result: ${spinResult}, Your Choice: ${choice}`)
		);
		return 0;
	}
};

export const doubleOrNothing = async (): Promise<number> => {
	console.info(chalk.bgRed('\nWelcome to Spin The Wheel!'));
	while (true) {
		const score = await spin();
		console.info(chalk.red('\nGAME OVER! '), `You Won: $${score}\n`);
		const replay = await confirmPrompt('Go Again?');
		if (!replay) return score;
	}
};

if (process.env.NODE_ENV !== 'test') {
	doubleOrNothing();
}
