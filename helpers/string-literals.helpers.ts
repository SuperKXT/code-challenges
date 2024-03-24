import type { Utils } from '../types/utils.types.js';

export const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
export type LowerAlphabet = Utils.stringToUnion<typeof lowerAlphabet>;

export const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export type UpperAlphabet = Utils.stringToUnion<typeof upperAlphabet>;

export const numeric = '0123456789';
export type Numeric = Utils.stringToUnion<typeof numeric>;

export const alphabet = `${lowerAlphabet}${upperAlphabet}`;
export type Alphabet = LowerAlphabet | UpperAlphabet;

export const wordSeparators = ` \n-_.${numeric}`;
export type WordSeparators = Utils.stringToUnion<typeof wordSeparators>;

export const alphaNumeric = `${alphabet}${numeric}`;
export type AlphaNumeric = Alphabet | Numeric;
