export const printAscii = (): string =>
	String.fromCharCode(...Array.from({ length: 95 }, (_, index) => 32 + index));
