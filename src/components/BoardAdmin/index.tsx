import { useEffect, useState } from "react";
import BoardPlay from "../BoardPlay";
import { generateRandomString, insertKeyword } from "../../utils";
import { letter } from "../../types/board";

const directionOpts = [
  "horizontal",
  "vertical",
  "diagonal-left",
  "diagonal-right",
];

const sizeOpts = [4, 5, 6, 7, 8, 9, 10, 15, 20];

export default function BoardAdmin() {
  const [word, setWord] = useState("");
  const [letters, setLetters] = useState<letter[][]>([]);
  const [keyword, setKeyword] = useState<string[]>([]);
  const [dataInjected, setDataInjected] = useState<number[][][]>([]);
  const [direction, setDirection] = useState("horizontal");
  const [size, setSize] = useState(4);

  useEffect(() => {
    const initialLetters = insertKeyword(
      generateRandomString(size, false),
      dataInjected,
      keyword
    );
    setLetters(initialLetters);
  }, [dataInjected, keyword, size]);

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    setWord(e.currentTarget.value);
  }

  function handleClickBox(item: letter, rowIdx: number, colIdx: number) {
    let col = colIdx;
    let row = rowIdx;
    const dataIndex: number[][] = keyword.map((_) => {
      const data = [row, col];
      if (direction === "horizontal") {
        col++;
      }
      if (direction === "vertical") {
        row++;
      }
      if (direction === "diagonal-left") {
        row++;
        col--;
      }
      if (direction === "diagonal-right") {
        row++;
        col++;
      }
      return data;
    });
    const cloneInjected = [...dataInjected];
    cloneInjected.push(dataIndex);
    setDataInjected(cloneInjected);
  }

  function handleChangeDirection(e: React.FormEvent<HTMLSelectElement>) {
    setDirection(e.currentTarget.value);
  }

  function handleChangeSize(e: React.FormEvent<HTMLSelectElement>) {
    setSize(Number(e.currentTarget.value));
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setKeyword([...word]);
    console.log({
      word,
      keyword,
      direction,
    });
  }

  return (
    <div style={{ backgroundColor: "#000" }}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={word} onChange={handleChange} />
        <select name="direction" onChange={handleChangeDirection}>
          {directionOpts.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select name="size" onChange={handleChangeSize}>
          {sizeOpts.map((item) => (
            <option key={item} value={item}>{`${item} x ${item}`}</option>
          ))}
        </select>

        {keyword.length > 0 && (
          <div>
            <BoardPlay letters={letters} onClickLetter={handleClickBox} />
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
