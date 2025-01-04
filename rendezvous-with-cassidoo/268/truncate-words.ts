export const truncateWords = (string: string, length: number): string =>
	string.replace(new RegExp(`(?<=[a-z]{${length}})[a-z]*`, "giu"), "");
