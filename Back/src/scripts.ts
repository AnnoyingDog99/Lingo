import { LingoLetter } from "./types";

export function doesWordExist(word: string, words: string[]): boolean {
    return words.includes(word);
}

/**
 *
 * @param guessedWord word guessed by the player
 * @param toBeGuessWord word that the player neets to guess
 * @returns an array of LingoLetters
 * @example convertToLingoScore("word", "word") => [{value: "w", type: "correct"}, {value: "o", type: "correct"}, {value: "r", type: "correct"}, {value: "d", type: "correct"}]
 */
export function convertToLingoScore(
    guessedWord: string,
    toBeGuessWord: string
): LingoLetter[] {
    let result: LingoLetter[] = [];
    for (let i = 0; i < guessedWord.length; i++) {
        if (guessedWord[i] === toBeGuessWord[i]) {
            result.push({ value: guessedWord[i], type: "correct-place" });
        } else if (toBeGuessWord.includes(guessedWord[i])) {
            result.push({ value: guessedWord[i], type: "correct" });
        } else {
            result.push({ value: guessedWord[i], type: "wrong" });
        }
    }
    return result;
}

export function getRandomWord(words: string[]): string {
    return words[Math.floor(Math.random() * words.length)].trim();
}

export function generateLingoGrid(word: string): LingoLetter[][] {
    let grid: LingoLetter[][] = [];

    for (let i = 0; i < 5; i++) {
        let row: LingoLetter[] = [];

        for (let j = 0; j < 5; j++) {
            j === 0
                ? row.push({ value: word[j], type: "correct-place" })
                : row.push({ value: ".", type: "wrong" });
        }

        grid.push(row);
    }

    return grid;
}

export function updateLingoGrid(
    grid: LingoLetter[][],
    word: LingoLetter[],
    currentLine: number
): LingoLetter[][] {
    grid[currentLine] = word;
    return grid;
}

/**
 * Checks if a word is valid
 * @param word word that has to be guessed
 * @param words dictionary
 * @returns true when valid, false when invalid
 */
export function validateWord(word: string, words: string[]): boolean {
    //check if word is 5 letters long
    if (word.length !== 5) {
        return false;
    }
    //check if word contains only letters
    if (!word.match(/^[a-zA-Z]+$/)) {
        return false;
    }
    //check if word exists in the dictionary
    if (!doesWordExist(word, words)) {
        return false;
    }
    return true;
}
