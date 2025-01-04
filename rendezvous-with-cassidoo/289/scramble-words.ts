const scramble = (word: string) => {
	return word
		.split("")
		.sort(() => Math.random() - 0.5)
		.join("");
};

export const scrambleWords = (string: string): string => {
	return string
		.split(" ")
		.map((word) => {
			const hasPeriod = word.endsWith(".");
			const trimmed = hasPeriod ? word.slice(0, word.length - 1) : word;
			if (trimmed.length < 4) return word;

			const first = trimmed.at(0) as string;
			const last = trimmed.at(-1) as string;
			const inner = word.slice(1, word.length - 1);
			let scrambled = scramble(inner);
			while (scrambled === inner) scrambled = scramble(inner);

			return [first, ...scrambled, last, hasPeriod ? "." : ""].join("");
		})
		.join(" ");
};
