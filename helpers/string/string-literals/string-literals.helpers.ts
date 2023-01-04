export const lowerCase = 'abcdefghijklmnopqrstuvwxyz' as const;

export const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' as const;

export const numbers = '0123456789' as const;

export const alphabet = `${lowerCase}${upperCase}` as const;

export const wordSeparators = ` \n-_${numbers}` as const;

export const alphaNumeric = `${alphabet}${numbers}` as const;
