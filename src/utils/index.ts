import { letter } from "../types/board";

export function generateRandomString(
  length: number,
  isRandom: boolean = true
): letter[][] {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const result: letter[][] = [];

  for (let i = 0; i < length; i++) {
    const temp = [];
    for (let j = 0; j < length; j++) {
      const randomIndex = Math.floor(Math.random() * 25);
      temp[j] = {
        char: isRandom ? characters[randomIndex].toUpperCase() : "#",
        clicked: false,
        isActive: true,
      };
    }
    result[i] = temp;
  }
  return result;
}

export function insertKeyword(
  letters: letter[][],
  dataInjected: number[][][],
  keyword: string[]
): letter[][] {
  const tempLetters = [...letters];
  dataInjected.forEach((rows) => {
    rows.forEach((col, idx) => {
      tempLetters[col[0]][col[1]] = {
        ...tempLetters[col[0]][col[1]],
        char: keyword[idx],
      };
    });
  });
  return tempLetters;
}

export function compareData(
  listWord: number[][][],
  selectedLetters: number[][],
  keywordLength: number
) {
  let inc = 0;
  let keepRowIndex = -1;
  for (let i = 0; i < listWord.length; i++) {
    listWord[i].forEach((item, index) => {
      if (keepRowIndex === -1) {
        if (
          item[0] === selectedLetters[index][0] &&
          item[1] === selectedLetters[index][1]
        ) {
          keepRowIndex = i;
        }
      }
      if (
        item[0] === selectedLetters[index][0] &&
        item[1] === selectedLetters[index][1] &&
        i === keepRowIndex
      ) {
        inc++;
      }
    });
    if (inc === keywordLength) {
      break;
    }
  }

  if (inc === keywordLength) {
    return {
      isMatch: true,
      selectedLetters,
    };
  }
  return {
    isMatch: false,
    selectedLetters,
  };
}

export function disableLetter(
  selectedLetters: number[][],
  letters: letter[][]
) {
  const cloneLetters = [...letters];
  selectedLetters.forEach((rows) => {
    cloneLetters[rows[0]][rows[1]] = {
      ...cloneLetters[rows[0]][rows[1]],
      isActive: false,
    };
  });
  return cloneLetters;
}
