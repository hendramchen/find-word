export interface letter {
  id: number;
  char: string;
  clicked: boolean;
  isActive: boolean;
}

export interface BoardData {
  id: number;
  keywords: string[];
  numberOfkeyword: number;
  collection: number[][][];
  direction: string;
  boxSize: number;
}
