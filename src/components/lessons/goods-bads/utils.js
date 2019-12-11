/**
 * Generate an integer randomly between min(inclusive) and max(inclusive)
 * @param {Number} min
 * @param {Number} max
 * @return {Number} A random number
 */
export const pickNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generate a sign randomly, -1 for negative, 1 for positive
 * @return {Number} -1 or 1.
 */
export const pickSign = () => {
  return Math.random() < 0.5 ? -1 : 1;
};
