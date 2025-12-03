import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8").split(",");

let res = 0;

for (let i = 0; i < data.length; i++) {
  const values = data[i].split("-");
  const start = parseInt(values[0]);
  const end = parseInt(values[1]);

  for (let j = start; j <= end; j++) {
    if (j.toString().length % 2 != 0) continue;

    const firstHalf = j.toString().slice(0, j.toString().length / 2);
    const secondHalf = j
      .toString()
      .slice(j.toString().length / 2, j.toString().length);
    if (firstHalf == secondHalf) res += j;
  }
}

console.log(res);
