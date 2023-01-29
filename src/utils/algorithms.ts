export const militaryPowerFn = (military: Record<number, number>) => {
  return (
    military[0] +
    military[1] * 3.5 +
    military[2] * 7 +
    military[3] * 15 +
    military[4] * 100 +
    military[5] * 1000
  );
};

export const enemyStatFn = (x: number, coefficient: number, fix: number) =>
  // Math.ceil(Math.pow(x, 13 / 10) / coefficient + fix);
  Math.round((1.4 * x) / coefficient + fix);

export const defenseCapacityFn = (x: number) => {
  const coefficient = 10 * Math.cbrt(x - 99) + 45;
  if (coefficient > 100) return 100;
  return coefficient;
};
