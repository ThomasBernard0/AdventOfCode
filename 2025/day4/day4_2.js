import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8")
  .split(/\r?\n/)
  .map((line) => line.split(""));

let res = 0;

const isInBound = (i, j) => {
  return i >= 0 && i < data.length && j >= 0 && j < data[i].length;
};

const check = (i, j) => {
  if (data[i][j] == "@") {
    let count = 0;
    for (let k = -1; k < 2; k++) {
      for (let l = -1; l < 2; l++) {
        if (isInBound(i + k, j + l) && data[i + k][j + l] == "@") count++;
      }
    }
    if (count <= 4) {
      res++;
      data[i][j] = ".";
    }
  }
};

let oldRes = -1;
while (oldRes != res) {
  oldRes = res;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      check(i, j);
    }
  }
}

console.log(res);
