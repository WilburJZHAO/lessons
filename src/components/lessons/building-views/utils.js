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
 * Fill an array with zero, if the element is undefined.
 * @param {Array} arr
 * @return {Array}
 */
export const fillArrayWithZero = arr => {
  const arrLength = arr.length;
  const newArr = new Array(arrLength);

  for (let i = 0; i < arrLength; i++) {
    newArr[i] = new Array(arrLength);
    for (let j = 0; j < arrLength; j++) {
      if (arr[i][j]) {
        newArr[i][j] = arr[i][j];
      } else {
        newArr[i][j] = 0;
      }
    }
  }
  return newArr;
};

/**
 * Convert a N*N two-dimentional array by changing its row to column
 * e.g.
 * [
 *   [8, 9, 1],
 *   [9, 2, 1],
 *   [3, 5, 4]
 * ]
 * After conversion:
 * [
 *   [8, 9, 3],
 *   [9, 2, 5],
 *   [1, 1, 4]
 * ]
 * @param {Array} original array
 * @return {Array} converted array
 */
export const convertArrayRowToCol = arr => {
  const arrLength = arr.length;
  const newArr = new Array(arrLength);
  for (let i = 0; i < arrLength; i++) {
    newArr[i] = new Array(arrLength);
  } // Initialize an empty N*N two-dimentional array: newArr

  for (let i = 0; i < arrLength; i++) {
    for (let j = 0; j < arrLength; j++) {
      newArr[j][i] = arr[i][j];
    }
  }
  return newArr;
};

/**
 * Convert a N*N two-dimentional array by reversing rows
 * e.g.
 * [
 *   [8, 9, 1, 2],
 *   [9, 2, 1, 3],
 *   [3, 5, 4, 6],
 *   [0, 1, 2, 5]
 * ]
 * After conversion:
 * [
 *   [0, 1, 2, 5],
 *   [3, 5, 4, 6],
 *   [9, 2, 1, 3],
 *   [8, 9, 1, 2]
 * ]
 * @param {Array} original array
 * @return {Array} converted array
 */
export const convertArrayByRow = arr => {
  const arrLength = arr.length;
  const newArr = new Array(arrLength);

  for (let i = 0; i < arrLength; i++) {
    newArr[i] = arr[arrLength - i - 1];
  }
  return newArr;
};

/**
 * Convert a N*N two-dimentional array by reversing elements in each row
 * e.g.
 * [
 *   [8, 9, 1, 2],
 *   [9, 2, 1, 3],
 *   [3, 5, 4, 6],
 *   [0, 1, 2, 5]
 * ]
 * After conversion:
 * [
 *   [2, 1, 9, 8],
 *   [3, 1, 2, 9],
 *   [6, 4, 5, 3],
 *   [5, 2, 1, 0]
 * ]
 * @param {Array} original array
 * @return {Array} converted array
 */
export const convertArrayByEl = arr => {
  const arrLength = arr.length;
  const newArr = new Array(arrLength);

  for (let i = 0; i < arrLength; i++) {
    newArr[i] = new Array(arrLength);
    for (let j = 0; j < arrLength; j++) {
      newArr[i][j] = arr[i][arrLength - j - 1];
    }
  }
  return newArr;
};

/**
 * Filter a N*N two-dimentional array so that it can reflect a building:
 * The filter rule is:
 * 1. look at each row in array
 * 2. check each element one by one, if it is larger than previous one, record the largest one and keep it in array
 * 3. otherwise, no keep it.
 * 4. Fill the element null into array
 * e.g.
 * [
 *   [8, 9, 1, 2],
 *   [9, 2, 1, 3],
 *   [3, 5, 4, 6],
 *   [0, 1, 2, 5]
 * ]
 * After filter:
 * [
 * 	 [9, 8],
 *   [9],
 *   [6, 5, 3],
 *   [5, 2, 1]
 * ]
 * Fill with null element.
 * [
 *   [9, 8, null, null, null, null, null, null, null],
 *   [9, null, null, null, null, null, null, null, null],
 *   [6, 5, null, 3, null, null],
 *   [5, null, null, 2, 1]
 * ]
 * @param {Array} arr
 * @returns {Array} the array filtered
 */
