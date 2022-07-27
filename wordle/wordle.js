"use strict";
exports.__esModule = true;
var word_list_1 = require("./word-list");
var findWord = function (letters) {
    for (var _i = 0, wordList_1 = word_list_1["default"]; _i < wordList_1.length; _i++) {
        var word = wordList_1[_i];
        var matched = word.split('').filter(function (char) { return letters.includes(char); }).length;
        if (matched === 5) {
            console.log(word);
        }
    }
};
var matchPattern = function (pattern) {
    for (var _i = 0, wordList_2 = word_list_1["default"]; _i < wordList_2.length; _i++) {
        var word = wordList_2[_i];
        var matched = word.match(pattern);
        if (matched) {
            console.log(matched.map(function (value) { return value; }));
        }
    }
};
/* cspell: disable-next-line */
// // findWord('wtyuopfghjkvmqzxvm');
/* cspell: disable-next-line */
matchPattern(/el[qzxomwtypfgjv][qzxomwtypfgjv]n/);
