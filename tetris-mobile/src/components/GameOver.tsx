import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>GAME OVER</Text>
        <Text style={styles.score}>Score: {score}</Text>
        <TouchableOpacity style={styles.button} onPress={onRestart}>
          <Text style={styles.buttonText}>PLAY AGAIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modal: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4a4a6a',
  },
  title: {
    color: '#ff4444',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  score: {
    color: '#ffffff',
    fontSize: 22,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#4a4a6a',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
