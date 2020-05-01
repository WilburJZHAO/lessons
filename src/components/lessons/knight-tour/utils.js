export const STRATEGY = {
  R: "random",
  B: "border",
  BC: "border/corner",
  Q: "quarter",
  QC: "quarter/corner",
  BF: "best first",
  WF: "worst first",
};

export const TOUR_STATUS = {
  RUNNING: "running",
  CLOSED: "closed",
  OPEN: "open",
};

export class KnightTour {
  /** constructor: create board, solution board and set up starting point */
  constructor(strategy = STRATEGY.R, lookAhead = false) {
    this.N = 8; // The board with N x N, 8 by default.
    this.board = new Array(this.N); // A two-dementional array to represent a board
    this.solution = new Array(this.N); // A two-dementional array to represent a solution
    this.currentPos = ""; // A string of two digit-number to represent which square the knight is currently at
    this.step = 0; // How many steps are moved
    this.strategy = strategy; // Strategy used in knight tour
    this.lookAhead = lookAhead; // If knight will look one move ahead for a dead end
    this.nextPos = []; // Next positions/squares knight can go to
    this.nextPosMark = []; // How many squares for each square in nextPos to go
    // e.g. this.nextPos = ['62', '52'] and this.nextPosMark = [3 , 5]:
    // it means knight has 3 squares to go if it is at square '62'
    // and knight has 5 squares to go if it is at square '52'
    this.CORNERS = ["00", "07", "70", "77"]; // Four squares on the corner
    this.quarter1 = [];
    this.quarter2 = [];
    this.quarter3 = [];
    this.quarter4 = [];

    // It uses a unique two-digit number to represent a square on board
    for (let i = 0; i < this.N; i++) {
      // Create a N x N board(N = 8)
      this.board[i] = [];
      for (let j = 0; j < this.N; j++) {
        this.board[i][j] = `${i}${j}`;
      }
    }
    // After it, this.board would equal to:
    /**
     * [['00','01','02','03','04','05','06','07'],
     *  ['10','11','12','13','14','15','16','17'],
     *  ['20','21','22','23','24','25','26','27'],
     *  ['30','31','32','33','34','35','36','37'],
     *  ['40','41','42','43','44','45','46','47'],
     *  ['50','51','52','53','54','55','56','57'],
     *  ['60','61','62','63','64','65','66','67'],
     *  ['70','71','72','73','74','75','76','77']]
     * Each element represents the row and column of a square on a board
     */

    /** Get the squares for each quarter */
    for (let i = 0; i < this.N / 2; i++) {
      for (let j = 0; j < this.N / 2; j++) {
        this.quarter1.push(`${i}${j}`);
        this.quarter2.push(`${i}${j + this.N / 2}`);
        this.quarter3.push(`${i + this.N / 2}${j}`);
        this.quarter4.push(`${i + this.N / 2}${j + this.N / 2}`);
      }
    }

    // this.solution is also a N x N array, fill the array with 0 initially
    for (let i = 0; i < this.N; i++) {
      this.solution[i] = [];
      for (let j = 0; j < this.N; j++) {
        this.solution[i][j] = 0;
      }
    }
    /**
     * After it, this.solution woule equal to:
     * /**
     * [[0,0,0,0,0,0,0,0],
     *  [0,0,0,0,0,0,0,0],
     *  [0,0,0,0,0,0,0,0],
     *  [0,0,0,0,0,0,0,0],
     *  [0,0,0,0,0,0,0,0],
     *  [0,0,0,0,0,0,0,0],
     *  [0,0,0,0,0,0,0,0],
     *  [0,0,0,0,0,0,0,0]]
     */

    this.moveTo("71"); // Starting square
    this.nextPos = this.getNextMove();
  }

  /** Move the knight to a new square
   * pos: a string of two-digit number to represent a square on board e.g. '12'
   * If the square to move is available, set this.solution and return true, otherwise return false.
   */
  moveTo(pStr) {
    const [r, c] = this.convertPosToArr(pStr);
    if (this.solution[r][c]) {
      return false;
    }
    this.step++;
    this.currentPos = pStr;
    this.solution[r][c] = this.step;
    return true;
  }