export const makeViewArray = arr => {
  const arrLength = arr.length;
  const newArr = new Array(arrLength);

  for (let i = 0; i < arrLength; i++) {
    newArr[i] = [];
    let maxInRow = arr[i][0];
    let k = 0;
    newArr[i][k] = maxInRow;
    for (let j = 0; j < arrLength; j++) {
      if (arr[i][j] > maxInRow) {
        k++;
        maxInRow = arr[i][j];
        newArr[i].unshift(maxInRow);
      }
    }
    newArr[i] = fillArray(newArr[i]);
  } // First step: Create the filtered array
  return newArr;
};

/**
 *  Filter a N*N two-dimentional array so that it can reflect a building(when X-ray is ticked)
 */
export const makeViewArrayX = arr => {
  const newArr = markHidden(arr);
  for (let i = 0; i < newArr.length; i++) {
    newArr[i].sort((a, b) => {
      return b.number - a.number;
    });
    newArr[i] = fillArrayX(newArr[i]);
  }
  return newArr;
};

/** Based on the array, figure out which numbers are hidden and convert the array
 * e.g. [
 *   [8, 9, 1],
 *   [9, 2, 1],
 *   [3, 5, 4]
 * ] => [
 *  [{ number: 8, hidden: false }, { number: 9, hidden: false}, { number: 1, hidden: true}],
 *  [{number: 9, hidden: false}, { number: 2, hidden: true}, {number: 1, hidden: true}],
 *  [{number: 3, hidden: false}, { number: 5, hidden: false}, {number: 4, hidden: true}]
 * ]
 */
const markHidden = arr => {
  console.log(arr);
  const arrLength = arr.length;
  const newArr = new Array(arrLength);
  for (let i = 0; i < arrLength; i++) {
    let max = 0;
    newArr[i] = [];
    for (let j = 0; j < arrLength; j++) {
      if (arr[i][j] > max) {
        max = arr[i][j];
        newArr[i][j] = { number: arr[i][j], hidden: false };
      } else {
        newArr[i][j] = { number: arr[i][j], hidden: true };
      }
    }
    // newArr[i] = filterDuplicateElement(newArr[i]); // Remove duplicate element
  }
  return newArr;
};

/** Filter Duplicate element in an array
 */
const filterDuplicateElement = arr => {
  const checkArr = [];
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (checkArr.indexOf(arr[i].number) === -1) {
      //If the current element is not duplicated
      newArr.push(arr[i]);
      checkArr.push(arr[i].number);
    } else {
      continue;
    }
  }
  return newArr;
};

/**
 * Fill array(whose elements are numbers and ordered from biggest to smallest) with null elements
 * e.g. [9, 6, 1]
 * => [9, null, null, 6, null, null, null, null, 1]
 * @param {Array} arr
 * @returns {Array} the filled array
 */
const fillArray = arr => {
  const newArr = new Array(arr[0]);
  let k = arr[0];

  for (let i = 0; i < arr[0]; i++) {
    if (arr.indexOf(k) === -1) {
      newArr[i] = null;
    } else {
      newArr[i] = k;
    }
    k--;
  }
  return newArr;
};

/** Fill array, same functions as the above but it is for view array with x-ray */
const fillArrayX = arr => {
  // console.log(arr);
  // console.log(arr[0].number);

  const newArr = new Array(arr[0].number);
  let k = arr[0].number;
  for (let i = 0; i < newArr.length; i++) {
    let index = arr.findIndex(el => {
      return el.number === k;
    });
    if (index === -1) {
      newArr[i] = null;
    } else {
      newArr[i] = arr[index];
    }
    k--;
  }
  return newArr;
};
