import { BOARD_WIDTH, createEmptyBoard } from '../constants/board';
import { ALL_TYPES, TetrominoType, getShape, getColorIndex } from '../constants/tetrominoes';
import { isValidPosition } from '../utils/collision';
import { lockPiece, clearLines } from '../utils/board';
import { getLineScore, getLevel } from '../utils/scoring';
import { GameState, GameAction, PieceState } from './types';

const shuffleBag = (): TetrominoType[] => {
  const bag = [...ALL_TYPES];
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }
  return bag;
};

const pullFromBag = (bag: TetrominoType[]): { piece: TetrominoType; bag: TetrominoType[] } => {
  let currentBag = bag.length > 0 ? bag : shuffleBag();
  const piece = currentBag[0];
  const remaining = currentBag.slice(1);
  return { piece, bag: remaining.length > 0 ? remaining : shuffleBag() };
};

const spawnPiece = (type: TetrominoType): PieceState => {
  const shape = getShape(type, 0);
  const x = Math.floor((BOARD_WIDTH - shape[0].length) / 2);
  return { type, rotation: 0, x, y: 0 };
};

export const createInitialState = (): GameState => {
  let bag = shuffleBag();
  const { piece: first, bag: bag2 } = pullFromBag(bag);
  const { piece: next, bag: bag3 } = pullFromBag(bag2);
  return {
    board: createEmptyBoard(),
    currentPiece: spawnPiece(first),
    nextPiece: next,
    bag: bag3,
    score: 0,
    level: 0,
    linesCleared: 0,
    gameOver: false,
    started: false,
  };
};

const tryMove = (
  state: GameState,
  dx: number,
  dy: number,
): GameState | null => {
  const { board, currentPiece } = state;
  const shape = getShape(currentPiece.type, currentPiece.rotation);
  const newX = currentPiece.x + dx;
  const newY = currentPiece.y + dy;
  if (isValidPosition(board, shape, newX, newY)) {
    return { ...state, currentPiece: { ...currentPiece, x: newX, y: newY } };
  }
  return null;
};

const lockAndSpawn = (state: GameState): GameState => {
  const { board, currentPiece } = state;
  const shape = getShape(currentPiece.type, currentPiece.rotation);
  const colorIndex = getColorIndex(currentPiece.type);

  const locked = lockPiece(board, shape, currentPiece.x, currentPiece.y, colorIndex);
  const { board: clearedBoard, linesCleared } = clearLines(locked);

  const totalLines = state.linesCleared + linesCleared;
  const level = getLevel(totalLines);
  const score = state.score + getLineScore(linesCleared, level);

  const { piece: nextType, bag } = pullFromBag(state.bag);
  const newPiece = spawnPiece(state.nextPiece);
  const newShape = getShape(newPiece.type, newPiece.rotation);

  if (!isValidPosition(clearedBoard, newShape, newPiece.x, newPiece.y)) {
    return { ...state, board: clearedBoard, score, level, linesCleared: totalLines, gameOver: true };
  }

  return {
    ...state,
    board: clearedBoard,
    currentPiece: newPiece,
    nextPiece: nextType,
    bag,
    score,
    level,
    linesCleared: totalLines,
  };
};

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  if (action.type === 'RESTART') return { ...createInitialState(), started: true };
  if (action.type === 'START') return { ...createInitialState(), started: true };
  if (state.gameOver || !state.started) return state;

  switch (action.type) {
    case 'MOVE_LEFT':
      return tryMove(state, -1, 0) ?? state;

    case 'MOVE_RIGHT':
      return tryMove(state, 1, 0) ?? state;

    case 'MOVE_DOWN': {
      const moved = tryMove(state, 0, 1);
      if (moved) return { ...moved, score: moved.score + 1 };
      return lockAndSpawn(state);
    }

    case 'TICK': {
      const moved = tryMove(state, 0, 1);
      if (moved) return moved;
      return lockAndSpawn(state);
    }

    case 'ROTATE': {
      const { currentPiece, board } = state;
      const newRotation = (currentPiece.rotation + 1) % 4;
      const newShape = getShape(currentPiece.type, newRotation);
      if (isValidPosition(board, newShape, currentPiece.x, currentPiece.y)) {
        return { ...state, currentPiece: { ...currentPiece, rotation: newRotation } };
      }
      // Try basic wall kicks: shift left or right by 1
      for (const dx of [-1, 1, -2, 2]) {
        if (isValidPosition(board, newShape, currentPiece.x + dx, currentPiece.y)) {
          return {
            ...state,
            currentPiece: { ...currentPiece, rotation: newRotation, x: currentPiece.x + dx },
          };
        }
      }
      return state;
    }

    case 'HARD_DROP': {
      let dropState = state;
      let dropped = tryMove(dropState, 0, 1);
      let dropCount = 0;
      while (dropped) {
        dropState = dropped;
        dropCount++;
        dropped = tryMove(dropState, 0, 1);
      }
      return lockAndSpawn({ ...dropState, score: dropState.score + dropCount * 2 });
    }

    default:
      return state;
  }
};
