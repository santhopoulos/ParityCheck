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
  if (oneSum % 2 === 0) return 0;
  else return 1;
};

//parameters: message t
//returns 1 if message transmitted successfully, otherwise -1
const receiverCheck = function (t) {
  if (countOnes(t) % 2 == 0) {
    console.log(`Message ${t} transmitted successfully!`);
    return 1;
  } else console.log(`Message ${t} transmitted unsuccessfully!`);
  return -1;
};

//Method that creates the final message based on even parity
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

// const rowParitiesArr = [];
// const rowParitiesBitsArr = [];

// const colParitiesArr = [];
// const colParitiesBitsArr = [];

//Creating 2D array
// const result = create2DArray(ROWS, COLS);

//Dividing the initial message into rows of bits
// let k = 0;
// for (let i = 0; i < ROWS; i++) {
//   for (let j = 0; j < COLS; j++) {
//     result[i][j] = testMess24bits[k];
//     k++;
//   }
// }

// //Computing Row parities
// for (let i = 0; i < ROWS; i++) {
//   let tempStrRow = "";
//   for (let j = 0; j < COLS; j++) {
//     tempStrRow += result[i][j];
//   }
//   rowParitiesBitsArr.push(parityCheck(tempStrRow));
//   rowParitiesArr.push(createFinalMessage(tempStrRow).toString());
// }

// //Logging results to the console
// console.log(rowParitiesArr.join(""));
// console.log(rowParitiesBitsArr);

// //Computing Columns parities
// for (let i = 0; i < COLS; i++) {
//   let tempStrCol = "";
//   for (let j = 0; j < ROWS; j++) {
//     tempStrCol += result[j][i];
//   }
//   colParitiesBitsArr.push(parityCheck(tempStrCol));
//   //colParitiesArr.push(createFinalMessage(tempStrCol).toString());
// }
// colParitiesBitsArr.push(parityCheck(rowParitiesBitsArr.join("")));

// //Logging results to the console
// //console.log(colParitiesArr);
// console.log(colParitiesBitsArr);
// const finalMessage = rowParitiesArr.join("") + colParitiesBitsArr.join("");
// console.log(finalMessage);
// //const resultWithRowParities = create2DArray(ROWS, COLS + 1);

// console.log(result);

const create2dParity = function (t) {
  //Create 2D array
  const arr = create2DArray(ROWS, COLS);

  //Initialize arrays to store row and column parities bits
  const rowParitiesBits = [];
  const colParitiesBits = [];

  const rowParities = [];

  //Dividing the initial message into rows of bits
  let k = 0;
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      arr[i][j] = t[k];
      k++;
    }
  }

  //Computing rows parities
  for (let i = 0; i < ROWS; i++) {
    let tempStrRow = "";
    for (let j = 0; j < COLS; j++) {
      tempStrRow += arr[i][j];
    }
    rowParitiesBits.push(parityCheck(tempStrRow));
    rowParities.push(createFinalMessage(tempStrRow).toString());
  }

  //Computing cols parities
  for (let i = 0; i < COLS; i++) {
    let tempStrCol = "";
    for (let j = 0; j < ROWS; j++) {
      tempStrCol += arr[j][i];
    }
    colParitiesBits.push(parityCheck(tempStrCol));
  }
  colParitiesBits.push(parityCheck(rowParitiesBits.join("")));

  //Logging row and col parities
  //console.log("Rows parities: ", rowParitiesBits);
  //console.log("Column parities: ", colParitiesBits);

  //Return the final message
  return rowParities.join("") + colParitiesBits.join("");
};

//Function to check 2d parity
const check2Dparity = function (c, e) {
  if (c.localeCompare(e) === 0) {
    console.log("Message transmitted successfully");
  } else {
    console.log("Message contains error");
  }
};

// check2Dparity(correctMessage, correctMessage);

//One dimension parity check
const message = "10001101011000";

console.log(
  `One dimension parity\nInitial message: ${message}\nFinal message to be transmitted: ${createFinalMessage(
    message
  )}\nParity bit: ${parityCheck(message)}`
);

receiverCheck("10001101011000"); //Checking 10001101011000
receiverCheck("10001001011000"); //Error on 6th bit
receiverCheck("10001001011100"); //Errors on bits 6 and 12

console.log("-------------------------------------------------");
//Two-dimensional parity check
const testMess24bits = "1100111101110101110010101001"; //24-bit message
console.log(`Two-dimensional parity\nInitial message: ${testMess24bits}`);
const finalMes = create2dParity(testMess24bits);
console.log(`Final   message: ${finalMes}`);

console.log("-------------------------------------------------");

//Correct message excpeted by the receiver after two-dimensional parity
const correctMessage = create2dParity(testMess24bits);

//Variables for messages containing 0,1 or 2 errors
const message0Err = testMess24bits;
const message1Err = "1100111100110101110010101001";
const message2Err = "1100111100100101110010101001";

check2Dparity(correctMessage, create2dParity(message0Err));
check2Dparity(correctMessage, create2dParity(message1Err));
check2Dparity(correctMessage, create2dParity(message2Err));
