import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8").split(/\r?\n/);

for (let i = 0; i < data.length; i++) {
  data[i] = data[i].split(" ").filter((ele) => ele != "");
}

const values = data.slice(0, data.length - 1);
const operators = data[data.length - 1];

let res = 0;

for (let i = 0; i < values[0].length; i++) {
  let temp;
  if (operators[i] == "*") {
    temp = 1;
    for (let j = 0; j < values.length; j++) {
      temp *= parseInt(values[j][i]);
    }
  } else if (operators[i] == "+") {
    temp = 0;
    for (let j = 0; j < values.length; j++) {
      temp += parseInt(values[j][i]);
    }
  }
  res += temp;
}

console.log(res);
