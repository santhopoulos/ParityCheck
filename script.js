"use strict";

const ROWS = 4;
const COLS = 7;

//Method for even parity check.
const countOnes = function (t) {
  let oneSum = 0;
  const len = t.length;
  for (let i = 0; i < len; i++) if (t[i] === "1") oneSum++;
  return oneSum;
};

//Method for checking wether 1 or 0 should be appended
const parityCheck = function (t) {
  const oneSum = countOnes(t);
  //console.log(`Sum of 1's in initial message: ${oneSum}`);
  if (oneSum % 2 === 0) return 0;
  else return 1;
};

//parameters: message t
//returns 1 if message transmitted successfully, otherwise -1
const receiverCheck = function (t) {
  if (countOnes(t) % 2 == 0) {
    console.log("Message transmitted successfully!");
    return 1;
  } else console.log("Message transmitted unsuccessfully!");
  return -1;
};

//Method that creates the final message
const createFinalMessage = function (t) {
  return t + parityCheck(t).toString();
};

//Method that creates two-dimensional array
const create2DArray = function (rows, cols) {
  let arr = [];
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) arr[i] = [];

  return arr;
};

//2D-parity check
const testMess24bits = "1100111101110101110010101001"; //24bits

const rowParitiesArr = [];
const rowParitiesBitsArr = [];

const colParitiesArr = [];
const colParitiesBitsArr = [];

//Creating 2D array
const result = create2DArray(ROWS, COLS);

//Dividing the initial message into rows of bits
let k = 0;
for (let i = 0; i < ROWS; i++) {
  for (let j = 0; j < COLS; j++) {
    result[i][j] = testMess24bits[k];
    k++;
  }
}

//Computing Row parities
for (let i = 0; i < ROWS; i++) {
  let tempStrRow = "";
  for (let j = 0; j < COLS; j++) {
    tempStrRow += result[i][j];
  }
  rowParitiesBitsArr.push(parityCheck(tempStrRow));
  rowParitiesArr.push(createFinalMessage(tempStrRow).toString());
}

//Logging results to the console
console.log(rowParitiesArr.join(""));
console.log(rowParitiesBitsArr);

//Computing Columns parities
for (let i = 0; i < COLS; i++) {
  let tempStrCol = "";
  for (let j = 0; j < ROWS; j++) {
    tempStrCol += result[j][i];
  }
  colParitiesBitsArr.push(parityCheck(tempStrCol));
  //colParitiesArr.push(createFinalMessage(tempStrCol).toString());
}
colParitiesBitsArr.push(parityCheck(rowParitiesBitsArr.join("")));

//Logging results to the console
//console.log(colParitiesArr);
console.log(colParitiesBitsArr);
const finalMessage = rowParitiesArr.join("") + colParitiesBitsArr.join("");
console.log(finalMessage);
//const resultWithRowParities = create2DArray(ROWS, COLS + 1);

console.log(result);

const create2dParity = function (t) {
  const arr = create2DArray(ROWS, COLS);
  const rowParities = [];
  const rowParitiesBits = [];

  const colParitiesBits = [];

  //Dividing the initial message into rows of bits
  let k = 0;
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      arr[i][j] = t[k];
      k++;
    }
  }

  for (let i = 0; i < ROWS; i++) {
    let tempStrRow = "";
    for (let j = 0; j < COLS; j++) {
      tempStrRow += arr[i][j];
    }
    rowParitiesBits.push(parityCheck(tempStrRow));
    rowParities.push(createFinalMessage(tempStrRow).toString());
  }

  for (let i = 0; i < COLS; i++) {
    let tempStrCol = "";
    for (let j = 0; j < ROWS; j++) {
      tempStrCol += arr[j][i];
    }
    colParitiesBits.push(parityCheck(tempStrCol));
  }
  colParitiesBits.push(parityCheck(rowParitiesBits.join("")));

  return rowParities.join("") + colParitiesBits.join("");
};

const check2Dparity = function (c, e) {
  if (c.localeCompare(e) === 0) {
    console.log("Message transmitted successfully");
  } else {
    console.log("Message contains error");
  }
};

const correctMessage = create2dParity(testMess24bits);
console.log("Correct message: ", create2dParity(testMess24bits));
const testMessErrorOneBit = "1100111100110101110010101001";
console.log(
  "Message with error on one bit: ",
  create2dParity(testMessErrorOneBit)
);
const testMessErrorTwoBit = "1100111100100101110010101001";
console.log(
  "Message with error on two bits: ",
  create2dParity(testMessErrorTwoBit)
);

check2Dparity(correctMessage, correctMessage);
// const message = "10001101011000";
// const wrongMessage = "100100100";
// const finalMessage = createFinalMessage(message);
// console.log(message);
// console.log(finalMessage);
// console.log(receiverCheck(finalMessage));
// console.log(receiverCheck(wrongMessage));

//first persama kata grammes
//second perasma kata sthles
