import { useEffect, useState } from "react";
import BoardPlay from "../components/BoardPlay";
import { useCurrentBoardData } from "../BoardContext";

import {
  generateRandomString,
  insertKeyword,
  compareData,
  disableLetter,
} from "../utils";

import { letter } from "../types/board";

export default function Play() {
  const context = useCurrentBoardData();
  const [letters, setLetters] = useState<letter[][]>([]);
  const [collectLetters, setCollectLetters] = useState<number[][]>([]);
  const [level, setLevel] = useState(0);
  const [keywordLength, setKeywordLength] = useState(0);
  const [count, setCount] = useState(0);

  const { boardData } = context;

  useEffect(
    function () {
      const data = boardData[level];
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
          boardData[level].collection,
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
    count === boardData[level].numOfKeyword && level < boardData.length - 1;

  return (
    <div className="container">
      <BoardPlay letters={letters} onClickLetter={handleClickBox} />
      {isShowNext && <button onClick={handleNext}>Next</button>}
    </div>
  );
}
