/**
 * Tagged template function to pluralize the designated words by checking the quantifiers
 */
export const pluralize = (
	strings: TemplateStringsArray,
	...inputExpressions: (
		| number
		| string
		| [number]
		| [number, null | string]
		| [number, (arg: number) => null | string]
	)[]
): string => {
	const expressions = inputExpressions.map((value) => {
		if (typeof value === "string") return value;

		if (typeof value === "number") return [value, value.toString()] as const;

		const [number, options] = value;
		let toShow = "";
		if (typeof options === "function") {
			toShow = options(number) ?? "";
		} else if (typeof options === "string") {
			const array = options.split("|");
			toShow = (array[number - 1] ?? array.at(-1) ?? "").replace(
				/\$1/gu,
				number.toString(),
			);
		}
		return [value[0], toShow] as const;
	});

	const result: string[] = [];
	const quantifiers = expressions.filter(Array.isArray) as [number, string][];
	let lastQuantifier = quantifiers[0];

	const replaceQuantity = (input: string): string => {
		if (!lastQuantifier) return input;

		let replaced = input;
		const [number, value] = lastQuantifier;
		if (!value) replaced = input.replace(/^\s+/u, "");

		return replaced.replace(/\[(([^|]*\|?)+)\]/gu, (_, string: string) => {
			const matches = string.split("|");
			return matches[number - 1] ?? matches.at(-1) ?? "";
		});
	};

	for (const string of strings) {
		result.push(replaceQuantity(string));

		const lastExpression = expressions.shift();
		if (!lastExpression) break;

		result.push(
			typeof lastExpression === "string"
				? replaceQuantity(lastExpression)
				: lastExpression[1],
		);
		lastQuantifier = quantifiers.shift() ?? lastQuantifier;
	}

	return result.join("");
};
