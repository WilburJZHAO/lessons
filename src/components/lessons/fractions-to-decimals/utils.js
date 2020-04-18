import { pickNumber, shuffleArray } from "../../common/utils.js";

export const APP_CONST = {
  MIN_ROPE_WIDTH: 300,
  CONTAINER_HEIGHT: 150,
  ROPE_HEIGHT: 60,
  MARGIN_Y: 40,
  TAG_HEIGHT: 30,
  TAG_RECT_WIDTH: 12,
  TAG_RECT_HEIGHT: 50,
  TAG_TEXT_OFFSET: 4,
  TAG_TEXT_HEIGHT: 10
};

/** Generate an shuffled array, 0 to 1 in 0.1 increments  */
export const generateTagArr = () => {
  return shuffleArray([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);
};

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
    selected: true
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
    selected: true
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
    number: 20,
    words: "twentieths",
    selected: false
  },
  {
    number: 25,
    words: "twenty-fifths",
    selected: false
  },
  {
    number: 50,
    words: "fiftieths",
    selected: false
  },
  {
    number: 100,
    words: "hundredths",
    selected: false
  }
];

/**
 * Generate a fraction
 * @param {Array} fractionSelection
 */
export const generateFraction = fractionSelection => {
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
