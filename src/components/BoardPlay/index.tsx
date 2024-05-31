import { useEffect, useState } from "react";
import styles from "./board.module.css";

interface letter {
  char: string;
  clicked: boolean;
  isActive: boolean;
}

const dataInjected = [
  [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
  ],
  [
    [2, 1],
    [3, 2],
    [4, 3],
    [5, 4],
    [6, 5],
  ],
  [
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
    [5, 5],
  ],
];

// const keyArr = ["I", "D", "E", "A"];
const keyArr = ["C", "O", "D", "E", "X"];

function generateRandomString(length: number): letter[][] {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const result: letter[][] = [];

  for (let i = 0; i < length; i++) {
    const temp = [];
    for (let j = 0; j < length; j++) {
      const randomIndex = Math.floor(Math.random() * 25);
      temp[j] = {
        char: characters[randomIndex].toUpperCase(),
        clicked: false,
        isActive: true,
      };
    }
    result[i] = temp;
  }
  return result;
}

function insertKeyword(letters: letter[][]): letter[][] {
  const tempLetters = [...letters];
  dataInjected.forEach((rows) => {
    rows.forEach((col, idx) => {
      tempLetters[col[0]][col[1]] = {
        ...tempLetters[col[0]][col[1]],
        char: keyArr[idx],
      };
    });
  });
  return tempLetters;
}

const initialLetters = insertKeyword(generateRandomString(10));

export default function BoardPlay() {
  const [letters, setLetters] = useState<letter[][]>([...initialLetters]);
  const [collectLetters, setCollectLetters] = useState<number[][]>([]);

  useEffect(
    function () {
      if (collectLetters.length === keyArr.length) {
        compareData();
      }
    },
    [collectLetters]
  );

  function compareData() {
    let inc = 0;
    for (let i = 0; i < dataInjected.length; i++) {
      dataInjected[i].forEach((item, index) => {
        if (
          item[0] === collectLetters[index][0] &&
          item[1] === collectLetters[index][1]
        ) {
          inc++;
        }
      });
      if (inc === keyArr.length) {
        break;
      }
    }

    if (inc === keyArr.length) {
      const cloneLetters = [...letters];
      collectLetters.forEach((rows) => {
        cloneLetters[rows[0]][rows[1]] = {
          ...cloneLetters[rows[0]][rows[1]],
          isActive: false,
        };
      });
      setLetters(cloneLetters);
    }
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
    <div className={styles["board-play"]}>
      {letters.map((rows, idx) => {
        return (
          <div className={styles.boxes} key={idx}>
            {rows.map((item, index) => {
              let style = item.clicked
                ? styles.box + " " + styles.clicked
                : styles.box;
              if (!item.isActive) {
                style = styles.box + " " + styles.inactive;
              }
              return (
                <div
                  className={style}
                  key={index}
                  onClick={() => handleClickBox(item, idx, index)}
                >
                  {item.char}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
