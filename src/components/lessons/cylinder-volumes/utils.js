/**
 * Given circumference, calculate radius
 * 给定圆的周长，计算半径
 * @param {Number} circumference 圆周长
 * @param {Number} floating 保留的小数点后几位，默认6位
 */
export const calculateRadius = (circumference, floating = 6) => {
  return Number((circumference / Math.PI / 2).toFixed(floating));
};

/**
 * Given radius, calculate the area of circle
 * 给定半径，计算圆面积
 * @param {Number} radius 圆半径
 * @param {Number} floating 保留小数点后几位，默认6位
 */
export const calculateArea = (radius, floating = 6) => {
  return Number((Math.PI * radius * radius).toFixed(floating));
};

/**
 * Calculate volumne of cylinder
 * 计算圆柱体体积
 * @param {Number} area
 * @param {Number} height
 * @param {Number} floating
 */
export const calculateVolumne = (area, height, floating = 6) => {
  return Number((area * height).toFixed(floating));
};
