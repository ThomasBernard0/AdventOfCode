import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8").split(/\r?\n/);

const map = new Map();
for (let i = 0; i < data.length; i++) {
  const dataLine = data[i].split(":");
  const key = dataLine[0];
  const values = dataLine[1].slice(1, dataLine[1].length).split(" ");
  map.set(key, values);
}

let res = 0;
const queue = [];
queue.push(...map.get("you"));

while (queue.length != 0) {
  const newValues = map.get(queue.shift());
  if (newValues.length == 1 && newValues[0] == "out") {
    res++;
    continue;
  }
  for (const val of newValues) {
    queue.push(val);
  }
}

console.log(res);
