import { useState } from "react";
import BoardPlay from "../BoardPlay";
import { generateRandomString } from "../../utils";
import { letter } from "../../types/board";

export default function BoardAdmin() {
  const [word, setWord] = useState("");
  const [letters, setLetters] = useState([...generateRandomString(5, false)]);

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    setWord(e.currentTarget.value);
  }

  function handleClickBox(item: letter, rowIdx: number, colIdx: number) {}
  return (
    <div style={{ backgroundColor: "#000" }}>
      <input type="text" value={word} onChange={handleChange} />
      <div>
        <BoardPlay letters={letters} onClickLetter={handleClickBox} />
      </div>
    </div>
  );
}
