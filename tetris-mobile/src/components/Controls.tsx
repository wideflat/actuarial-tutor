import React, { useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ControlsProps {
  onLeft: () => void;
  onRight: () => void;
  onDown: () => void;
  onRotate: () => void;
  onHardDrop: () => void;
}

const ControlButton: React.FC<{
  label: string;
  onPress: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  style?: object;
}> = ({ label, onPress, onPressIn, onPressOut, style }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={onPress}
    onPressIn={onPressIn}
    onPressOut={onPressOut}
    activeOpacity={0.6}
  >
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

export const Controls: React.FC<ControlsProps> = ({
  onLeft,
  onRight,
  onDown,
  onRotate,
  onHardDrop,
}) => {
  const repeatTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRepeat = useCallback((action: () => void) => {
    repeatTimer.current = setInterval(action, 80);
  }, []);

  const stopRepeat = useCallback(() => {
    if (repeatTimer.current) {
      clearInterval(repeatTimer.current);
      repeatTimer.current = null;
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ControlButton
          label="◀"
          onPress={onLeft}
          onPressIn={() => startRepeat(onLeft)}
          onPressOut={stopRepeat}
        />
        <ControlButton
          label="▼"
          onPress={onDown}
          onPressIn={() => startRepeat(onDown)}
          onPressOut={stopRepeat}
        />
        <ControlButton
          label="▶"
          onPress={onRight}
          onPressIn={() => startRepeat(onRight)}
          onPressOut={stopRepeat}
        />
      </View>
      <View style={styles.row}>
        <ControlButton label="↻ Rotate" onPress={onRotate} style={styles.wideButton} />
        <ControlButton label="⏬ Drop" onPress={onHardDrop} style={styles.wideButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%',
    paddingVertical: 12,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  button: {
    backgroundColor: '#2a2a4a',
    width: 64,
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4a4a6a',
  },
  wideButton: {
    width: 120,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
