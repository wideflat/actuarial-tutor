import { useReducer, useCallback } from 'react';
import { gameReducer, createInitialState } from '../reducers/gameReducer';
import { getShape, getColorIndex } from '../constants/tetrominoes';
import { mergeBoard } from '../utils/board';
import { getTickSpeed } from '../utils/scoring';
import { useInterval } from './useInterval';

export const useGameEngine = () => {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState);

  const tickSpeed = state.started && !state.gameOver ? getTickSpeed(state.level) : null;
  useInterval(() => dispatch({ type: 'TICK' }), tickSpeed);

  const displayBoard = state.started
    ? mergeBoard(
        state.board,
        getShape(state.currentPiece.type, state.currentPiece.rotation),
        state.currentPiece.x,
        state.currentPiece.y,
        getColorIndex(state.currentPiece.type),
      )
    : state.board;

  const moveLeft = useCallback(() => dispatch({ type: 'MOVE_LEFT' }), []);
  const moveRight = useCallback(() => dispatch({ type: 'MOVE_RIGHT' }), []);
  const moveDown = useCallback(() => dispatch({ type: 'MOVE_DOWN' }), []);
  const rotate = useCallback(() => dispatch({ type: 'ROTATE' }), []);
  const hardDrop = useCallback(() => dispatch({ type: 'HARD_DROP' }), []);
  const start = useCallback(() => dispatch({ type: 'START' }), []);
  const restart = useCallback(() => dispatch({ type: 'RESTART' }), []);

  return {
    displayBoard,
    score: state.score,
    level: state.level,
    linesCleared: state.linesCleared,
    gameOver: state.gameOver,
    started: state.started,
    nextPiece: state.nextPiece,
    actions: { moveLeft, moveRight, moveDown, rotate, hardDrop, start, restart },
  };
};
