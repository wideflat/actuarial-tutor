import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants/board';

export const isValidPosition = (
  board: number[][],
  shape: number[][],
  x: number,
  y: number,
): boolean => {
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] === 0) continue;
      const boardX = x + col;
      const boardY = y + row;
      if (boardX < 0 || boardX >= BOARD_WIDTH) return false;
      if (boardY < 0 || boardY >= BOARD_HEIGHT) return false;
      if (board[boardY][boardX] !== 0) return false;
    }
  }
  return true;
};
