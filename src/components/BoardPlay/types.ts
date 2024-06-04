import { letter } from "../../types/board";

export interface BoardType {
  letters: letter[][];
  onClickLetter: (item: letter, rowIndex: number, colIndex: number) => void;
}

export interface BoxType {
  item: letter;
  indexes: {
    rowIndex: number;
    colIndex: number;
  };
  style: string;
  onClick: (item: letter, rowIndex: number, colIndex: number) => void;
}
