import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TetrominoType, getShape, COLORS } from '../constants/tetrominoes';

interface NextPieceProps {
  type: TetrominoType;
}

const PREVIEW_CELL = 16;

export const NextPiece: React.FC<NextPieceProps> = ({ type }) => {
  const shape = getShape(type, 0);
  const color = COLORS[type];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>NEXT</Text>
      <View style={styles.grid}>
        {shape.map((row, ri) => (
          <View key={ri} style={styles.row}>
            {row.map((cell, ci) => (
              <View
                key={ci}
                style={[
                  styles.cell,
                  {
                    width: PREVIEW_CELL,
                    height: PREVIEW_CELL,
                    backgroundColor: cell ? color : 'transparent',
                    borderColor: cell ? 'rgba(255,255,255,0.2)' : 'transparent',
                  },
                ]}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 8,
  },
  label: {
    color: '#8888aa',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  grid: {
    padding: 4,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
  },
});
