import { readFile } from "node:fs/promises";

import { config } from "../../config.js";

export const NUMBER_PERIODS = [
	"",
	"thousand",
	"million",
	"billion",
	"trillion",
	"quadrillion",
	"quintillion",
	"sextillion",
] as const;

export const NUMBER_TENS = [
	"",
	"",
	"twenty",
	"thirty",
	"forty",
	"fifty",
	"sixty",
	"seventy",
	"eighty",
	"ninety",
] as const;

export const NUMBER_UNITS = [
	"",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
	"ten",
	"eleven",
	"twelve",
	"thirteen",
	"fourteen",
	"fifteen",
	"sixteen",
	"seventeen",
	"eighteen",
	"nineteen",
] as const;

export const numberToWords = (number: number): string => {
	if (number === 0) return "zero";
	const string = Math.abs(number).toString();

	const groups = Array.from(
		{ length: Math.ceil(string.length / 3) },
		(_, index) => {
			const start = (index + 1) * -3;
			const end = start + 3 || undefined;
			return string.slice(start, end);
		},
	).reverse();
	const groupPeriods = NUMBER_PERIODS.slice(0, groups.length).reverse();
	const groupWords = groups.map((group, index) => {
		const postFix = groupPeriods[index] as string;
		const hundredNum = Math.floor(Number(group) / 100);
		const tenNum = Number(group) % 100;
		const unitNum = tenNum % 10;
		const tensCount = Math.floor(tenNum / 10);
		const pieces: string[] = [NUMBER_UNITS[hundredNum] as string];
		if (pieces[0]) pieces.push("hundred");
		const unit = NUMBER_UNITS[tenNum];
		if (unit) {
			pieces.push(unit);
		} else {
			pieces.push(NUMBER_TENS[tensCount] as string);
			pieces.push(NUMBER_UNITS[unitNum] as string);
		}
		pieces.push(postFix);
		return pieces.filter(Boolean).join(" ");
	});
	return (number < 0 ? "minus " : "") + groupWords.filter(Boolean).join(", ");
};

export const getSourceLength = async (): Promise<string> => {
	const length = (await readFile(config.dirname, "utf-8")).length;
	return numberToWords(length);
};
