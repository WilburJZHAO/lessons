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

/**
 * Throw a dice once  i.e. Generate a number randomly from 1, 2, 3, 4, 5, 6
 * @return Number
 */
export const throwDiceOnce = () => {
  return Math.floor(Math.random() * 6) + 1;
};

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
 * Separate number digits by commas.
 * e.g. 12345678 => 12,345,678
 * @param {number} number
 */
export const separateNumber = number => {
  let strNum = String(number);
  let arrNum = strNum.split("");
  let arr = [];
  let part = "";
  for (let i = 0; i < arrNum.length; i++) {
    let num = arrNum[arrNum.length - i - 1];
    part = num + part;
    if ((i + 1) % 3 === 0) {
      arr.unshift(part);
      part = "";
    }
  }
  if (part.length > 0) {
    arr.unshift(part);
  }
  return arr.join(",");
};


/**
 * Convert a number into a clean 'legible' format for students
 * that matches modern maths textbooks.
 * Integers separated by 'thin spaces' every 3 digits right to left
 * Decimals separated by 'thin spaces' every 3 digits left to right
 * Takes optional parameter for fixing number of decimal places
 * to stop jitter in trials.
 * e.g. 1234.56789, 4 => 1 234.567 8
 * (thin spaces appear to be regular in monospace fonts)
 * Performance note:
 * Tested with console.time() and runs surprisingly fast.
 * Function can run roughly 300 times / ms so shouldn't affect
 * frames in trials that update every 17 ms
 * @param {Number} number
 * @param {Number) fixedDec
 * @return {String}
 */
export function legify(number, fixedDec = -1) {
	let spacer = '\u2009'; // thin space
  let numberString = fixedDec < 0 ? number.toString() : Number(number).toFixed(fixedDec);
	// break into integer and decimal parts
  let decIndex = numberString.indexOf('.');
  let intString;
  let decString;
  if (decIndex === -1) {
    intString = numberString;
  }
  else if (decIndex > 0) {
    intString = numberString.slice(0, decIndex);
    decString = numberString.slice(decIndex + 1, numberString.length);
  }
  else { // '.' as zeroeth char
    intString = '0';
    decString = numberString.slice(1, numberString.length);
  }

  // insert spaces for integer part
  let newIntString = '';
  for (let i = 0; i < intString.length; i++) {
    let lenToEnd = intString.length - (i + 1);
    newIntString = lenToEnd % 3 === 0 && lenToEnd !== 0 ? newIntString + intString[i] + spacer : newIntString + intString[i];
  }

	// insert spaces for decimal part
  let newDecString = '';
  if (decIndex > -1) {
    for (let i = 0; i < decString.length; i++) {
      newDecString = (i + 1) % 3 === 0 && (i + 1) !== decString.length ? newDecString + decString[i] + spacer : newDecString + decString[i];
    }
  }

  return decIndex === -1 ? newIntString : newIntString + '.' + newDecString;
}
