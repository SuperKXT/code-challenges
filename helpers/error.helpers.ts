export const stringifyError = (error: unknown): string => {
	if (error instanceof Error) return error.message;
	if (typeof error === 'object') return JSON.stringify(error);
	// eslint-disable-next-line @typescript-eslint/no-base-to-string
	return String(error);
};
