import { useEffect, useReducer, useState, useRef } from "react";
import BoardPlay from "../BoardPlay";
import { generateRandomString, insertKeyword } from "../../utils";
import { BoardData, letter } from "../../types/board";

const directionOpts = [
  "horizontal",
  "vertical",
  "diagonal-left",
  "diagonal-right",
];

const sizeOpts = [4, 5, 6, 7, 8, 9, 10, 15, 20];

interface BoardAdminAction {
  type: string;
  payload: BoardData;
}

const initialState: BoardData = {
  id: 0,
  keyword: [],
  numOfKeyword: 0,
  collection: [],
  direction: directionOpts[0],
  boxSize: sizeOpts[0],
};

function reducer(state: BoardData, action: BoardAdminAction) {
  switch (action.type) {
    case "set-keyword":
      return { ...state, keyword: action.payload.keyword };
    case "set-direction":
      return { ...state, direction: action.payload.direction };
    case "set-box-size":
      return { ...state, boxSize: action.payload.boxSize };
    case "set-collection":
      return {
        ...state,
        collection: action.payload.collection,
        numOfKeyword: action.payload.numOfKeyword,
      };
  }
  return state;
}

export default function BoardAdmin() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const refWord = useRef(null);
  const [letters, setLetters] = useState<letter[][]>([]);
  const [dataInjected, setDataInjected] = useState<number[][][]>([]);
  const [showBoard, setShowBoard] = useState(false);

  useEffect(() => {
    const initialLetters = insertKeyword(
      generateRandomString(state.boxSize, false),
      dataInjected,
      state.keyword
    );
    setLetters(initialLetters);
  }, [dataInjected, state.keyword, state.boxSize]);

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const word = e.currentTarget.value;

    dispatch({
      type: "set-keyword",
      payload: { ...state, keyword: [...word] },
    });
  }

  function handleClickBox(item: letter, rowIdx: number, colIdx: number) {
    let col = colIdx;
    let row = rowIdx;
    const dataIndex: number[][] = state.keyword.map(() => {
      const data = [row, col];
      if (state.direction === "horizontal") {
        col++;
      }
      if (state.direction === "vertical") {
        row++;
      }
      if (state.direction === "diagonal-left") {
        row++;
        col--;
      }
      if (state.direction === "diagonal-right") {
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
    const payload = { ...state, direction: e.currentTarget.value };
    dispatch({ type: "set-direction", payload });
  }

  function handleChangeSize(e: React.FormEvent<HTMLSelectElement>) {
    const payload = { ...state, boxSize: Number(e.currentTarget.value) };
    dispatch({ type: "set-box-size", payload });
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    setShowBoard(true);
  }

  function handleSaveBoard() {
    const payload = {
      ...state,
      collection: dataInjected,
      numOfKeyword: dataInjected.length,
    };
    console.log(payload);
    dispatch({ type: "set-collection", payload });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={refWord} onChange={handleChange} />
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
        <button type="submit">Generate Board</button>
      </form>

      {showBoard && (
        <div>
          <BoardPlay letters={letters} onClickLetter={handleClickBox} />
          <button onClick={handleSaveBoard}>Save Board</button>
        </div>
      )}
    </div>
  );
}
