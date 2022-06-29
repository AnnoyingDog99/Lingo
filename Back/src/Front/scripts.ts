export function isValid(value: string, words: string[]): boolean {
    if(value.trim().length === 0) {
        return false;
    }
    if (value.length !== 5) {
        return false;
    }
    if (!words.includes(value)) {
        return false;
    }
    //check if word contains only letters
    if (!value.match(/^[a-zA-Z]+$/)) {
        return false;
    }
    return true;
}
