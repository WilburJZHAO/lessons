export const values = [5, 4, 3, 2, 1, 0.5, 0.2, 0.5, 1, 2, 3, 4, 5];

export const convertNodeId = id => {
  let nodeId;
  switch (id) {
    case 0:
      nodeId = 9;
      break;
    case 1:
      nodeId = 16;
      break;
    case 2:
      nodeId = 23;
      break;
    case 3:
      nodeId = 30;
      break;
    case 4:
      nodeId = 31;
      break;
    case 5:
      nodeId = 32;
      break;
    case 6:
      nodeId = 33;
      break;
    case 7:
      nodeId = 34;
      break;
    case 8:
      nodeId = 35;
      break;

    case 9:
      nodeId = 36;
      break;
    case 10:
      nodeId = 29;
      break;
    case 11:
      nodeId = 22;
      break;
    case 12:
      nodeId = 15;
      break;
    default:
      nodeId = -1;
  }
  return nodeId;
};

/**
 * Convert the id in map to id of values array
 * @param {number} nodeId
 */
export const convertValuesId = nodeId => {
  let id;
  switch (nodeId) {
    case 9:
      id = 0;
      break;
    case 16:
      id = 1;
      break;
    case 23:
      id = 2;
      break;
    case 30:
      id = 3;
      break;
    case 31:
      id = 4;
      break;
    case 32:
      id = 5;
      break;
    case 33:
      id = 6;
      break;
    case 34:
      id = 7;
      break;
    case 35:
      id = 8;
      break;
    case 36:
      id = 9;
      break;
    case 29:
      id = 10;
      break;
    case 22:
      id = 11;
      break;
    case 15:
      id = 12;
      break;
    default:
      id = -1;
      break;
  }
  return id;
};

/** An array that represents the rule
 * id: the index of array
 * dice property: the dice number you got
 * next property: which direction for the dice, 1 - left, 2 - forward/center, 3 - right
 */
export const rules = [
  {
    id: 0,
    dice: 2,
    next: 1
  },
  {
    id: 1,
    dice: 3,
    next: 1
  },
  {
    id: 2,
    dice: 4,
    next: 1
  },
  {
    id: 3,
    dice: 5,
    next: 1
  },
  {
    id: 4,
    dice: 6,
    next: 2
  },
  {
    id: 5,
    dice: 7,
    next: 2
  },
  {
    id: 6,
    dice: 8,
    next: 2
  },
  {
    id: 7,
    dice: 9,
    next: 3
  },
  {
    id: 8,
    dice: 10,
    next: 3
  },
  {
    id: 9,
    dice: 11,
    next: 3
  },
  {
    id: 10,
    dice: 12,
    next: 3
  }
];

/**
 * Create an array which represents the hexagon map
 * @param {number} width: the whole widht of canvas area
 * @param {array} values: an array of numbers to represent the value of each end point
 */
