export const initInputData = {
  id: "",
  city: "",
  state: "",
  added: true,
  celcius: {
    max: ["", "", "", "", "", "", "", "", "", "", "", ""],
    min: ["", "", "", "", "", "", "", "", "", "", "", ""]
  },
  fahren: {
    max: ["", "", "", "", "", "", "", "", "", "", "", ""],
    min: ["", "", "", "", "", "", "", "", "", "", "", ""]
  },
  selected: false
};

/**
 * Convert celsius to fahrenheit
 */
export const cToF = celsius => {
  if (!celsius && celsius !== 0) return "";
  return Number(((celsius * 9) / 5 + 32).toFixed(1));
};

/**
 * Convert fahrenheit to celsius
 */
export const fToC = fah => {
  if (!fah && fah !== 0) return "";
  return Number((((fah - 32) * 5) / 9).toFixed(1));
};
