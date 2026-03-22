import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScoreBarProps {
  score: number;
  level: number;
  lines: number;
}

export const ScoreBar: React.FC<ScoreBarProps> = ({ score, level, lines }) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.label}>SCORE</Text>
        <Text style={styles.value}>{score}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>LEVEL</Text>
        <Text style={styles.value}>{level}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>LINES</Text>
        <Text style={styles.value}>{lines}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '85%',
    paddingVertical: 8,
  },
  item: {
    alignItems: 'center',
  },
  label: {
    color: '#8888aa',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  value: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
