const getProduct = (input: string) => {
	const matched = input.match(/\d+/gu);
	const a = Number(matched?.[0]);
	const b = Number(matched?.[1]);
	if (a && b) return a * b;
	return 0;
};
export const aoc2024Day3 = (input: string) => {
	let product = 0;
	let adjustedProduct = 0;
	const regex = /(mul\((\d+),(\d+)\))|(don't\(\))|(do\(\))/gu;
	const matches = input.match(regex) ?? [];
	let disabled = false;
	for (const curr of matches) {
		if (curr === "do()") disabled = false;
		else if (curr === "don't()") disabled = true;
		else {
			product += getProduct(curr);
			if (!disabled) adjustedProduct += getProduct(curr);
		}
	}
	return { product, adjustedProduct };
};
