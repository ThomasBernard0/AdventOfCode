import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8").split(/\r?\n/);

const map = new Map();
for (let i = 0; i < data.length; i++) {
  const dataLine = data[i].split(":");
  const key = dataLine[0];
  const values = dataLine[1].slice(1, dataLine[1].length).split(" ");
  map.set(key, values);
}

const cache = new Map();

const check = (n, fft, dac) => {
  fft = fft || n == "fft";
  dac = dac || n == "dac";

  const key = `${n}|${fft}|${dac}`;

  if (cache.has(key)) {
    return cache.get(key);
  }

  if (n == "out") {
    return fft && dac ? 1 : 0;
  }
  const next = map.get(n) ?? [];
  const nbOfPaths = next.reduce((acc, i) => acc + check(i, fft, dac), 0);
  cache.set(key, nbOfPaths);
  return nbOfPaths;
};

const res = check("svr", false, false);

console.log(res);
