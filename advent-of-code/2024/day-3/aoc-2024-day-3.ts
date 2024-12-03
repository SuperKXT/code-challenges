const getProduct = (input: string) => {
	const matched = input.match(/\d+/gu);
	const a = Number(matched?.[0]);
	const b = Number(matched?.[1]);
	if (a && b) return a * b;
	return 0;
};
export const aoc2024Day3 = (input: string) => {
	let product = 0;
	const productRegex = /mul\((\d+),(\d+)\)/gu;
	const productMatch = input.match(productRegex) ?? [];
	for (const curr of productMatch) {
		product += getProduct(curr);
	}
	let adjustedProduct = 0;
	const adjustedProductRegex = /(mul\((\d+),(\d+)\))|(don't\(\))|(do\(\))/gu;
	const adjustProductMatch = input.match(adjustedProductRegex) ?? [];
	let disabled = false;
	for (const curr of adjustProductMatch) {
		if (curr === 'do()') disabled = false;
		else if (curr === "don't()") disabled = true;
		else if (!disabled) adjustedProduct += getProduct(curr);
	}
	return { product, adjustedProduct };
};
