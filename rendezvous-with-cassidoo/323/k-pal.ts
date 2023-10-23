export type KPal<T extends string> = boolean;

export const kPal = <T extends string>(string: T): KPal<T> => {
	return true as never;
};
