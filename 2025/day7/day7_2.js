import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8")
  .split(/\r?\n/)
  .map((ele) => [...ele]);

let oldMap = new Map();
const firstIndex = data[0].indexOf("S");
oldMap.set(firstIndex, 1);

const addMap = (map, idx, val) => {
  if (map.has(idx)) {
    map.set(idx, map.get(idx) + val);
  } else {
    map.set(idx, val);
  }
};

for (let i = 1; i < data.length; i++) {
  let newMap = new Map();
  for (const [index, count] of oldMap.entries()) {
    if (data[i][index] == "^") {
      addMap(newMap, index - 1, count);
      addMap(newMap, index + 1, count);
    } else {
      addMap(newMap, index, count);
    }
  }
  oldMap = newMap;
}

const res = oldMap.values().reduce((acc, n) => acc + n, 0);

console.log(res);
