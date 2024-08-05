type Squares<Num extends number> = never;

export const squares = <const Num extends number>(num: Num): Squares<Num> => {
	let res = 0;
	for (let i = 1; i <= num; i++) {
		res += i ** 2;
	}
	return res as never;
};
