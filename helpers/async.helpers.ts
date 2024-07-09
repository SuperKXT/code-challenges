/**
 * Returns a promise that resolves with void after the given time
 * @param ms the time to wait, in `milliseconds`
 */
export const wait = async (ms: number): Promise<void> => {
	await new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve(undefined);
		}, ms);
	});
};

/**
 * Wrap a value in a promise.
 * @param val the value to wrap in a promise
 */
export const promisify = async <const T>(val: T): Promise<T> => {
	return await new Promise<T>((resolve) => {
		resolve(val);
	});
};
