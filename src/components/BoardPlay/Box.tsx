import { BoxType } from "./types";

export function Box({ item, indexes, style, onClick }: BoxType) {
  const { rowIndex, colIndex } = indexes;
  return (
    <div className={style} onClick={() => onClick(item, rowIndex, colIndex)}>
      {item.char}
    </div>
  );
}
