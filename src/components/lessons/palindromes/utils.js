import { legify } from "../../common/utils.js";

export const MESSAGE = {
  INPUT_PROMPT: `Enter a number (1 to ${legify(99999999999999)})`,
  CONFIRM_PALINDROME: "The number entered is a palindrome",
  PALINDROME_FOUND: number => {
    return `Palindrome found in ${number} addition${number > 1 ? "s" : ""}`;
  },
  PALINDROME_NOT_FOUND: "Palindrome not found out of 175 additions",
  INPUT_FINISH_PROMPT: (start, finish) => {
    return `Enter a finish number (${start}-${finish})`;
  },
  FINISH: "Finished"
};

/**
 * Check the number provided is a palindrome
 * e.g. 234 => false, 23432 => true
 * @param {Number} number
 */
export const isPanlindrome = number => {
  return (
    String(number)
      .split("")
      .reverse()
      .join("") === String(number)
  );
};

/**
 * Get the corresponding reverse number:
 * e.g. 234 => 432,
 */
export const getReverse = number => {
  return String(number)
    .split("")
    .reverse()
    .join("");
};

/** Add two numbers especially for big numbers */
export const addTwoNumbers = (arg1, arg2) => {
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
