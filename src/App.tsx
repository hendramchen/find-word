import { useEffect, useState } from "react";
import BoardPlay from "./components/BoardPlay";

import {
  generateRandomString,
  insertKeyword,
  compareData,
  disableLetter,
} from "./utils";
import { boarddata } from "./data";
import { letter } from "./types/board";
import "./App.css";

function App() {
  const [letters, setLetters] = useState<letter[][]>([]);
  const [collectLetters, setCollectLetters] = useState<number[][]>([]);
  const [level, setLevel] = useState(0);
  const [keywordLength, setKeywordLength] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(
    function () {
      const data = boarddata[level];
      const randomString = generateRandomString(data.boxSize);
      const generateLetters = insertKeyword(
        randomString,
        data.collection,
        data.keyword
      );

      setLetters(generateLetters);
      setKeywordLength(data.keyword.length);
    },
    [level]
  );

  useEffect(
    function () {
      if (
        collectLetters.length > 0 &&
        collectLetters.length === keywordLength
      ) {
        const { isMatch, selectedLetters } = compareData(
          boarddata[level].collection,
          [...collectLetters],
          keywordLength
        );

        if (isMatch) {
          const updateLetters = disableLetter(selectedLetters, letters);
          setLetters(updateLetters);
          setCount((prev) => prev + 1);
        }
      }
    },
    [collectLetters]
  );

  function handleNext() {
    setLevel((prev) => prev + 1);
    setCount(0);
  }

  function updateClickLetter(rowIdx: number, colIdx: number) {
    const cloneLetters = [...letters];
    const updateLetters = cloneLetters.map((rows, rowIndex) => {
      return rows.map((col, colIndex) => {
        return rowIndex === rowIdx && colIndex === colIdx
          ? { ...col, clicked: !col.clicked }
          : col;
      });
    });

    setLetters(updateLetters);

    return updateLetters;
  }

  function updateCollectLetters(letterUpdated: letter[][]) {
    const collect: number[][] = [];

    letterUpdated.forEach((rows, rowIndex) => {
      rows.forEach((col, colIndex) => {
        if (col.clicked && col.isActive) {
          collect.push([rowIndex, colIndex]);
        }
      });
    });

    setCollectLetters(collect);
  }

  function handleClickBox(item: letter, rowIdx: number, colIdx: number) {
    if (!item.isActive) {
      return;
    }

    const letterUpdated = updateClickLetter(rowIdx, colIdx);

    updateCollectLetters(letterUpdated);
  }

  const isShowNext =
    count === boarddata[level].numOfKeyword && level < boarddata.length - 1;

  return (
    <>
      <BoardPlay letters={letters} onClickLetter={handleClickBox} />
      {isShowNext && <button onClick={handleNext}>Next</button>}
    </>
  );
}

export default App;
