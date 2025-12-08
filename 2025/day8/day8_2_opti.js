import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8")
  .split(/\r?\n/)
  .map((ele) => ele.split(","));

const getDistance = (a, b) => {
  return ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2) ** 0.5;
};

const range = [];

for (let i = 0; i < data.length; i++) {
  let min = 99999999;
  let index = "";
  for (let j = 0; j < data.length; j++) {
    if (i != j && getDistance(data[i], data[j]) < min) {
      min = getDistance(data[i], data[j]);
      index = `${i}-${j}`;
    }
  }
  range.push([index, min]);
}
range.sort((a, b) => b[1] - a[1]);

const indexes = range[0][0].split("-");
const res = data[parseInt(indexes[0])][0] * data[parseInt(indexes[1])][0];
console.log(res);
