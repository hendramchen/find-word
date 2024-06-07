import { useEffect, useReducer, useState, useRef } from "react";
import BoardPlay from "../components/BoardPlay";
import { generateRandomString, insertKeyword } from "../utils";
import { BoardData, letter } from "../types/board";
import { useCurrentBoardData } from "../BoardContext";

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
    case "reset":
      return initialState;
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export default function Admin() {
  const { boardData } = useCurrentBoardData();
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
    // const cloneBoardData = [...boardData];
    const payload = {
      ...state,
      id: boardData.length + 1,
      collection: dataInjected,
      numOfKeyword: dataInjected.length,
    };

    // cloneBoardData.push(payload);
    // setBoardData(cloneBoardData);

    // console.log(cloneBoardData);

    localStorage.setItem("boardData", JSON.stringify(payload));

    dispatch({ type: "set-collection", payload });
  }

  function handleReset() {
    dispatch({ type: "reset", payload: state });
    setShowBoard(false);
    setLetters([]);
    setDataInjected([]);
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          {!showBoard && (
            <div className="form-control">
              <label htmlFor="word">Keyword</label>
              <input type="text" ref={refWord} onChange={handleChange} />
            </div>
          )}

          <div className="form-control">
            <label htmlFor="direction">Direction</label>
            <select name="direction" onChange={handleChangeDirection}>
              {directionOpts.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          {!showBoard && (
            <div className="form-control">
              <label htmlFor="size">Size</label>
              <select name="size" onChange={handleChangeSize}>
                {sizeOpts.map((item) => (
                  <option key={item} value={item}>{`${item} x ${item}`}</option>
                ))}
              </select>
            </div>
          )}

          {!showBoard && (
            <button type="submit" disabled={state.keyword.length === 0}>
              Generate Board
            </button>
          )}
          {showBoard && (
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          )}
        </form>
      </div>
      {showBoard && (
        <div className="container-row">
          <BoardPlay letters={letters} onClickLetter={handleClickBox} />
          <button onClick={handleSaveBoard}>Save Board</button>
        </div>
      )}
    </>
  );
}
