import styles from "./board.module.css";

import { letter } from "../../types/board";

interface BoardPlay {
  letters: letter[][];
  onClickLetter: (item: letter, rowIndex: number, colIndex: number) => void;
}

export default function BoardPlay({ letters, onClickLetter }: BoardPlay) {
  function getStyleBox(item: letter) {
    let style = item.clicked ? styles.box + " " + styles.clicked : styles.box;
    if (!item.isActive) {
      style = styles.box + " " + styles.inactive;
    }
    return style;
  }

  return (
    <div className={styles["board-play"]}>
      {letters.map((rows, rowIndex) => {
        return (
          <div className={styles.boxes} key={rowIndex}>
            {rows.map((item, colIndex) => {
              const style = getStyleBox(item);

              return (
                <Box
                  key={colIndex}
                  item={item}
                  indexes={{ rowIndex, colIndex }}
                  style={style}
                  onClick={onClickLetter}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
interface Box {
  item: letter;
  indexes: {
    rowIndex: number;
    colIndex: number;
  };
  style: string;
  onClick: (item: letter, rowIndex: number, colIndex: number) => void;
}

function Box({ item, indexes, style, onClick }: Box) {
  const { rowIndex, colIndex } = indexes;
  return (
    <div className={style} onClick={() => onClick(item, rowIndex, colIndex)}>
      {item.char}
    </div>
  );
}
