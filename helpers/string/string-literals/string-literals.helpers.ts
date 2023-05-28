export const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz' as const;
export type LowerAlphabet = StringToUnion<typeof lowerAlphabet>;

export const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' as const;
export type UpperAlphabet = StringToUnion<typeof upperAlphabet>;

export const numeric = '0123456789' as const;
export type Numeric = StringToUnion<typeof numeric>;

export const alphabet = `${lowerAlphabet}${upperAlphabet}` as const;
export type Alphabet = LowerAlphabet | UpperAlphabet;

export const wordSeparators = ` \n-_.${numeric}` as const;
export type WordSeparators = StringToUnion<typeof wordSeparators>;

export const alphaNumeric = `${alphabet}${numeric}` as const;
export type AlphaNumeric = Alphabet | Numeric;
