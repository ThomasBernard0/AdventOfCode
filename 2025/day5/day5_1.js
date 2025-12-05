import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8").split(/\r?\n/);

const ranges = [];
const ingredients = [];
let isRangeValue = true;

for (let i = 0; i < data.length; i++) {
  if (data[i] == "") {
    isRangeValue = false;
    continue;
  }

  if (isRangeValue) {
    ranges.push(data[i].split("-").map((ele) => parseInt(ele)));
  } else {
    ingredients.push(parseInt(data[i]));
  }
}

let res = 0;

for (let i = 0; i < ingredients.length; i++) {
  for (let j = 0; j < ranges.length; j++) {
    if (ingredients[i] >= ranges[j][0] && ingredients[i] <= ranges[j][1]) {
      res++;
      break;
    }
  }
}

console.log(res);
