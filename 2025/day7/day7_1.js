import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8")
  .split(/\r?\n/)
  .map((ele) => [...ele]);

let res = 0;

let set = new Set();

for (let i = 0; i < data.length; i++) {
  if (data[0][i] == "S") set.add(i);
}

for (let i = 1; i < data.length; i++) {
  let newSet = new Set();
  set.forEach((val) => {
    if (data[i][val] == "^") {
      res++;
      newSet.add(val - 1);
      newSet.add(val + 1);
    } else {
      newSet.add(val);
    }
  });
  set = newSet;
}

console.log(res);
