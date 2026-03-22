import { TetrominoType } from '../constants/tetrominoes';

export interface PieceState {
  type: TetrominoType;
  rotation: number;
  x: number;
  y: number;
}

export interface GameState {
  board: number[][];
  currentPiece: PieceState;
  nextPiece: TetrominoType;
  bag: TetrominoType[];
  score: number;
  level: number;
  linesCleared: number;
  gameOver: boolean;
  started: boolean;
}

export type GameAction =
  | { type: 'TICK' }
  | { type: 'MOVE_LEFT' }
  | { type: 'MOVE_RIGHT' }
  | { type: 'MOVE_DOWN' }
  | { type: 'ROTATE' }
  | { type: 'HARD_DROP' }
  | { type: 'START' }
  | { type: 'RESTART' };