  /** Check if the position(pArr argument) is valid for knight to go
   * If the position is on the board and not occupied, return true
   * Otherwise, return false
   * e.g. [3, 2] && this.solution[3][2] === 0 => true, [-1, 2] => false(-1 is not a valid number),
   * [3 ,2] && this.solution[3][2] !== 0 => false(This position is occupied, You can not move the knight to this position again)
   */
  isPosAvailable(pArr) {
    const [r, c] = pArr;
    if (
      r >= 0 &&
      r < this.N &&
      c >= 0 &&
      c < this.N &&
      this.solution[r][c] === 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Get all possible next square(s) knight can go
   * @param {string} pStr A string representing the square knight is at, e.g. '63', '71'...
   * @returns {Array} An array of strings that represent the square knight can go
   */
  getNextMoveR(pStr) {
    const [r, c] = this.convertPosToArr(pStr);
    const allNext = [
      [r + 1, c + 2],
      [r + 2, c + 1],
      [r + 2, c - 1],
      [r + 1, c - 2],
      [r - 1, c + 2],
      [r - 2, c + 1],
      [r - 2, c - 1],
      [r - 1, c - 2],
    ];
    return allNext
      .filter((el) => this.isPosAvailable(el) === true)
      .map((el) => el.join(""));
  }

  /**
   * Get all next square(s) knight can go under border strategy, i.e. knight should go to the border as fast as possible
   * @param {string} pStr A string representing the square knight is at, e.g. '63', '71'...
   * @returns {Array} An array of strings that represent the square knight can go
   */
  getNextMoveB(pStr) {
    const allNext = this.getNextMoveR(pStr);
    if (allNext.length === 0) {
      return [];
    }
    // console.log(allNext);
    const [r, c] = this.convertPosToArr(pStr);
    const closestBorderRow = r < this.N / 2 ? 0 : this.N - 1;
    const closestBorderCol = c < this.N / 2 ? 0 : this.N - 1;
    // Calculate which border is closest to the knight
    // If knight is currently at '71'(the value of pStr),
    // closestBorderRow is 7(the bottom border), closestBorderCol is 0(the left border)
    let [closestRow, closestCol] = this.convertPosToArr(allNext[0]);
    let distanceToClosestBorderRow = Math.abs(closestBorderRow - closestRow); // How many squares does the knight have to its closest horizontal border
    let distanceToClosestBorderCol = Math.abs(closestBorderCol - closestCol); // How many squares does the knight have to its closest vertical border

    for (let i = 0; i < allNext.length; i++) {
      const [r, c] = this.convertPosToArr(allNext[i]);
      if (Math.abs(closestBorderRow - r) < distanceToClosestBorderRow) {
        closestRow = r;
        distanceToClosestBorderRow = Math.abs(closestBorderRow - r);
      }
      if (Math.abs(closestBorderCol - c) < distanceToClosestBorderCol) {
        closestCol = c;
        distanceToClosestBorderCol = Math.abs(closestBorderCol - c);
      }
    }
    // console.log(closestRow, closestCol);
    const allNextBorder = allNext.filter((el) => {
      // Filter out the squares that are nearest to borders.
      const [r, c] = this.convertPosToArr(el);
      if (r === closestRow && c === closestCol) {
        //console.log("1");
        return true;
      } else if (r === closestRow && c !== closestCol && (r <= 1 || r >= 6)) {
        //console.log("2");
        return true;
      } else if (r !== closestRow && c === closestCol && (c <= 1 || c >= 6)) {
        //console.log("3");
        return true;
      } else {
        return false;
      }
    });
    //console.log(allNextBorder);
    if (allNextBorder.length > 0) {
      return allNextBorder;
    } else {
      return allNext.filter((el) => {
        const [r, c] = this.convertPosToArr(el);
        return r === closestRow || c === closestCol;
      });
    }
  }

  /**
   * Get all next square(s) knight can go under border/corner strategy
   * It has the same rule as border strategy plus it must go to the corner square first if possible
   * @param {string} pStr A string representing the square knight is at, e.g. '63', '71'...
   * @returns {Array} An array of strings that represent the square knight can go
   */
  getNextMoveBC(pStr) {
    const allNextB = this.getNextMoveB(pStr);
    const nextCorner = [];
    this.CORNERS.forEach((corner) => {
      // See if there is a corner to go.
      if (allNextB.indexOf(corner) >= 0) {
        nextCorner.push(corner);
      }
    });
    // console.log(nextCorner);
    if (nextCorner.length > 0) {
      return nextCorner;
    } else {
      return allNextB;
    }
  }

  /**
   * Get all next square(s) knight can go under quarter strategy
   * @param {string} pStr A string representing the square knight is at, e.g. '63', '71'...
   * @returns {Array} An array of strings that represent the square knight can go
   */
  getNextMoveQ(pStr) {
    const allNext = this.getNextMoveR(pStr);
    if (allNext.length === 0) {
      return [];
    }
    const quarter = this.getQuarter(pStr);
    let allNextInQuarter;
    switch (quarter) {
      case 1:
        allNextInQuarter = allNext.filter(
          (next) => this.quarter1.indexOf(next) >= 0
        );
        break;
      case 2:
        allNextInQuarter = allNext.filter(
          (next) => this.quarter2.indexOf(next) >= 0
        );
        break;
      case 3:
        allNextInQuarter = allNext.filter(
          (next) => this.quarter3.indexOf(next) >= 0
        );
        break;
      case 4:
        allNextInQuarter = allNext.filter(
          (next) => this.quarter4.indexOf(next) >= 0
        );
        break;
      default:
        allNextInQuarter = [];
    }
    if (allNextInQuarter.length > 0) {
      return allNextInQuarter;
    } else {
      return allNext;
    }
  }

  /**
   * Get all next square(s) knight can go under quarter/corner strategy
   * It has the same rule as quarter strategy plus it must go to the corner square first if possible
   * @param {string} pStr A string representing the square knight is at, e.g. '63', '71'...
   * @returns {Array} An array of strings that represent the square knight can go
   */
  getNextMoveQC(pStr) {
    const allNextQ = this.getNextMoveQ(pStr);
    const nextCorner = [];
    this.CORNERS.forEach((corner) => {
      // See if there is a corner to go.
      if (allNextQ.indexOf(corner) >= 0) {
        nextCorner.push(corner);
      }
    });
    // console.log(nextCorner);
    if (nextCorner.length > 0) {
      return nextCorner;
    } else {
      return allNextQ;
    }
  }

  /**
   * Helper function for 'Best first strategy' and 'Worst first strategy'
   * All the same functions as getNextMoveR() plus, record the number of squares knight can go
   * For example, if this.nextPos = ['63', '52', '50'] , the function will set this.nextPosMark as [5, 7, 3],
   * which means for square 63, knight has five squares to go; for square 52, has 7; for squre 50, has 3
   * @param {string} pStr A string representing the square knight is at, e.g. '63', '71'...
   * @returns {Array} An array of strings that represent the square knight can go
   */
  getNextMoveWithMark(pStr) {
    const allNext = this.getNextMoveR(pStr);
    this.nextPosMark = [];
    allNext.forEach((next) => {
      const nextNext = this.getNextMoveR(next);
      // console.log(nextNext);
      this.nextPosMark.push(nextNext.length);
    });
    return allNext;
  }

  getNextMove(pStr) {
    switch (this.strategy) {
      case STRATEGY.R:
        return this.getNextMoveR(pStr || this.currentPos);
      case STRATEGY.BF:
        return this.getNextMoveWithMark(pStr || this.currentPos);
      case STRATEGY.WF:
        return this.getNextMoveWithMark(pStr || this.currentPos);
      case STRATEGY.B:
        return this.getNextMoveB(pStr || this.currentPos);
      case STRATEGY.BC:
        return this.getNextMoveBC(pStr || this.currentPos);
      case STRATEGY.Q:
        return this.getNextMoveQ(pStr || this.currentPos);
      case STRATEGY.QC:
        return this.getNextMoveQC(pStr || this.currentPos);
      default:
        return [];
    }
  }

  /** Move one step back */
  moveBack() {
    if (this.step <= 1) {
      return;
    }
    const [r, c] = this.convertPosToArr(this.currentPos);
    this.solution[r][c] = 0;
    // const prevStep = this.step - 1;
    // console.log(prevStep);
    this.currentPos = this.prevPosition;
    this.nextPos = this.getNextMove();
    this.step--;

    // this.getNextMove();
  }

  /** Move one step forward */
  moveForward() {
    if (this.status !== TOUR_STATUS.RUNNING) {
      return;
    }
    // const nextPosLookAhead = [];
    // if (this.lookAhead) {
    //   // Look at the position at this.nextPos, and check if there is next position available for each.
    //   this.nextPos.forEach((pos) => {
    //     const aheadPos = this.getNextMove(pos);
    //     if (aheadPos.length > 0) nextPosLookAhead.push(pos);
    //   });
    // }
    let posToGo;
    if (this.strategy === STRATEGY.BF) {
      // Best first strategy
      // Look at this.nextPosMark array, and choose the square with the hightest number
      // If there is multiple squares with highest number, randomly choose one of them
      let bestIndex = 0;
      let best = this.nextPosMark[bestIndex];
      const allBest = [];
      for (let i = 0; i <= this.nextPosMark.length; i++) {
        if (this.nextPosMark[i] > best) {
          best = this.nextPosMark[i];
          bestIndex = i;
        }
      }
      for (let i = 0; i <= this.nextPosMark.length; i++) {
        if (this.nextPosMark[i] === best) {
          allBest.push(this.nextPos[i]);
        }
      }
      posToGo = allBest[this.pickNumber(0, allBest.length - 1)];
    } else if (this.strategy === STRATEGY.WF) {
      // Worst first strategy
      // Look at this.nextPosMark array, and choose the square with the lowest number
      // If there is multiple squares with lowest number, randomly choose one of them
      let worstIndex = 0;
      let worst = this.nextPosMark[worstIndex];
      const allWorst = [];
      for (let i = 0; i <= this.nextPosMark.length; i++) {
        if (this.nextPosMark[i] < worst) {
          worst = this.nextPosMark[i];
          worstIndex = i;
        }
      }
      for (let i = 0; i <= this.nextPosMark.length; i++) {
        if (this.nextPosMark[i] === worst) {
          allWorst.push(this.nextPos[i]);
        }
      }
      posToGo = allWorst[this.pickNumber(0, allWorst.length - 1)];
    } else {
      // Strategies other than 'best first' and 'worst first'
      if (!this.lookAhead) {
        // If 'look ahead one move for dead end' is not ticked
        posToGo = this.nextPos[this.pickNumber(0, this.nextPos.length - 1)];
      } else if (this.nextPosLookAhead.length > 0) {
        // If 'look ahead one move for dead end' is ticked
        // Knight must go to the square that will not lead to a dead end.
        posToGo = this.nextPosLookAhead[
          this.pickNumber(0, this.nextPosLookAhead.length - 1)
        ];
      } else if (this.nextPosLookAhead.length === 0) {
        // If 'look ahead one move for dead end' is ticked AND there is no 'live' square for this strategy,
        // Look for any other possible squares
        //console.log(this.prevPosition);
        this.nextPos = this.getNextMoveR(this.currentPos);
        posToGo = this.nextPos[this.pickNumber(0, this.nextPos.length - 1)];
      }
      // posToGo =
      //   this.nextPosLookAhead.length > 0
      //     ? this.nextPosLookAhead[
      //         this.pickNumber(0, this.nextPosLookAhead.length - 1)
      //       ]
      //     : this.nextPos[this.pickNumber(0, this.nextPos.length - 1)];
    }
    // console.log(posToGo);
    // const [r, c] = this.convertPosToArr(posToGo);
    // this.currentPos = posToGo;

    // this.step++;
    // this.solution[r][c] = this.step;
    this.moveTo(posToGo);
    this.nextPos = this.getNextMove();
  }

  /**
   * Move forward with solution
   * If solution is provided, move one step forward based on the solution
   * @param {string} solutionArr an array from solutionArr that represents a solution
   * */
  moveForwardWithSolution(solutionArr) {
    if (!solutionArr) {
      return;
    }

    if (this.status !== TOUR_STATUS.RUNNING) {
      return;
    }
    // console.log(solutionArr);
    const posToGo = solutionArr[this.step];
    const [r, c] = this.convertPosToArr(posToGo);
    this.currentPos = posToGo;
    this.step++;
    this.solution[r][c] = this.step;
    this.nextPos = this.getNextMove();
  }

  /**
   * Given a string-represented position, check if knight can move to this position
   * @param {string} pStr
   * @returns {boolean}
   */
  canMove(pStr) {
    return this.nextPos.indexOf(pStr) >= 0;
  }

  /**
   * Get the tour status
   */
  getTourStatus() {
    if (this.nextPos.length > 0) {
      return TOUR_STATUS.RUNNING;
    }
    if (this.nextPos.length === 0 && this.step === this.N * this.N) {
      return TOUR_STATUS.CLOSED;
    }
    if (this.nextPos.length === 0 && this.step < this.N * this.N) {
      return TOUR_STATUS.OPEN;
    }
  }

  get status() {
    return this.getTourStatus();
  }

  /**
   * this.solution is an array, this function converts it to a string to represent the same solution
   */
  get solutionStr() {
    if (this.status !== TOUR_STATUS.CLOSED) {
      return "";
    }
    const arr = new Array(this.N * this.N);
    for (let i = 0; i < this.solution.length; i++) {
      for (let j = 0; j < this.solution[i].length; j++) {
        const el = this.solution[i][j];
        arr[el - 1] = `${i}${j}`;
      }
    }
    return arr.join(",");
  }

  /**
   * Check if the solution is an re-entrant
   */
  get isReEntrants() {
    if (this.status !== TOUR_STATUS.CLOSED) {
      return false;
    }
    const solutionArr = this.solutionStr.split(",");
    const firstStep = solutionArr[0];
    const lastStep = solutionArr[solutionArr.length - 1];
    const [firstStepR, firstStepC] = this.convertPosToArr(firstStep);
    const [lastStepR, lastStepC] = this.convertPosToArr(lastStep);
    if (
      (Math.abs(firstStepR - lastStepR) === 1 &&
        Math.abs(firstStepC - lastStepC) === 2) ||
      (Math.abs(firstStepR - lastStepR) === 2 &&
        Math.abs(firstStepC - lastStepC) === 1)
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Get the previous square.
   */
  get prevPosition() {
    if (this.step === 1) {
      return "";
    }
    const prevStep = this.step - 1;
    for (let i = 0; i < this.N; i++) {
      for (let j = 0; j < this.N; j++) {
        if (this.solution[i][j] === prevStep) {
          // console.log(i, j);
          return `${i}${j}`;
        }
      }
    }
  }

  /**
   * Get 'live' squares, i.e. Look at all possible squares knight can go to and filter out the squares
   * that will lead to a dead end.
   */
  get nextPosLookAhead() {
    const aheadArr = [];
    this.nextPos.forEach((pos) => {
      const aheadPos = this.getNextMove(pos);
      if (aheadPos.length > 0) aheadArr.push(pos);
    });
    return aheadArr;
  }

  /** Change the pos that is represented by two-digit string to an array
   * e.g. pStr = '71' => [7, 1]
   */
  convertPosToArr(pStr) {
    return [Number(pStr[0]), Number(pStr[1])];
  }

  /**
   * Change the pos that is represented by an array  to a string
   * e.g. pArr = [7, 1] => '71'
   */
  convertPosToStr(pArr) {
    return `${pArr[0]}${pArr[1]}`;
  }

  /**
   * Given a square, decide which quarter it belongs to
   */
  getQuarter(pStr) {
    const [r, c] = this.convertPosToArr(pStr);
    if (r >= 0 && r < this.N / 2 && c >= 0 && c < this.N / 2) {
      return 1;
    }
    if (r >= 0 && r < this.N / 2 && c >= this.N / 2 && c < this.N) {
      return 2;
    }
    if (r >= this.N / 2 && r < this.N && c >= 0 && c < this.N / 2) {
      return 3;
    }
    if (r >= this.N / 2 && r < this.N && c >= this.N / 2 && c < this.N) {
      return 4;
    }
  }

  /**
   * Pick a number between min(inclusive) and max(inclusive) randomly
   * @param {number} min
   * @param {number} max
   * @return {number} a random number
   */
  pickNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// const tour = new KnightTour();
// console.log(tour);
// tour.moveTo("11");
// console.log(tour);
// tour.getNextMove(tour.currentPos);
// console.log(tour);
