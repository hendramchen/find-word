import { letter } from "../../types/board";
import { BoardType } from "./types";
import { Box } from "./Box";
import styles from "./board.module.css";

export default function BoardPlay({ letters, onClickLetter }: BoardType) {
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
                  key={item.id}
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
