export const fromTo = (from: number, to: number) => {
	let curr = from;
	return () => (curr < to ? curr++ : null);
};
