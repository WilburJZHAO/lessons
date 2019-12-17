/** Add two numbers especially for big numbers */
const addTwoNumbers = (arg1, arg2) => {
  if (typeof arg1 === "number") arg1 = String(arg1);
  if (typeof arg2 === "number") arg2 = String(arg2);
  var sum = "";
  var r = 0;
  var a1, a2, i;

  // Pick the shortest string as first parameter and the longest as second parameter in my algorithm
  if (arg1.length < arg2.length) {
    a1 = arg1;
    a2 = arg2;
  } else {
    a1 = arg2;
    a2 = arg1;
  }
  a1 = a1.split("").reverse();
  a2 = a2.split("").reverse();

  // Sum a1 and a2 digits
  for (i = 0; i < a2.length; i++) {
    var t = (i < a1.length ? parseInt(a1[i]) : 0) + parseInt(a2[i]) + r;

    sum += t % 10;

    r = t < 10 ? 0 : Math.floor(t / 10);
  }
  // Append the last remain
  if (r > 0) sum += r;

  sum = sum.split("").reverse();

  // Trim the leading "0"
  while (sum[0] == "0") sum.shift();

  return sum.length > 0 ? sum.join("") : "0";
};

/**
 * @param {number} number
 * @return {number}
 */
export const integerPartition = number => {
  // Create partition matrix for solving this task using Dynamic Programming.
  const partitionMatrix = Array(number + 1)
    .fill(null)
    .map(() => {
      return Array(number + 1).fill(null);
    });

  // Fill partition matrix with initial values.

  // Let's fill the first row that represents how many ways we would have
  // to combine the numbers 1, 2, 3, ..., n with number 0. We would have zero
  // ways obviously since with zero number we may form only zero.
  for (let numberIndex = 1; numberIndex <= number; numberIndex += 1) {
    partitionMatrix[0][numberIndex] = "0";
  }

  // Let's fill the first column. It represents the number of ways we can form
  // number zero out of numbers 0, 0 and 1, 0 and 1 and 2, 0 and 1 and 2 and 3, ...
  // Obviously there is only one way we could form number 0
  // and it is with number 0 itself.
  for (let summandIndex = 0; summandIndex <= number; summandIndex += 1) {
    partitionMatrix[summandIndex][0] = "1";
  }

  // Now let's go through other possible options of how we could form number m out of
  // summands 0, 1, ..., m using Dynamic Programming approach.
  for (let summandIndex = 1; summandIndex <= number; summandIndex += 1) {
    for (let numberIndex = 1; numberIndex <= number; numberIndex += 1) {
      if (summandIndex > numberIndex) {
        // If summand number is bigger then current number itself then just it won't add
        // any new ways of forming the number. Thus we may just copy the number from row above.
        partitionMatrix[summandIndex][numberIndex] =
          partitionMatrix[summandIndex - 1][numberIndex];
      } else {
        /*
         * The number of combinations would equal to number of combinations of forming the same
         * number but WITHOUT current summand number PLUS number of combinations of forming the
         * <current number - current summand> number but WITH current summand.
         *
         * Example:
         * Number of ways to form 5 using summands {0, 1, 2} would equal the SUM of:
         * - number of ways to form 5 using summands {0, 1} (we've excluded summand 2)
         * - number of ways to form 3 (because 5 - 2 = 3) using summands {0, 1, 2}
         * (we've included summand 2)
         */
        const combosWithoutSummand =
          partitionMatrix[summandIndex - 1][numberIndex];
        const combosWithSummand =
          partitionMatrix[summandIndex][numberIndex - summandIndex];

        partitionMatrix[summandIndex][numberIndex] = addTwoNumbers(
          combosWithoutSummand,
          combosWithSummand
        );
      }
    }
  }
  // return partitionMatrix;

  // console.log(partitionMatrix); //eslint-disable-line no-console
  return partitionMatrix[number][number];
};

/**
 * Generate a list of number partitions and run function for each partition.
 * @param {number} n
 * @param {function} fn
 */
export const partition = (n, fn) => {
  // An array to store one partition
  let p = new Array();

  // index of last element in a partition
  let k = 0;

  // Initialize first partition as number itself
  p[k] = n;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    let rem_val = 0;
    while (k >= 0 && p[k] == 1) {
      rem_val += p[k];
      k--;
    }

    if (k < 0) {
      return;
    }
    p[k]--;
    rem_val++;

    while (rem_val > p[k]) {
      p[k + 1] = p[k];
      rem_val = rem_val - p[k];
      k++;
    }

    p[k + 1] = rem_val;
    k++;
    fn(p);
  }
};

/**
 * Separate number digits by blanks.
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
 * Sum up all the numbers in an array
 * @param {Array} arr
 */
export const sumArray = arr => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};
