const RATIO = 1.1; // The ratio of height/width

/**
 * Get the board's whole height
 * @param {number} maxWidth
 * @param {number} rows
 * @param {number} columns
 */
export const getBoardHeight = (maxWidth, rows, columns) => {
  const width = maxWidth / columns;
  const height = width * RATIO;
  return height * rows;
};

/**
 * Create a board
 * @param {number} maxWidth: the whole width of canvas area
 * @param {number} rows: how many rows of the board
 * @param {number} columns: how many columns of the board
 */
export const createBoard = (
  maxWidth,
  rows,
  columns /* , snakes, ladders */
) => {
  const board = [];
  const width = maxWidth / columns; // Width of a single block
  const height = width * RATIO; // height of a single block
  const maxHeight = getBoardHeight(maxWidth, rows, columns); // Height of board
  for (let r = 1; r <= rows; r++) {
    if (r % 2 === 1) {
      // 奇数行 odd number-th rows
      for (let c = 1; c <= columns; c++) {
        const startX = width * (c - 1);
        const startY = maxHeight - height * r;
        board.push({
          rect: {
            x: startX,
            y: startY,
            width,
            height
          },
          number: {
            x: startX + width / 2 - 9,
            y: startY + height / 8,
            value: (r - 1) * columns + c
          }
        });
      }
    }
    if (r % 2 === 0) {
      // 偶数行 even number-th rows
      for (let c = columns; c >= 1; c--) {
        const startX = width * (c - 1);
        const startY = maxHeight - height * r;
        board.push({
          rect: {
            x: startX,
            y: startY,
            width,
            height
          },
          number: {
            x: startX + width / 2 - 9,
            y: startY + height / 8,
            value: (r - 1) * columns + (columns - c + 1)
          }
        });
      }
    }
  }
  return board;
};
