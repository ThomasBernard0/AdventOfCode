import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8").split(/\r?\n/);

const getLightDiagram = (line) => {
  const lightDiagram = line.split(" ")[0];
  const formattedlightDiagram = lightDiagram.slice(1, lightDiagram.length - 1);
  return formattedlightDiagram
    .split("")
    .map((ele) => (ele == "." ? false : true));
};

const getButtonsWiring = (line) => {
  const splitLine = line.split(" ");
  const buttonsWirings = splitLine
    .slice(1, splitLine.length - 1)
    .map((ele) =>
      [...ele.slice(1, ele.length - 1)].filter((ele) => ele != ",")
    );
  return buttonsWirings;
};

const getEmptyLight = (lightDiagram) => {
  let emptyLight = [];
  for (let i = 0; i < lightDiagram.length; i++) emptyLight.push(false);
  return emptyLight;
};

const doSwitch = (lightDiagram, buttonWiring, comb) => {
  let light = getEmptyLight(lightDiagram);
  for (let i = 0; i < comb.length; i++) {
    for (const button of buttonWiring[comb[i]]) {
      light[button] = !light[button];
    }
  }
  return light;
};

const compareLight = (a, b) => {
  let res = true;
  for (let i = 0; i < a.length; i++) {
    res = res && a[i] == b[i];
  }
  return res;
};

const combinations = (arr, k) => {
  if (k === 0) return [[]];
  if (arr.length === 0) return [];
  const [first, ...rest] = arr;
  const withFirst = combinations(rest, k - 1).map((c) => [first, ...c]);
  const withoutFirst = combinations(rest, k);
  return [...withFirst, ...withoutFirst];
};

const generateCombinationsFromLength = (n) => {
  const values = Array.from({ length: n }, (_, i) => i);
  const result = [];
  for (let size = 1; size <= n; size++) {
    result.push(...combinations(values, size));
  }
  return result;
};

let res = 0;
for (let i = 0; i < data.length; i++) {
  const lightDiagram = getLightDiagram(data[i]);
  const buttonsWirings = getButtonsWiring(data[i]);
  const combinations = generateCombinationsFromLength(buttonsWirings.length);
  let min = 20;
  for (const comb of combinations) {
    let finalLight = doSwitch(lightDiagram, buttonsWirings, comb);
    if (compareLight(finalLight, lightDiagram)) {
      min = comb.length;
      break;
    }
  }
  res += min;
}

console.log(res);
