import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8").split(/\r?\n/);

const getTarget = (line) => {
  const values = line.split("{")[1];
  const targetValues = values
    .slice(0, values.length - 1)
    .split(",")
    .map((val) => parseInt(val));
  return targetValues;
};

const getVectors = (line, length) => {
  const splitLine = line.split(" ");
  const buttonsWirings = splitLine
    .slice(1, splitLine.length - 1)
    .map((ele) =>
      [...ele.slice(1, ele.length - 1)].filter((ele) => ele != ",")
    );
  const vectors = [];
  for (let i = 0; i < buttonsWirings.length; i++) {
    const vector = new Array(length).fill(0);
    for (const value of buttonsWirings[i]) {
      vector[value] = 1;
    }
    vectors.push(vector);
  }
  return vectors;
};

const minVectorsBFS = (vectors, target) => {
  const n = target.length;
  const start = new Array(n).fill(0);
  const key = (arr) => arr.join(",");
  const queue = [];
  const seen = new Set();
  queue.push({ state: start, steps: 0, path: [] });
  seen.add(key(start));
  while (queue.length) {
    const { state, steps, path } = queue.shift();
    if (state.every((v, i) => v === target[i])) return steps;
    for (let i = 0; i < vectors.length; i++) {
      const vec = vectors[i];
      const next = new Array(n);
      let ok = true;
      for (let j = 0; j < n; j++) {
        next[j] = state[j] + vec[j];
        if (next[j] > target[j]) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;

      const k = key(next);
      if (!seen.has(k)) {
        seen.add(k);
        queue.push({ state: next, steps: steps + 1, path: path.concat(i) });
      }
    }
  }
  return null;
};

let res = 0;
for (let i = 0; i < data.length; i++) {
  console.log(i);
  const target = getTarget(data[i]);
  const vectors = getVectors(data[i], target.length);
  res += minVectorsBFS(vectors, target);
}

console.log(res);
