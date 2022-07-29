import wordList from './word-list';

const matchStrings = (
	string1: string,
	string2: string,
	matchAtLeast: number = 5,
	noRepeat?: boolean,
): boolean => {
	let array1 = string1.split('');
	if (noRepeat) array1 = Array.from(new Set(array1));
	const matched = array1.filter(char =>
		string2.includes(char)
	).length;
	return matched === matchAtLeast;
};

const findWordsByLetters = (
	letters: string,
	matchAtLeast: number = 5,
	noRepeat?: boolean,
): string[] => {

	const matches = wordList.filter(word =>
		matchStrings(
			word,
			letters,
			matchAtLeast,
			noRepeat
		)
	);
	console.log(`Found (\x1b[32m${matches.length}\x1b[0m) Matches`);
	console.log(`\x1b[32m${matches.join(', ')}\x1b[0m`);
	return matches;
};

const matchPattern = (
	pattern: RegExp,
	knownLetters?: string
): string[] => {

	const matches = wordList.filter(word =>
		word.match(pattern)
		&& (
			!knownLetters
			|| matchStrings(
				word,
				knownLetters,
				knownLetters.length,
				true
			)
		)
	);

	console.log(`Found (\x1b[32m${matches.length}\x1b[0m) Matches`);
	console.log(`\x1b[32m${matches.join(', ')}\x1b[0m`);
	return matches;

};

/* cspell: disable-next-line */
//findWordByLetters('stue');

/* cspell: disable-next-line */
matchPattern(/re[rlwpfgjkbqzx][rewpfgjkbqzx][lwpfgjkbqzx]/, 'rel');
