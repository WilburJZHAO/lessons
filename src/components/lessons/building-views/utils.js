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
export const fillArrayWithZero = (arr) => {
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
export const convertArrayRowToCol = (arr) => {
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
export const convertArrayByRow = (arr) => {
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
export const convertArrayByEl = (arr) => {
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
export const makeViewArray = (arr) => {
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
export const makeViewArrayX = (arr) => {
  const returnArr = markSolid(markHidden(filterHiddenX(arr)));
  console.log("before", returnArr);
  for (let i = 0; i < returnArr.length; i++) {
    returnArr[i].sort((a, b) => {
      return b.number - a.number;
    });
    returnArr[i] = fillArrayX(returnArr[i]);
  }
  const finalReturnArr = setArrayX(returnArr);
  console.log("after", returnArr);
  return finalReturnArr;
};

const filterHiddenX = (arr) => {
  // 将即使X-ray也不能看到的数字设为0
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    // let row = [...arr[i]]; // 将当前行的数组保存一个副本，便于操作
    // // console.log(row);
    // let maxInRow = row[0]; // 保存一行中最大的数字
    // let maxInRowIndex = 0; // 保存一行中最大数字的index
    // for (let j = 1; j < row.length; j++) {
    //   // 获取一行中的最大值及最大值所在的index
    //   if (row[j] > maxInRow) {
    //     maxInRow = row[j];
    //     maxInRowIndex = j;
    //   }
    // }
    // row[maxInRowIndex] = 0; // 将最大元素置为0；
    // let nextMaxInRow = row[0]; // 保存一行中第二大的数字
    // let nextMaxInRowIndex = 0; // 保存一行中次大数的index
    // // 重复以上操作 ，因为最大数字在数组中已经被置为0，则现在找出来的最大值其实就是原数组的次大值
    // // 如果最大值有多个 则次大值和最大值相等。
    // for (let j = 1; j < row.length; j++) {
    //   if (row[j] > nextMaxInRow) {
    //     nextMaxInRow = row[j];
    //     nextMaxInRowIndex = j;
    //   }
    // }
    // console.log(maxInRow, nextMaxInRow);
    newArr[i] = [];
    newArr[i][0] = arr[i][0];
    for (let j = 1; j < arr.length; j++) {
      // 如果当前数字小于前面两个或以上数字，则将该元素所在位置设为0.
      let k = 0;
      let lessThan = 0;
      while (arr[i][j - 1 - k] && j - 1 - k >= 0) {
        if (arr[i][j] < arr[i][j - 1 - k]) {
          lessThan++;
        }
        k++;
      }
      newArr[i][j] = lessThan >= 2 ? 0 : arr[i][j];
    }
  }
  return newArr;
};

const markHiddenX = (arr) => {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr[i] = [];
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
const markHidden = (arr) => {
  console.log(arr);
  const arrLength = arr.length;
  const newArr = [];
  for (let i = 0; i < arrLength; i++) {
    let maxInRow = arr[i][0]; // 保存一行中最大的数字
    // let maxInRowIndex = 0; //  保存一行中最大数字的index
    // let hasMultipleHigh = false; // 一行中是否有多个最大值
    // e.g. [9, 3, 2, 5] => false, [8, 8, 3, 5] => true
    newArr[i] = [];
    for (let j = 0; j < arrLength; j++) {
      if (arr[i][j] >= maxInRow) {
        maxInRow = arr[i][j];
        // maxInRowIndex = j;
        newArr[i][j] = { number: arr[i][j], hidden: false, solid: false };
      } else {
        newArr[i][j] = {
          number: arr[i][j],
          hidden: true,
          hiddenNumber: arr[i][j],
          solid: false,
        };
      }
    }
    // console.log(maxInRowIndex);
    // for (let j = 0; j < arrLength; j++) {
    //   // 判断是否有多个最大值
    //   if (arr[i][j] === maxInRow && j !== maxInRowIndex) {
    //     hasMultipleHigh = true;
    //   }
    // }
    // if (hasMultipleHigh) {
    //   // 如果有多个最大值，则将这些最大值的solid 标记为true
    //   for (let j = 0; j < arrLength; j++) {
    //     if (arr[i][j] === maxInRow) {
    //       newArr[i][j].solid = true;
    //     }
    //   }
    // }
    // newArr[i] = filterDuplicateElement(newArr[i]); // Remove duplicate element
  }
  console.log(newArr);
  return newArr;
};

const markSolidInRow = (arr) => {
  const arrLength = arr.length;
  // let indexBegin = 0;
  let indexEnd = 1;
  while (indexEnd <= arrLength) {
    let maxInRow = arr[0].number; // 保存一行中最大的数字
    let maxInRowIndex = 0; //  保存一行中最大数字的index
    let hasMultipleHigh = false; // 一行中是否有多个最大值
    for (let j = 0; j < indexEnd; j++) {
      // 找到一行中的最大值。
      if (arr[j].number >= maxInRow) {
        maxInRow = arr[j].number;
        maxInRowIndex = j;
      }
    }
    // console.log(maxInRow, maxInRowIndex);
    for (let j = 0; j < indexEnd; j++) {
      // 判断一行中是否有多个最大值
      if (arr[j].number == maxInRow && j < maxInRowIndex) {
        maxInRowIndex = j;
        hasMultipleHigh = true;
      }
    }
    // console.log(hasMultipleHigh);
    if (hasMultipleHigh) {
      // arr[0].solid = true;
      // 如果有多个最大值，则将这些最大值的solid属性设为true
      for (let j = 0; j < indexEnd; j++) {
        if (arr[j].number === maxInRow) {
          arr[j].solid = true;
        }
      }
    }
    indexEnd++;
  }

  return arr;
};

const markSolid = (arr) => {
  const arrLength = arr.length;
  // const newArr = [];
  for (let i = 0; i < arrLength; i++) {
    // let maxInRow = arr[i][0].number; // 保存一行中最大的数字
    // let maxInRowIndex = 0; //  保存一行中最大数字的index
    // for (let j = arrLength - 1; j >= 0; j--) {
    //   if (arr[i][j].number >= maxInRow) {
    //     maxInRow = arr[i][j].number;
    //     maxInRowIndex = j;
    //   }
    // }
    // console.log(maxInRow, maxInRowIndex);
    markSolidInRow(arr[i]);
  }
  return arr;
};

/** Filter Duplicate element in an array
 */
const filterDuplicateElement = (arr) => {
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
const fillArray = (arr) => {
  const newArr = new Array(arr[0]);
  let k = arr[0];
  let currentNum = arr[0];

  for (let i = 0; i < arr[0]; i++) {
    if (arr.indexOf(k) === -1) {
      newArr[i] = {
        number: currentNum,
        noDisplay: true,
      };
    } else {
      currentNum = k;
      newArr[i] = {
        number: currentNum,
        noDisplay: false,
      };
    }
    k--;
  }
  return newArr;
};

/** Fill array, same functions as the above but it is for view array with x-ray */
const fillArrayX = (arr) => {
  // console.log(arr);
  // console.log(arr[0].number);

  const newArr = new Array(arr[0].number);
  const first = arr[0]; // first是arr中第一个也是number最大的一个元素
  let setSolid = false; // Boolean
  // if (first.solid) {
  //   setSolid = true;
  // } else {
  //   setSolid = false;
  // }

  let k = arr[0].number;
  let currentNum = arr[0].number;
  for (let i = 0; i < newArr.length; i++) {
    let index = arr.findIndex((el) => {
      return el.number === k;
    });
    if (index === -1) {
      // fill with null number
      console.log(setSolid);
      newArr[i] = {
        number: null,
        hidden: false,
        solid: setSolid ? true : false,
      };
    } else {
      newArr[i] = arr[index];
      currentNum = arr[index].number;
      if (arr[index].solid) {
        setSolid = true;
      } else {
        setSolid = false;
      }
      // if (setSolid && index > 0) {
      //   setSolid = false;
      // }
    }
    k--;
  }
  return newArr;
};

const setArrayX = (arr) => {
  let newArr = arr.concat();
  for (let i = 0; i < newArr.length; i++) {
    const oneArr = newArr[i];
    let currentNumber = oneArr[0].number;
    let currentHiddenNumber = null;
    for (let j = 0; j < oneArr.length; j++) {
      const item = oneArr[j];
      if (j === 0) {
        newArr[i][j].noDisplay = false;
        newArr[i][j].hiddenNumber = null;
        continue;
      }

      if (item.number) {
        newArr[i][j].noDisplay = false;
        if (item.hidden) {
          newArr[i][j].number = currentNumber;
          newArr[i][j].noDisplay = true;
        }

        currentNumber = item.number;
      } else {
        newArr[i][j].noDisplay = true;
        newArr[i][j].number = currentNumber;
      }

      if (item.hiddenNumber && item.hiddenNumber !== currentHiddenNumber) {
        currentHiddenNumber = item.hiddenNumber;
        newArr[i][j].noDisplayHiddenNumber = false;
        // newArr[i][j].hidden = true;
      } else {
        newArr[i][j].hiddenNumber = currentHiddenNumber;
        newArr[i][j].noDisplayHiddenNumber = true;
        // newArr[i][j].hidden = true;
      }
    }
  }
  return newArr;
};
