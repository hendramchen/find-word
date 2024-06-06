export interface letter {
  id: number;
  char: string;
  clicked: boolean;
  isActive: boolean;
}

export interface BoardData {
  id: number;
  keyword: string[];
  numOfKeyword: number;
  collection: number[][][];
  direction: string;
  boxSize: number;
}
