//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
export const accAdd = (arg1, arg2) => {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
};

/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
export const accSub = (arg1, arg2) => {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
};

/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
export const accMul = (arg1, arg2) => {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {
    m = 0;
  }
  try {
    m += s2.split(".")[1].length;
  } catch (e) {
    m = 0;
  }
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
};

/**
 * 计算并返回一个数字小数点后面的位数，如果是整数，则返回0
 * @param Number num
 * @return Number
 */
export const calDecimal = num => {
  if (!num) return 0;
  const decimal = num.toString().split(".")[1];
  if (!decimal) return 0;
  return decimal.length;
};

/**
 * Draw paper on canvas
 * @param Object canvas
 * @param Number the width of original paper
 * @param Number the length of original paper
 * @param Number square size to cut out
 * @param Number unit
 */
export const drawPaper = (canvas, width, length, squareSize, unit) => {
  if (!canvas || !canvas.getContext) {
    return null;
  }
  const ctx = canvas.getContext("2d");

  ctx.beginPath(); // Draw background color
  ctx.fillStyle = "#D1DEDD";
  ctx.fillRect(15, 15, width * unit, length * unit);
  if (squareSize) {
    ctx.beginPath();
    ctx.fillStyle = "#ADC4C2";
    ctx.fillRect(
      15 + squareSize * unit,
      15 + squareSize * unit,
      (width - 2 * squareSize) * unit,
      (length - 2 * squareSize) * unit
    );
  }

  ctx.beginPath();
  ctx.strokeStyle = "red";
  for (let i = 0; i <= width; i++) {
    // Draw grid on Y direction
    // console.log(i);
    ctx.moveTo(15 + i * unit, 15);
    ctx.lineTo(15 + i * unit, 15 + unit * length);
    ctx.stroke();
  }
  for (let i = 0; i <= length; i++) {
    // Draw grid on X direction
    ctx.moveTo(15, 15 + i * unit);
    ctx.lineTo(15 + unit * width, 15 + i * unit);
    ctx.stroke();
  }

  ctx.beginPath(); // Draw the size of paper
  ctx.fillStyle = "blue";
  ctx.font = "14px";
  ctx.fillText(width, 15 + (width * unit) / 2 - 5, 10);
  ctx.fillText(length, 2, 15 + (length * unit) / 2);

  if (squareSize) {
    // if squareSize is specified, cut out squares on four corners.

    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#f00";
    ctx.fillRect(15, 15, squareSize * unit, squareSize * unit);
    ctx.strokeRect(15, 15, squareSize * unit, squareSize * unit); // Cut out the square on up-left side
    ctx.fillRect(
      15 + (width - squareSize) * unit,
      15,
      squareSize * unit,
      squareSize * unit
    );
    ctx.strokeRect(
      15 + (width - squareSize) * unit,
      15,
      squareSize * unit,
      squareSize * unit
    ); // Cut out the square on up-rifht side
    ctx.fillRect(
      15,
      15 + (length - squareSize) * unit,
      squareSize * unit,
      squareSize * unit
    );
    ctx.strokeRect(
      15,
      15 + (length - squareSize) * unit,
      squareSize * unit,
      squareSize * unit
    ); // Cut out the square on down-left side
    ctx.fillRect(
      15 + (width - squareSize) * unit,
      15 + (length - squareSize) * unit,
      squareSize * unit,
      squareSize * unit
    );
    ctx.strokeRect(
      15 + (width - squareSize) * unit,
      15 + (length - squareSize) * unit,
      squareSize * unit,
      squareSize * unit
    ); // Cut out the square on down-right side

    ctx.beginPath();
    ctx.strokeStyle = "#fff";
    ctx.moveTo(15, 15);
    ctx.lineTo(15, 15 + squareSize * unit);
    ctx.moveTo(15, 15);
    ctx.lineTo(15 + squareSize * unit, 15);
    //ctx.stroke();
    //ctx.stroke();		// Remove the line on up-left side

    ctx.moveTo(15 + (width - squareSize) * unit, 15);
    ctx.lineTo(15 + width * unit, 15);
    ctx.moveTo(15 + width * unit, 15);
    ctx.lineTo(15 + width * unit, 15 + squareSize * unit);
    //ctx.stroke();
    //ctx.stroke();	// Remove the line on up-right side

    ctx.moveTo(15, 15 + length * unit);
    ctx.lineTo(15, 15 + (length - squareSize) * unit);
    ctx.moveTo(15, 15 + length * unit);
    ctx.lineTo(15 + squareSize * unit, 15 + length * unit);
    //ctx.stroke();
    //ctx.stroke();	// Remove the line on down-left side

    ctx.moveTo(15 + width * unit, 15 + length * unit);
    ctx.lineTo(15 + width * unit, 15 + (length - squareSize) * unit);
    ctx.moveTo(15 + width * unit, 15 + length * unit);
    ctx.lineTo(15 + (width - squareSize) * unit, 15 + length * unit);
    ctx.stroke();
    ctx.stroke();

    ctx.beginPath(); // Draw the size of paper
    ctx.fillStyle = "blue";
    ctx.font = "14px";
    ctx.fillText(
      squareSize,
      10 + (squareSize * unit) / 2,
      15 + (squareSize * unit) / 2
    );
  }
};

