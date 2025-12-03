import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8").split(/\r?\n/);

let res = 0;

const findBiggest = (array, start, end) => {
  let val = "0";
  let index = -1;
  for (let i = start; i <= end; i++) {
    if (array[i] > val) {
      val = array[i];
      index = i;
    }
  }
  return { val, index };
};

for (let i = 0; i < data.length; i++) {
  let tempRes = "";
  let start = 0;
  let end = data[i].length - 12;
  for (let j = 0; j < 12; j++) {
    let val = findBiggest(data[i], start, end);
    tempRes += val.val;
    start = val.index + 1;
    end = data[i].length - 11 + j;
  }
  res += parseInt(tempRes);
}

console.log(res);
