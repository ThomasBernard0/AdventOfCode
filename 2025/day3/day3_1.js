import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8").split(/\r?\n/);

let res = 0;

for (let i = 0; i < data.length; i++) {
  let firstDigit = "0";
  let secondDigit = "0";
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] > firstDigit && j < data[i].length - 1) {
      firstDigit = data[i][j];
      secondDigit = data[i][j + 1];
    } else if (data[i][j] > secondDigit) {
      secondDigit = data[i][j];
    }
  }
  res += parseInt(firstDigit + secondDigit);
}

console.log(res);
