import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8")
  .split(/\r?\n/)
  .map((ele) => ele.split(","));

const rectangleArea = (a, b) => {
  return (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1);
};

let res = 0;
for (let i = 0; i < data.length; i++) {
  for (let j = i + 1; j < data.length; j++) {
    res = Math.max(res, rectangleArea(data[i], data[j]));
  }
}

console.log(res);
