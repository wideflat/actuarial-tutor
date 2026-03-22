import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Cell } from './Cell';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants/board';

interface BoardProps {
  board: number[][];
}

const screenWidth = Dimensions.get('window').width;
const CELL_SIZE = Math.floor((screenWidth * 0.85) / BOARD_WIDTH);
const BOARD_PIXEL_WIDTH = CELL_SIZE * BOARD_WIDTH;
const BOARD_PIXEL_HEIGHT = CELL_SIZE * BOARD_HEIGHT;

export { CELL_SIZE };

export const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <View style={[styles.board, { width: BOARD_PIXEL_WIDTH, height: BOARD_PIXEL_HEIGHT }]}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <Cell key={colIndex} colorIndex={cell} size={CELL_SIZE} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    borderWidth: 2,
    borderColor: '#4a4a6a',
    backgroundColor: '#1a1a2e',
  },
  row: {
    flexDirection: 'row',
  },
});
