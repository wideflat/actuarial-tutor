import { BOARD_WIDTH, BOARD_HEIGHT, createEmptyBoard } from '../constants/board';

export const lockPiece = (
  board: number[][],
  shape: number[][],
  x: number,
  y: number,
  colorIndex: number,
): number[][] => {
  const newBoard = board.map(row => [...row]);
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] === 0) continue;
      const boardY = y + row;
      const boardX = x + col;
      if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
        newBoard[boardY][boardX] = colorIndex;
      }
    }
  }
  return newBoard;
};

export const clearLines = (board: number[][]): { board: number[][]; linesCleared: number } => {
  const remaining = board.filter(row => row.some(cell => cell === 0));
  const linesCleared = BOARD_HEIGHT - remaining.length;
  if (linesCleared === 0) return { board, linesCleared: 0 };

  const emptyRows = Array.from({ length: linesCleared }, () => Array(BOARD_WIDTH).fill(0));
  return {
    board: [...emptyRows, ...remaining],
    linesCleared,
  };
};

export const mergeBoard = (
  board: number[][],
  shape: number[][],
  x: number,
  y: number,
  colorIndex: number,
): number[][] => {
  const display = board.map(row => [...row]);
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] === 0) continue;
      const boardY = y + row;
      const boardX = x + col;
      if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
        display[boardY][boardX] = colorIndex;
      }
    }
  }
  return display;
};
