export const lottoNumbers = [
  { number: 1, selected: false },
  { number: 2, selected: false },
  { number: 3, selected: false },
  { number: 4, selected: false },
  { number: 5, selected: false },
  { number: 6, selected: false }
];

export const initLottoNumbers = totalNumbers => {
  const lottoNumbers = [];
  for (let i = 1; i <= totalNumbers; i++) {
    lottoNumbers.push({
      number: i,
      selected: false
    });
  }
  return lottoNumbers;
};

export const settings = {
  totalNumbers: 6,
  numbersToDraw: 2,
  maxTotalNumbers: 10,
  minTotalNumbers: 3,
  maxNumbersToDraw: 4,
  minNumbersToDraw: 2
};

/**
 * Find the selected drawn numbers
 * @param {Object} lottoNumbers
 */
export const findSelectedLottoNumbers = lottoNumbers => {
  if (!lottoNumbers) {
    return [];
  }
  return lottoNumbers.filter(el => el.selected === true).map(el => el.number);
};

/**
 * Check if drawn numbers are the winner
 * @param {Array} drawnNumbers
 * @param {Object} lottoNumbers
 */
export const checkWin = (drawnNumbers, lottoNumbers) => {
  const selectedLottoNumbers = findSelectedLottoNumbers(lottoNumbers);
  for (let i = 0; i < drawnNumbers.length; i++) {
    if (selectedLottoNumbers.indexOf(drawnNumbers[i]) === -1) {
      return false;
    }
  }
  return true;
};
