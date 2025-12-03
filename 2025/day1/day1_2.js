import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8").split(/\r?\n/);

let res = 0;
let dial = 50;

for (let i = 0; i < data.length; i++) {
  const letter = data[i].slice(0, 1);
  const value = parseInt(data[i].slice(1));

  const oldDial = dial;
  if (letter == "L") dial = dial - value;
  else dial = dial + value;

  if (dial == 0) res++;
  else if (dial < 0) {
    let nbOfTurn = Math.floor((dial - 1) / 100);
    if (oldDial == 0) nbOfTurn++;
    res -= nbOfTurn;
  } else if (dial > 99) {
    const nbOfTurn = Math.floor(dial / 100);
    res += nbOfTurn;
  }
  dial = ((dial % 100) + 100) % 100;
}

console.log(res);
