/**
 * Returns a promise that resolves with void after the given time
 * @param ms the time to wait, in `milliseconds`
 */
export const wait = async (ms: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
};

/**
 * Wrap a value in a promise.
 * @param val the value to wrap in a promise
 */
export const promisify = async <const T>(val: T) => {
	return new Promise<T>((resolve) => {
		resolve(val);
	});
};
