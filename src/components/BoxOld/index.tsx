import { useEffect, useState } from "react";
import styles from "./boxes.module.css";

interface letter {
  char: string;
  clicked: boolean;
  isActive: boolean;
}

function generateRandomString(length: number): letter[] {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const result: letter[] = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result[i] = {
      char: characters[randomIndex].toUpperCase(),
      clicked: false,
      isActive: true,
    };
  }
  return result;
}

function injectWord(characters: letter[], indexes: number[]) {
  const startIndex = indexes;
  const word = ["I", "D", "E", "A"];
  let inc = 0;
  const newUpdate = characters.map((item, index) => {
    if (index === startIndex[inc]) {
      const newItem = { ...item, char: word[inc] };
      inc++;
      return newItem;
    }
    return item;
  });
  return newUpdate;
}

const keyword = "IDEA";
const dataInjected = [
  [2, 3, 4, 5],
  [16, 17, 18, 19],
  [20, 21, 22, 23],
  [31, 41, 51, 61],
  [62, 73, 84, 95],
  [67, 77, 87, 97],
  [42, 43, 44, 45],
];
const randomLetters = generateRandomString(100);
let initCharacter = [...randomLetters];
dataInjected.forEach((wordIndexes) => {
  initCharacter = injectWord(initCharacter, wordIndexes);
});

const numberOfWords = 7;

export default function BoxContainer() {
  const [word, setWord] = useState("");
  const [characters, setCharacters] = useState<letter[]>([...initCharacter]);
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    setTimeout(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);
  }, [timer]);

  useEffect(() => {
    if (count === numberOfWords) {
      setMessage("Mission complate!");
      setWord("");
      return;
    }
    if (word === keyword) {
      setMessage("Match!");
      setWord("");
      setCount((prev) => prev + 1);
      const updateChars = characters.map((item) => {
        return item.clicked && item.isActive
          ? { ...item, isActive: false }
          : item;
      });
      setCharacters(updateChars);
    }
  }, [characters, word]);

  const handleClickBox = (item: letter, index: number) => {
    setMessage("");
    if (!item.isActive) {
      return;
    }
    const cloneChars = [...characters];
    const dataUpdate = cloneChars.map((item, idx) => {
      return idx === index ? { ...item, clicked: !item.clicked } : item;
    });
    setCharacters(dataUpdate);

    let newWord = "";
    dataUpdate.forEach((item) => {
      if (item.clicked && item.isActive) {
        newWord += item.char;
      }
    });
    setWord(newWord);
  };

  return (
    <div className={styles.container}>
      <h1>Find (7) "IDEA" words on this board!</h1>

      <div className={styles.message}>
        <h2>{word}</h2>
        <h3>{message}</h3>
        <h4>{count} word(s) found</h4>
      </div>

      <div className={styles.boxes}>
        {characters.map((item, index) => {
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
              onClick={() => handleClickBox(item, index)}
            >
              {item.char}
            </div>
          );
        })}
      </div>
      <div className={styles.timer}>00:{timer < 10 ? `0${timer}` : timer}</div>
    </div>
  );
}
