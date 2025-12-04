import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8").split(/\r?\n/);

let res = 0;

const isInBound = (i, j) => {
  return i >= 0 && i < data.length && j >= 0 && j < data[i].length;
};

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    let count = 0;
    for (let k = -1; k < 2; k++) {
      for (let l = -1; l < 2; l++) {
        if (
          isInBound(i + k, j + l) &&
          (k != 0 || l != 0) &&
          data[i + k][j + l] == "@"
        )
          count++;
      }
    }
    if (count <= 3 && data[i][j] == "@") {
      res++;
    }
  }
}
console.log(res);
