import prompt from "prompt";

prompt.start();
prompt.message = "";
prompt.delimiter = "";

export const confirmPrompt = async (message: string) => {
	const { question } = await prompt.get({
		description: `${message} [y/n]: `,
		message: "Please enter 'y' for yes or 'n' for no",
		pattern: /^[yn]$/iu,
		required: true,
		type: "string",
	});
	return question === "y" || question === "Y";
};
