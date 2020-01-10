import { pickNumber } from "../../common/utils";

/**
 * Generate a rule based on level: 1, 2 or 3
 * @param {number} level
 */
export const generateRule = level => {
  let multiply, addition;
  let multiplySelection = [];
  let additionSelection = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
  switch (level) {
    case 1:
      multiplySelection = [1, 2, 3];
      break;
    case 2:
      multiplySelection = [-2, -1, 0, 1, 2, 3];
      break;
    case 3:
      multiplySelection = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3];
      break;
    default:
      return null;
  }

  multiply = multiplySelection[pickNumber(0, multiplySelection.length - 1)];
  addition = additionSelection[pickNumber(0, additionSelection.length - 1)];

  return {
    multiply,
    addition
  };
};

/**
 * Generate formation based on rule provided
 * e.g. rule = {multiply: 2, addition: 4},
 * the formation returned: y = 2x + 4
 * @param {Object} rule
 */
export const generateFormation = rule => {
  if (!rule) {
    return "";
  }
  if (rule.addition === 0) {
    return `y = ${rule.multiply}x`;
  } else if (rule.addition > 0) {
    return `y = ${rule.multiply}x + ${rule.addition}`;
  } else if (rule.addition < 0) {
    return `y = ${rule.multiply}x - ${Math.abs(rule.addition)}`;
  } else {
    return "";
  }
};

/**
 * Generate an array based on the rule, and leave blank randomly for user input
 * e.g.  rule = {multiply: 1, addition: 3},
 * ruleArray returned: [
 * {in:0, out: 3, hidden: null, check: false},
 * {in:1, out: 4, hidden: null, check: false},
 * {in:2, out: 5, hidden: null, check: false},
 * {in:3, out: 6, hidden: 'out', check: false},
 * {in:4, out: 7, hidden: 'in', check: false},
 * ... // ten in total
 * {in:37, out: 40, hidden: 'out', check: false},
 * ]
 * @param {Object} rule
 */
export const generateRuleArray = rule => {
  const ruleArray = [];
  let increment = 1;
  let inNumber = 0;
  for (let i = 1; i <= 10; i++) {
    if (i <= 4) {
      ruleArray.push({
        in: inNumber,
        out: inNumber * rule.multiply + rule.addition,
        blank: null,
        check: null
      });
      inNumber++;
    } else {
      ruleArray.push({
        in: inNumber,
        out: inNumber * rule.multiply + rule.addition,
        blank: Math.random() < 0.5 ? "in" : "out",
        check: null
      });
      increment = pickNumber(1, 9);
      inNumber += increment;
    }
  }
  return ruleArray;
};

/**
 * Generate human readable words based on the rule
 * e.g. rule = {multiply: 1, addition: 3},
 * Words returned: To find the out number, multiply the in number
 * by 1, then add 3
 * @param {Object} rule
 */
export const generateWords = rule => {
  if (!rule) {
    return "";
  }
  let operation = "";
  if (rule.addition < 0) {
    operation = "take";
  } else if (rule.addition > 0) {
    operation = "add";
  } else if (rule.addition === 0) {
    return `To find the Out number,
						multiply the In number by ${rule.multiply} `;
  }
  return `To find the Out number,
								multiply the In number by ${rule.multiply},
								then ${operation} ${Math.abs(rule.addition)} `;
};

/**
 * Remove the blanks within a string, replace '1x' with 'x' and convert to lower string
 * @param {string} str
 */
export const converStr = str => {
  let strNoBlank = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      strNoBlank += str[i];
    }
  }
  return strNoBlank.replace("1x", "x").toLowerCase();
};
