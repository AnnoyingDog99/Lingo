export interface LingoLetter {
    /** a single letter of a word */
    value: string;
    /** determines if a letter is correct, correct but in the wrong place or just wrong */
    type: "correct" | "correct-place" | "wrong";
  }