// import { useState } from 'react';
import "./App.css";
import BoardAdmin from "./components/BoardAdmin";
import BoardPlay from "./components/BoardPlay";

import {
  generateRandomString,
  insertKeyword,
  compareData,
  disableLetter,
} from "./utils";
import { boarddata } from "./data";
import { useEffect, useState } from "react";
import { letter } from "./types/board";

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
        data.keywords
      );

      setLetters(generateLetters);
      setKeywordLength(data.keywords.length);
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

  function handleClickBox(item: letter, rowIdx: number, colIdx: number) {
    if (!item.isActive) {
      return;
    }
    const cloneLetters = [...letters];
    const updateLetters = cloneLetters.map((rows, rowIndex) => {
      return rows.map((col, colIndex) => {
        return rowIndex === rowIdx && colIndex === colIdx
          ? { ...col, clicked: !col.clicked }
          : col;
      });
    });

    setLetters(updateLetters);

    const collect: number[][] = [];

    updateLetters.forEach((rows, rowIndex) => {
      rows.forEach((col, colIndex) => {
        if (col.clicked && col.isActive) {
          collect.push([rowIndex, colIndex]);
        }
      });
    });
    setCollectLetters(collect);
  }

  return (
    <>
      <BoardPlay letters={letters} onClickLetter={handleClickBox} />
      {count === boarddata[level].numberOfkeyword && (
        <button onClick={handleNext}>Next</button>
      )}

      <BoardAdmin />
    </>
  );
}

export default App;
