type vowel = "a" | "e" | "i" | "o" | "u";

type reverse<T extends string> = T extends `${infer first}${infer rest}`
	? `${reverse<rest>}${first}`
	: "";

type FaultyVowels<
	T extends string,
	result extends string = "",
> = T extends `${infer first}${infer rest}`
	? first extends vowel
		? FaultyVowels<rest, reverse<result>>
		: FaultyVowels<rest, `${result}${first}`>
	: result;

export const faultyVowels = <const T extends string>(
	input: T,
): FaultyVowels<T> => {
	let result = "";
	for (const char of input) {
		if (["a", "e", "i", "o", "u"].includes(char))
			result = result.split("").reverse().join("");
		else result += char;
	}
	return result as never;
};
