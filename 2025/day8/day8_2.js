import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8")
  .split(/\r?\n/)
  .map((ele) => ele.split(","));

const getDistance = (a, b) => {
  return ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2) ** 0.5;
};

const range = [];
const circuits = new Map();

for (let i = 0; i < data.length; i++) {
  circuits.set(i.toString(), i.toString());
  for (let j = i + 1; j < data.length; j++) {
    range.push([`${i}-${j}`, getDistance(data[i], data[j])]);
  }
}
range.sort((a, b) => a[1] - b[1]);

let newPath = "";
let i = 0;
let firstBox = "-1";
let secondBox = "-1";
while (path.split("-").length != data.length) {
  const boxes = range[i][0].split("-");
  i++;
  firstBox = boxes[0].toString();
  secondBox = boxes[1].toString();
  const firstPath = circuits.get(firstBox).split("-");
  if (firstPath.includes(secondBox)) {
    continue;
  }
  newPath = circuits.get(firstBox) + "-" + circuits.get(secondBox);
  const secondPath = circuits.get(secondBox).split("-");
  firstPath.forEach((val) => circuits.set(val, newPath));
  secondPath.forEach((val) => circuits.set(val, newPath));
}

const res = data[parseInt(firstBox)][0] * data[parseInt(secondBox)][0];
console.log(res);
