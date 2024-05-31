import styles from "./board.module.css";

import { letter } from "../../types/board";

interface BoardPlay {
  letters: letter[][];
  onClickLetter: (item: letter, rowIndex: number, colIndex: number) => void;
}

export default function BoardPlay({ letters, onClickLetter }: BoardPlay) {
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
                  onClick={() => onClickLetter(item, idx, index)}
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
