import { LingoLetter } from "./types";

export function doesWordExist(word: string, words: string[]): boolean {
  return words.includes(word);
}

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
