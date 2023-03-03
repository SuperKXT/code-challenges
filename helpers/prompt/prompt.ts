import prompt from 'prompt';

prompt.start();
prompt.message = '';
prompt.delimiter = '';

export const confirmPrompt = async (message: string) => {
	const { question } = await prompt.get({
		description: `${message} [y/n]: `,
		type: 'string',
		pattern: /^[yn]$/iu,
		message: "Please enter 'y' for yes or 'n' for no",
		required: true,
	});
	return question === 'y' || question === 'Y';
};
