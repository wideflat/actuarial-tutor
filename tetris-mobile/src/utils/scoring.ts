const LINE_SCORES = [0, 100, 300, 500, 800];

export const getLineScore = (lines: number, level: number): number =>
  (LINE_SCORES[lines] ?? 0) * (level + 1);

export const getLevel = (totalLines: number): number =>
  Math.floor(totalLines / 10);

export const getTickSpeed = (level: number): number =>
  Math.max(100, 800 - level * 70);
