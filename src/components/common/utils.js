/**
 * Calculate timer interval based on trial number
 * @param {number} trialNumber
 */
export const calculateTimerInterval = trialNumber => {
  if (trialNumber <= 100) {
    return 50;
  } else if (trialNumber <= 1000) {
    return 10;
  } else if (trialNumber <= 5000) {
    return 5;
  } else if (trialNumber <= 10000) {
    return 0.5;
  } else {
    return 0.1;
  }
};
