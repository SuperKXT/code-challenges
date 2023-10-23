export type KPal<T extends string> = boolean;

export const isPalindrome = (string: string): boolean => {
	return string === string.split('').reverse().join('');
};

export const kPal = <Str extends string, CanRemove extends number>(str: Str, canRemove: CanRemove): KPal<Str> => {
	while (str.length > 1) {
		const first = str.at(0) as string;
		const last = str.at(-1) as string;
		if (first === last) {
			str = str.substring(1, str.length - 1) as Str;
			continue;
		}
		else if (!canRemove) return false as never;
		canRemove--;
		str = str.substring(1) as Str;
	}
	return true as never;
};
