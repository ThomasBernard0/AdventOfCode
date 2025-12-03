import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8").split(",");

let res = 0;

const fullDiviseurMap = new Map();

for (let i = 1; i <= 16; i++) {
  const diviseurMap = new Map();
  for (let j = 1; j < i; j++) {
    if (i % j == 0) {
      diviseurMap.set(j, i / j);
    }
  }
  fullDiviseurMap.set(i, diviseurMap);
}

for (let i = 0; i < data.length; i++) {
  const values = data[i].split("-");
  const start = parseInt(values[0]);
  const end = parseInt(values[1]);

  for (let j = start; j <= end; j++) {
    const map = fullDiviseurMap.get(j.toString().length);
    for (const [key, value] of map.entries()) {
      let bool = true;
      for (let k = 0; k < value - 1; k++) {
        const firstHalf = j.toString().slice(0 + k * key, (k + 1) * key);
        const secondHalf = j.toString().slice((k + 1) * key, (k + 2) * key);
        if (firstHalf != secondHalf) {
          bool = false;
          break;
        }
      }
      if (bool) {
        res += j;
        break;
      }
    }
  }
}

console.log(res);