export const createMap = (width, values) => {
  const radius = width / 11;
  const height = (radius * Math.sqrt(3)) / 2;
  return [
    {
      id: 0,
      left: 1,
      center: 2,
      right: 3,
      value: null,
      position: {
        x: 5.5 * radius,
        y: height * 13
      }
    },
    {
      id: 1,
      left: 4,
      center: 5,
      right: 2,
      value: null,
      position: {
        x: 4 * radius,
        y: 12 * height
      }
    },
    {
      id: 2,
      left: 5,
      center: 6,
      right: 7,
      value: null,
      position: {
        x: 5.5 * radius,
        y: height * 11
      }
    },
    {
      id: 3,
      left: 2,
      center: 7,
      right: 8,
      value: null,
      position: {
        x: 7 * radius,
        y: 12 * height
      }
    },
    {
      id: 4,
      left: 9,
      center: 10,
      right: 5,
      value: null,
      position: {
        x: 2.5 * radius,
        y: 11 * height
      }
    },
    {
      id: 5,
      left: 10,
      center: 11,
      right: 6,
      value: null,
      position: {
        x: 4 * radius,
        y: 10 * height
      }
    },
    {
      id: 6,
      left: 11,
      center: 12,
      right: 13,
      value: null,
      position: {
        x: 5.5 * radius,
        y: height * 9
      }
    },
    {
      id: 7,
      left: 6,
      center: 13,
      right: 14,
      value: null,
      position: {
        x: 7 * radius,
        y: 10 * height
      }
    },
    {
      id: 8,
      left: 7,
      center: 14,
      right: 15,
      value: null,
      position: {
        x: 8.5 * radius,
        y: 11 * height
      }
    },
    {
      id: 9,
      left: null,
      center: null,
      right: null,
      value: values[0],
      position: {
        x: radius,
        y: height * 10
      }
    },
    {
      id: 10,
      left: 16,
      center: 17,
      right: 11,
      value: null,
      position: {
        x: 2.5 * radius,
        y: 9 * height
      }
    },
    {
      id: 11,
      left: 17,
      center: 18,
      right: 12,
      value: null,
      position: {
        x: 4 * radius,
        y: 8 * height
      }
    },
    {
      id: 12,
      left: 18,
      center: 19,
      right: 20,
      value: null,
      position: {
        x: 5.5 * radius,
        y: height * 7
      }
    },
    {
      id: 13,
      left: 12,
      center: 20,
      right: 21,
      value: null,
      position: {
        x: 7 * radius,
        y: 8 * height
      }
    },
    {
      id: 14,
      left: 13,
      center: 21,
      right: 22,
      value: null,
      position: {
        x: 8.5 * radius,
        y: 9 * height
      }
    },
    {
      id: 15,
      left: null,
      center: null,
      right: null,
      value: values[12],
      position: {
        x: 10 * radius,
        y: 10 * height
      }
    },
    {
      id: 16,
      left: null,
      center: null,
      right: null,
      value: values[1],
      position: {
        x: radius,
        y: height * 8
      }
    },
    {
      id: 17,
      left: 23,
      center: 24,
      right: 18,
      value: null,
      position: {
        x: 2.5 * radius,
        y: 7 * height
      }
    },
    {
      id: 18,
      left: 24,
      center: 25,
      right: 19,
      value: null,
      position: {
        x: 4 * radius,
        y: 6 * height
      }
    },
    {
      id: 19,
      left: 25,
      center: 26,
      right: 27,
      value: null,
      position: {
        x: 5.5 * radius,
        y: height * 5
      }
    },
    {
      id: 20,
      left: 19,
      center: 27,
      right: 28,
      value: null,
      position: {
        x: 7 * radius,
        y: 6 * height
      }
    },
    {
      id: 21,
      left: 20,
      center: 28,
      right: 29,
      value: null,
      position: {
        x: 8.5 * radius,
        y: 7 * height
      }
    },
    {
      id: 22,
      left: null,
      center: null,
      right: null,
      value: values[11],
      position: {
        x: 10 * radius,
        y: 8 * height
      }
    },
    {
      id: 23,
      left: null,
      center: null,
      right: null,
      value: values[2],
      position: {
        x: radius,
        y: height * 6
      }
    },
    {
      id: 24,
      left: 30,
      center: 31,
      right: 25,
      value: null,
      position: {
        x: 2.5 * radius,
        y: 5 * height
      }
    },
    {
      id: 25,
      left: 31,
      center: 32,
      right: 26,
      value: null,
      position: {
        x: 4 * radius,
        y: 4 * height
      }
    },
    {
      id: 26,
      left: 32,
      center: 33,
      right: 34,
      value: null,
      position: {
        x: 5.5 * radius,
        y: height * 3
      }
    },
    {
      id: 27,
      left: 26,
      center: 34,
      right: 35,
      value: null,
      position: {
        x: 7 * radius,
        y: 4 * height
      }
    },
    {
      id: 28,
      left: 27,
      center: 35,
      right: 36,
      value: null,
      position: {
        x: 8.5 * radius,
        y: 5 * height
      }
    },
    {
      id: 29,
      left: null,
      center: null,
      right: null,
      value: values[10],
      position: {
        x: 10 * radius,
        y: 6 * height
      }
    },
    {
      id: 30,
      left: null,
      center: null,
      right: null,
      value: values[3],
      position: {
        x: radius,
        y: height * 4
      }
    },
    {
      id: 31,
      left: null,
      center: null,
      right: null,
      value: values[4],
      position: {
        x: 2.5 * radius,
        y: 3 * height
      }
    },
    {
      id: 32,
      left: null,
      center: null,
      right: null,
      value: values[5],
      position: {
        x: 4 * radius,
        y: 2 * height
      }
    },
    {
      id: 33,
      left: null,
      center: null,
      right: null,
      value: values[6],
      position: {
        x: 5.5 * radius,
        y: height
      }
    },
    {
      id: 34,
      left: null,
      center: null,
      right: null,
      value: values[7],
      position: {
        x: 7 * radius,
        y: 2 * height
      }
    },
    {
      id: 35,
      left: null,
      center: null,
      right: null,
      value: values[8],
      position: {
        x: 8.5 * radius,
        y: 3 * height
      }
    },
    {
      id: 36,
      left: null,
      center: null,
      right: null,
      value: values[9],
      position: {
        x: 10 * radius,
        y: 4 * height
      }
    }
  ];
};
