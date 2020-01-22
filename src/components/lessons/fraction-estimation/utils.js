import { pickNumber } from "../../common/utils";

export const fractionSelection = [
  {
    number: 2,
    words: "halves",
    selected: true
  },
  {
    number: 3,
    words: "thirds",
    selected: true
  },
  {
    number: 4,
    words: "quarters",
    selected: true
  },
  {
    number: 5,
    words: "fifths",
    selected: false
  },
  {
    number: 6,
    words: "sixths",
    selected: false
  },
  {
    number: 7,
    words: "sevenths",
    selected: false
  },
  {
    number: 8,
    words: "eighths",
    selected: false
  },
  {
    number: 9,
    words: "ninths",
    selected: false
  },
  {
    number: 10,
    words: "tenths",
    selected: false
  },
  {
    number: 12,
    words: "twelfths",
    selected: false
  },
  {
    number: 15,
    words: "fifteenths",
    selected: false
  },
  {
    number: 16,
    words: "sixteenths",
    selected: false
  },
  {
    number: 18,
    words: "eighteenths",
    selected: false
  },
  {
    number: 20,
    words: "twentieths",
    selected: false
  }
];

/**
 * Generate a fraction number
 * @param {Array} fractionSelection
 */
export const generateFractionNumber = fractionSelection => {
  let numerator, denominator;
  const selected = fractionSelection.filter(el => el.selected === true);
  let denominatorIndex = pickNumber(0, selected.length - 1);
  denominator = selected[denominatorIndex].number;
  numerator = pickNumber(1, denominator - 1);
  return {
    numerator,
    denominator
  };
};

/**
 * Generate a random number between 1 - 99
 * if level = 1, the number generated can be any number between 1-100,
 * if level = 5, the number generated should be the one that can be divied by 5.
 * @param {number} level
 */
export const generatePercentageNumber = level => {
  if (level === 1) {
    return pickNumber(1, 99);
  }
  if (level === 5) {
    return pickNumber(1, 19) * 5;
  }
};

/**
 * Check if selection is valid.
 * If all elements selected is false, return false, otherwise return true.
 */
export const checkInvalidSelection = fractionSelection => {
  let selectedEl = 0;
  for (let i = 0; i < fractionSelection.length; i++) {
    if (fractionSelection[i].selected) {
      selectedEl++;
    }
  }
  return selectedEl > 0;
};

export const canvasConstant = {
  MIN_WIDTH: 200,
  MAX_WIDTH: 300,
  MIN_HEIGHT: 250,
  MAX_HEIGHT: 300,
  STRIP_HEIGHT: 80,
  TOWER_WIDTH: 80,
  START_X: 1,
  START_Y: 10,
  MIN_RADIUS: 80,
  MAX_RADIUS: 100
};
