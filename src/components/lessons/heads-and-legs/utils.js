import { pickNumber } from "../../common/utils";

/**
 * Create a problem, return an object with
 * how many heads in total, how many pigs heads, how many chickens heads and how many legs
 * Pigs heads + chickens heads = heads in total
 * @param {Number} min the minimum number of animals
 * @param {Number} max ths maximum number of animals
 */
export const generateProblem = (min, max) => {
  const animals = pickNumber(min, max);
  const pigs = pickNumber(0, animals);
  const chickens = animals - pigs;
  return {
    heads: animals,
    pigsHeads: pigs,
    chickensHeads: chickens,
    legs: 4 * pigs + 2 * chickens
  };
};
