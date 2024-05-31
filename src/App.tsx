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
import { dataInjected } from "./data";
import { useEffect, useState } from "react";
import { letter } from "./types/board";

const keyword = ["C", "O", "D", "E", "X"];
const initialLetters = insertKeyword(
  generateRandomString(8),
  dataInjected,
  keyword
);

function App() {
  const [letters, setLetters] = useState([...initialLetters]);
  const [collectLetters, setCollectLetters] = useState<number[][]>([]);

  useEffect(
    function () {
      if (collectLetters.length === keyword.length) {
        const { isMatch, selectedLetters } = compareData(
          dataInjected,
          [...collectLetters],
          keyword.length
        );

        if (isMatch) {
          const updateLetters = disableLetter(selectedLetters, letters);
          setLetters(updateLetters);
        }
      }
    },
    [collectLetters]
  );

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
      <BoardAdmin />
    </>
  );
}

export default App;
