import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8").split(/\r?\n/);

const ranges = [];

for (let i = 0; i < data.length; i++) {
  if (data[i] == "") break;
  ranges.push(data[i].split("-").map((ele) => BigInt(parseInt(ele))));
}

const max = (a, b) => (a > b ? a : b);
const min = (a, b) => (a < b ? a : b);

let res = 0n;
let finalRanges = [ranges[0]];

for (let i = 1; i < ranges.length; i++) {
  let newRanges = [];
  if (ranges[i][0] > finalRanges[finalRanges.length - 1][1]) {
    newRanges = [...finalRanges, ranges[i]];
  } else {
    for (let j = 0; j < finalRanges.length; j++) {
      if (ranges[i][0] > finalRanges[j][1]) {
        newRanges.push(finalRanges[j]);
      } else {
        if (ranges[i][1] < finalRanges[j][0]) {
          newRanges.push(ranges[i]);
          const remaining = finalRanges.slice(j, finalRanges.length);
          if (remaining.length > 0) newRanges.push(...remaining);
        } else {
          let index = 0;
          const minValue = min(ranges[i][0], finalRanges[j][0]);
          while (ranges[i][1] > finalRanges[j + index][1]) {
            if (
              index + j >= finalRanges.length - 1 ||
              ranges[i][1] < finalRanges[j + index + 1][0]
            )
              break;

            index++;
          }
          const maxValue = max(finalRanges[j + index][1], ranges[i][1]);
          newRanges.push([minValue, maxValue]);
          const remaining = finalRanges.slice(
            j + index + 1,
            finalRanges.length
          );
          if (remaining.length > 0) newRanges.push(...remaining);
        }
        break;
      }
    }
  }
  finalRanges = newRanges;
}

for (let i = 0; i < finalRanges.length; i++) {
  res += finalRanges[i][1] - finalRanges[i][0] + 1n;
}

console.log(res);
