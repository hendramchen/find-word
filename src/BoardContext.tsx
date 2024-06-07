import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { boarddata } from "./data";
import { BoardData } from "./types/board";

interface BoardContextType {
  boardData: BoardData[];
  setBoardData: (value: BoardData[]) => void;
}
const BoardContext = createContext<BoardContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

function BoardProvider({ children }: Props) {
  const [boardData, setBoardData] = useState<BoardData[]>([...boarddata]);

  useEffect(
    function () {
      const data = localStorage.getItem("boardData");

      if (data) {
        const payload = JSON.parse(data);
        const cloneBoardData = [...boardData];
        cloneBoardData.push(payload);
        setBoardData(cloneBoardData);
        localStorage.setItem("boardData", "");
      }
    },
    [boardData]
  );

  return (
    <BoardContext.Provider value={{ boardData, setBoardData }}>
      {children}
    </BoardContext.Provider>
  );
}

function useCurrentBoardData() {
  const currentContext = useContext(BoardContext);

  if (!currentContext) {
    throw new Error(
      "useCurrentBoardData has to be used within <BoardContext.Provider>"
    );
  }

  return currentContext;
}

export { BoardContext, BoardProvider, useCurrentBoardData };
