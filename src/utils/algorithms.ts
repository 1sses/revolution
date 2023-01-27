export const militaryPowerFn = (military: Record<number, number>) => {
  return (
    military[1] +
    military[2] * 3.5 +
    military[3] * 7 +
    military[4] * 15 +
    military[5] * 100 +
    military[6] * 1000
  );
};

export const enemyStatFn = (x: number, coefficient: number, fix: number) =>
  // Math.ceil(Math.pow(x, 13 / 10) / coefficient + fix);
  Math.round((1.4 * x) / coefficient + fix);

export const defenseCapacityFn = (x: number) => {
  const coefficient = 8 * Math.cbrt(x - 99.5) + 50;
  if (coefficient > 100) return 100;
  return coefficient;
};
