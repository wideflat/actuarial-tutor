import React from 'react';
import { View, StyleSheet } from 'react-native';
import { getColorByIndex } from '../constants/tetrominoes';

interface CellProps {
  colorIndex: number;
  size: number;
}

const CellComponent: React.FC<CellProps> = ({ colorIndex, size }) => {
  const filled = colorIndex !== 0;
  return (
    <View
      style={[
        styles.cell,
        {
          width: size,
          height: size,
          backgroundColor: filled ? getColorByIndex(colorIndex) : '#1a1a2e',
          borderColor: filled ? 'rgba(255,255,255,0.2)' : '#2a2a4a',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
  },
});

export const Cell = React.memo(CellComponent);
