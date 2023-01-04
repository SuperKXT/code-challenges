/**
 * Tagged template function to pluralize the designated words by checking the quantifiers
*/
export const pluralize = (
	strings: TemplateStringsArray,
	...inputExpressions: (
		number
		| string
		| [number]
		| [number, (input: number) => string | undefined | null]
	)[]
): string => {

	const expressions = inputExpressions.map((value) => {
		switch (typeof value) {
			case 'string':
				return value;
			case 'number':
				return [value, value.toString()] as const;
			default:
				return [value[0], value[1]?.(value[0]) ?? null] as const;
		}
	});

	const result = [];
	const quantifiers = expressions.filter(Array.isArray) as [number, null | string][];
	let lastQuantifier = quantifiers[0];

	for (let string of strings) {
		if (lastQuantifier) {
			const [number, value] = lastQuantifier;
			if (!value) {
				string = string.replace(/^\s+/, '');
			}
			result.push(string.replace(
				/\[(([^|]*\|?)+)\]/g,
				(_, string) => {
					const matches = string.split('|');
					return matches[number - 1] ?? matches.at(-1) ?? '';
				}
			));
		}
		else {
			result.push(string);
		}
		const lastExpression = expressions.shift();
		if (!lastExpression) break;
		result.push(
			typeof lastExpression === 'string'
				? lastExpression
				: lastExpression[1]
		);
		lastQuantifier = quantifiers.shift() ?? lastQuantifier;
	}

	return result.join('');
};
