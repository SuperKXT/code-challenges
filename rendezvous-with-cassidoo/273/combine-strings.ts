export const INVALID_ERROR = new Error(
	"the given size must be greater than all array members",
);

export const combineStrings = (array: string[], size: number): string[] => {
	if (array.some((string) => string.length > size)) throw INVALID_ERROR;

	const combined: string[] = [];
	let current = "";
	for (let index = 0; index < array.length; index++) {
		const item = array[index] as string;
		const next = array[index + 1];
		current += `${current ? " " : ""}${item}`;
		if (!next || current.length + next.length + 1 > size) {
			combined.push(current);
			current = "";
		}
	}
	return combined;
};
