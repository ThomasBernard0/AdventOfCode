import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8").split(/\r?\n/);

let res = 0;
let dial = 50;

for (let i = 0; i < data.length; i++) {
  const letter = data[i].slice(0, 1);
  const value = parseInt(data[i].slice(1));

  if (letter == "L") dial = (dial - value) % 100;
  else dial = (dial + value) % 100;

  if (dial == 0) res++;
}

console.log(res);