/**
 * 在平面直角坐标系上
 * @param Object canvas
 * @param Array boxVolumeArr
 * @param Number biggestVolumeIndex
 * @param Number smallestVolumeIndex
 */
export const drawCoord = (
  canvas,
  boxVolumeArr,
  biggestVolumeIndex,
  smallestVolumeIndex
) => {
  // const biggestVolume = boxVolumeArr[biggestVolumeIndex].volume;
  const xOffset = 10;
  const xUnit = (270 - xOffset) / 10;
  const ctx = canvas.getContext("2d");
  const textOffset = 3;

  ctx.beginPath();
  ctx.strokeStyle = "#222";
  ctx.strokeRect(xOffset, 20, 270, 250);

  ctx.font = "16px sans-serif";
  // ctx.fillText('Vol', 2, 145);
  // ctx.fillText('Square length', 110, 298);	// Fill the text

  ctx.beginPath();
  ctx.strokeStyle = "blue";
  for (let i = xOffset; i <= 270; i += (270 - xOffset) / 10) {
    ctx.moveTo(i, 270);
    ctx.lineTo(i, 275);
    ctx.stroke();
  } // 画X轴的刻度

  ctx.beginPath();
  ctx.font = "16px sans-serif";
  ctx.fillText(boxVolumeArr[0].squareSize, xOffset - textOffset, 290);
  ctx.fillText(
    boxVolumeArr[boxVolumeArr.length - 1].squareSize,
    (boxVolumeArr.length - 1) * xUnit + xOffset - textOffset,
    290
  );

  // ctx.fillText(boxVolumeArr[smallestVolumeIndex].volume, 0, 280);	// 最小值在y轴上的刻度
  // ctx.fillText(boxVolumeArr[biggestVolumeIndex].volume, 0, 25);		// 最大值在y轴上的刻度

  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.strokeStyle = "red";
  ctx.fillText(
    boxVolumeArr[biggestVolumeIndex].squareSize,
    biggestVolumeIndex * xUnit + xOffset - textOffset,
    290
  ); // 最大值对应的square size
  ctx.fillText(
    boxVolumeArr[biggestVolumeIndex].volume,
    biggestVolumeIndex * xUnit + xOffset - textOffset,
    16
  ); // 最大volume值
  ctx.moveTo(biggestVolumeIndex * ((270 - xOffset) / 10) + xOffset, 270);
  ctx.lineTo(biggestVolumeIndex * ((270 - xOffset) / 10) + xOffset, 20);
  ctx.stroke();

  // 画在坐标上的每一个点，每个点对应一个box volume
  const biggestVolume = boxVolumeArr[biggestVolumeIndex].volume;
  const smallestVolume = boxVolumeArr[smallestVolumeIndex].volume;
  const yDiff = biggestVolume - smallestVolume; // Y轴上包含的数值
  for (let i = 0; i < boxVolumeArr.length; i++) {
    // console.log((boxVolumeArr[i].volume-smallestVolume) / yDiff);
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(
      ((270 - xOffset) / 10) * i + xOffset,
      270 - ((boxVolumeArr[i].volume - smallestVolume) / yDiff) * 250,
      4,
      0,
      Math.PI * 2,
      true
    );
    ctx.fill();
  }
};
