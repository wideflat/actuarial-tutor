import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Board } from '../components/Board';
import { ScoreBar } from '../components/ScoreBar';
import { NextPiece } from '../components/NextPiece';
import { Controls } from '../components/Controls';
import { GameOver } from '../components/GameOver';
import { useGameEngine } from '../hooks/useGameEngine';

export const GameScreen: React.FC = () => {
  const {
    displayBoard,
    score,
    level,
    linesCleared,
    gameOver,
    started,
    nextPiece,
    actions,
  } = useGameEngine();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>TETRIS</Text>

        <View style={styles.topRow}>
          <ScoreBar score={score} level={level} lines={linesCleared} />
        </View>

        <View style={styles.gameArea}>
          <View style={styles.boardContainer}>
            <Board board={displayBoard} />
            {gameOver && <GameOver score={score} onRestart={actions.restart} />}
            {!started && (
              <View style={styles.startOverlay}>
                <TouchableOpacity style={styles.startButton} onPress={actions.start}>
                  <Text style={styles.startText}>TAP TO START</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <NextPiece type={nextPiece} />
        </View>

        <Controls
          onLeft={actions.moveLeft}
          onRight={actions.moveRight}
          onDown={actions.moveDown}
          onRotate={actions.rotate}
          onHardDrop={actions.hardDrop}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 6,
  },
  topRow: {
    width: '100%',
    alignItems: 'center',
  },
  gameArea: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  boardContainer: {
    position: 'relative',
  },
  startOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  startButton: {
    backgroundColor: '#4a4a6a',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  startText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
