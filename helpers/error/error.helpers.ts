/**
 * @description
 * This function is used to get the error message from the error object.
 *
 * - If the error is an instance of `Error`, it will return the error message.
 * - If the error is an `object`, it will return the stringified version of the object.
 * - If the error is a `string`, it will return the string.
 * - If the error is anything else, it will return the stringified version of the error.
 * @param error
 */
export const getCatchMessage = (error: unknown): string => {
	if (error instanceof Error) return error.message;
	if (typeof error === 'object') return JSON.stringify(error);
	return String(error);
};
