import { BoardData } from "./types/board";

export const dataInjected: number[][][] = [
  [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ],
  [
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
  ],
  [
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5],
  ],
];

export const dataInjected2: number[][][] = [
  [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
  ],
  [
    [2, 1],
    [3, 2],
    [4, 3],
    [5, 4],
    [6, 5],
  ],
  [
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
    [5, 5],
  ],
];

export const boarddata: BoardData[] = [
  {
    id: 1,
    keywords: ["I", "D", "E", "A"],
    numberOfkeyword: 3,
    collection: dataInjected,
    direction: "horizontal",
    boxSize: 8,
  },
  {
    id: 2,
    keywords: ["C", "O", "D", "E", "X"],
    numberOfkeyword: 3,
    collection: dataInjected2,
    direction: "mix",
    boxSize: 10,
  },
];
