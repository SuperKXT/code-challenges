import wordList from './word-list';

const findWord = (letters: string) => {

	for (const word of wordList) {

		const matched = word.split('').filter(char => letters.includes(char)).length;
		if (matched === 5) {
			console.log(word);
		}

	}

};

const matchPattern = (pattern: RegExp) => {

	for (const word of wordList) {

		const matched = word.match(pattern);
		if (matched) {
			console.log(matched.map(value => value));
		}

	}

};

/* cspell: disable-next-line */
// // findWord('wtyuopfghjkvmqzxvm');

/* cspell: disable-next-line */
matchPattern(/sto[stowyuipadfgjvbnm][stowyuipadfgjvbnm]/);
