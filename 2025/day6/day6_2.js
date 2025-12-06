import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8")
  .split(/\r?\n/)
  .map((ele) => [...ele]);

const values = data.slice(0, data.length - 1);
const operators = data[data.length - 1].filter((ele) => ele != " ");

const rotate = [];

let tempArray = [];
for (let i = values[0].length - 1; i >= 0; i--) {
  let value = "";
  for (let j = 0; j < values.length; j++) {
    value += values[j][i];
  }
  if (value.trim() == "") {
    rotate.push(tempArray);
    tempArray = [];
  } else {
    tempArray.push(value);
  }
  value = "";
}
rotate.push(tempArray);

let res = 0;

for (let i = 0; i < rotate.length; i++) {
  let temp;
  if (operators[operators.length - i - 1] == "*") {
    temp = 1;
    for (let j = 0; j < rotate[i].length; j++) {
      temp *= parseInt(rotate[i][j]);
    }
  } else if (operators[operators.length - i - 1] == "+") {
    temp = 0;
    for (let j = 0; j < rotate[i].length; j++) {
      temp += parseInt(rotate[i][j]);
    }
  }
  res += temp;
}

console.log(res);
