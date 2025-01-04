export const evasiveDigits = (): number[] => {
	return Array.from({ length: "e".charCodeAt(0) }, (_, index) => index);
};
