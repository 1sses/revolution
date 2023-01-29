export const countMilitaryLoss = (appStore: any, coefficients: number[]) => {
  const loss = coefficients.map((coefficient, i) =>
    Math.round(coefficient * appStore.military[i])
  );
  for (let i = 0; i < coefficients.length; i++) {
    appStore.military[i] -= loss[i];
  }
  if (appStore.military[0] === 0) {
    appStore.military[0] = 1;
    loss[0] -= 1;
  }

  return loss;
};
