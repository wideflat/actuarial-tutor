export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const createEmptyBoard = (): number[][] =>
  Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0));
