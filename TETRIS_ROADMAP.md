# Tetris Mobile App — React Native Roadmap

A roadmap for building a Tetris game as a React Native (Expo) mobile app, starting with a quick playable prototype.

---

## Phase 1: Project Setup (~15 min)

- Initialize with `npx create-expo-app tetris-mobile --template blank-typescript`
- Install dependencies:
  - `expo-haptics` — vibration feedback
  - `react-native-gesture-handler` — swipe controls
  - `expo-av` — sound effects (optional for mockup)
- No heavy game engine needed — plain React Native `<View>` components work perfectly for a grid-based game like Tetris

---

## Phase 2: Core Game Engine (~2-3 hours) — ESSENTIAL

- **Game board**: 10-wide x 20-tall grid stored as a 2D array
- **Tetrominoes**: All 7 shapes (I, O, T, S, Z, J, L) defined as coordinate arrays with rotation states
- **Game loop**: `useEffect` + `setInterval` for gravity (piece drops every N ms)
- **Collision detection**: Check bounds + occupied cells before each move/rotation
- **Piece locking**: When piece can't move down, lock it into the board
- **Line clearing**: Detect and remove completed rows, shift rows down
- **Random piece generation**: Random bag algorithm for next piece

Key files:
```
src/
  constants/
    tetrominoes.ts    # Shape definitions, colors, rotation matrices
    board.ts          # Board dimensions, initial state
  hooks/
    useGameEngine.ts  # Core game state + logic (the heart of the game)
    useInterval.ts    # Custom hook for game tick
  utils/
    collision.ts      # Collision detection helpers
    board.ts          # Line clearing, board manipulation
```

---

## Phase 3: UI / Rendering (~1-2 hours) — ESSENTIAL

- **Grid renderer**: Map 2D board array to colored `<View>` cells using `StyleSheet`
- **Active piece overlay**: Render current falling piece on top of the board
- **Score display**: Simple `<Text>` component showing score and level
- **Next piece preview**: Small grid showing upcoming piece
- **Game over screen**: Modal/overlay with final score + restart button

Key files:
```
src/
  components/
    Board.tsx         # Main game board grid
    Cell.tsx          # Individual cell (colored square)
    ScoreBoard.tsx    # Score, level, lines display
    NextPiece.tsx     # Preview of next piece
    GameOver.tsx      # Game over overlay
  screens/
    GameScreen.tsx    # Main screen composing all components
```

---

## Phase 4: Mobile Controls (~1 hour) — ESSENTIAL

**Option A — On-screen buttons (recommended for mockup):**
- Left / Right arrows, Rotate button, Soft drop button, Hard drop button
- Simple `<TouchableOpacity>` components at bottom of screen

**Option B — Gesture controls (add later):**
- Swipe left/right to move, swipe down for soft drop, tap to rotate

Start with Option A — faster to implement and more reliable for a prototype.

Key files:
```
src/
  components/
    Controls.tsx      # On-screen button controls
```

---

## Phase 5: Game Logic (~1 hour) — PARTIAL for mockup

- **Scoring**: 100/300/500/800 points for 1/2/3/4 lines cleared
- **Levels**: Speed increases every 10 lines cleared
- **Game state**: Start → Playing → Paused → Game Over
- **Start/Restart**: New game flow

---

## Phase 6: Polish (SKIP for initial mockup)

- Animations (row flash on clear, piece drop animation)
- Sound effects (move, rotate, clear, game over)
- Haptic feedback on moves
- Ghost piece (shows where piece will land)
- Hold piece feature
- High score persistence (AsyncStorage)
- Theme/skin options
- App store assets and submission

---

## Timeline Summary

| Phase | Effort | Priority for Mockup |
|-------|--------|---------------------|
| 1. Project Setup | ~15 min | Essential |
| 2. Core Engine | ~2-3 hrs | Essential |
| 3. UI/Rendering | ~1-2 hrs | Essential |
| 4. Mobile Controls | ~1 hr | Essential |
| 5. Game Logic | ~1 hr | Partial (basic scoring) |
| 6. Polish | ~3-5 hrs | Skip for mockup |

**Total for playable mockup: ~5-7 hours of implementation**

A working, playable Tetris prototype can be built in a single focused session.

---

## Recommended Libraries

| Library | Purpose |
|---------|---------|
| `expo` | App framework, fast dev cycle |
| `typescript` | Type safety |
| `react-native-gesture-handler` | Gesture support (Phase 6) |
| `expo-haptics` | Vibration feedback (Phase 6) |
| `expo-av` | Sound effects (Phase 6) |

No game engine library needed — Tetris renders perfectly with standard React Native `<View>` components.

---

## Project Structure

```
tetris-mobile/
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
├── src/
│   ├── constants/
│   │   ├── tetrominoes.ts
│   │   └── board.ts
│   ├── hooks/
│   │   ├── useGameEngine.ts
│   │   └── useInterval.ts
│   ├── utils/
│   │   ├── collision.ts
│   │   └── board.ts
│   ├── components/
│   │   ├── Board.tsx
│   │   ├── Cell.tsx
│   │   ├── Controls.tsx
│   │   ├── ScoreBoard.tsx
│   │   ├── NextPiece.tsx
│   │   └── GameOver.tsx
│   └── screens/
│       └── GameScreen.tsx
└── assets/
```
