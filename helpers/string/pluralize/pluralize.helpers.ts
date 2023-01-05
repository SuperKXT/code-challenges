/**
 * Tagged template function to pluralize the designated words by checking the quantifiers
*/
export const pluralize = (
	strings: TemplateStringsArray,
	...inputExpressions: (
		number
		| string
		| [number]
		| [number, null | string]
	)[]
): string => {

	const expressions = inputExpressions.map((value) => {
		switch (typeof value) {
			case 'string':
				return value;
			case 'number':
				return [value, value.toString()] as const;
			default: {
				const [number, options] = value;
				const array = options?.split('|');
				const toShow = array?.[number - 1] ?? array?.at(-1) ?? '';
				return [
					value[0],
					toShow.replace(/\$1/g, number.toString()),
				] as const;
			}
		}
	});

	const result: string[] = [];
	const quantifiers = expressions.filter(Array.isArray) as [number, string][];
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
