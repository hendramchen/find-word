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
    keyword: ["I", "D", "E", "A"],
    numOfKeyword: 3,
    collection: dataInjected,
    direction: "horizontal",
    boxSize: 8,
  },
  {
    id: 2,
    keyword: ["C", "O", "D", "E", "X"],
    numOfKeyword: 3,
    collection: dataInjected2,
    direction: "mix",
    boxSize: 10,
  },
  {
    id: 3,
    keyword: ["R", "E", "A", "C", "T"],
    numOfKeyword: 6,
    collection: [
      [
        [1, 4],
        [1, 5],
        [1, 6],
        [1, 7],
        [1, 8],
      ],
      [
        [7, 0],
        [7, 1],
        [7, 2],
        [7, 3],
        [7, 4],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
      ],
      [
        [5, 9],
        [6, 9],
        [7, 9],
        [8, 9],
        [9, 9],
      ],
      [
        [2, 9],
        [3, 8],
        [4, 7],
        [5, 6],
        [6, 5],
      ],
      [
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5],
      ],
    ],
    direction: "diagonal-right",
    boxSize: 10,
  },
];
