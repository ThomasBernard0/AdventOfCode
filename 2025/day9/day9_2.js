// do not read please

import { readFileSync } from "fs";

const data = readFileSync("data.txt", "utf8")
  .split(/\r?\n/)
  .map((ele) => ele.split(","));

const rectangleArea = (a, b) => {
  return (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1);
};

const checkBorder = (top, bottom, left, right, x, y) => {
  return !(x > left && x < right && y > top && y < bottom);
};

const createPolygon = (map, point) => {
  const polygon = [];
  const firstPoint = point.join("-");
  let loop = 0;
  let temp = map.get(firstPoint).horizontale;
  while (firstPoint != temp) {
    polygon.push(temp.split("-"));
    const tempChoice = directionMap.get(temp);
    temp = loop % 2 == 0 ? tempChoice.verticale : tempChoice.horizontale;
    loop++;
  }
  return polygon;
};

const pointInPolygon = (point, polygon) => {
  const [px, py] = point;
  let inside = false;

  for (let i = 0; i < polygon.length; i++) {
    let j = (i + 1) % polygon.length;

    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    const intersects =
      yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;

    if (intersects) inside = !inside;
  }
  return inside;
};

const switchSide = (
  isTop,
  isBottom,
  isLeft,
  isRight,
  top,
  bottom,
  left,
  right,
  x,
  y
) => {
  const isNowTop = top == y;
  const isNomBottom = bottom == y;
  const isNowLeft = left == x;
  const isNowRight = right == x;
  return (
    (isTop && isNomBottom) ||
    (isBottom && isNowTop) ||
    (isLeft && isNowRight) ||
    (isRight && isNowLeft)
  );
};

const verticaleMap = new Map();
const horizontaleMap = new Map();
for (let i = 0; i < data.length; i++) {
  const x = parseInt(data[i][0]);
  const y = parseInt(data[i][1]);
  if (verticaleMap.has(x)) {
    verticaleMap.set(x, [...verticaleMap.get(x), y]);
  } else {
    verticaleMap.set(x, [y]);
  }
  if (horizontaleMap.has(y)) {
    horizontaleMap.set(y, [...horizontaleMap.get(y), x]);
  } else {
    horizontaleMap.set(y, [x]);
  }
}
for (const val of verticaleMap.values()) {
  val.sort((a, b) => a - b);
}
for (const val of horizontaleMap.values()) {
  val.sort((a, b) => a - b);
}

const directionMap = new Map();
for (const [index, values] of verticaleMap.entries()) {
  let i = 0;
  let oldVal = -1;
  for (const val of values) {
    if (i % 2 == 0) {
      oldVal = val;
    } else {
      directionMap.set(`${index}-${val}`, {
        verticale: `${index}-${oldVal}`,
      });
      directionMap.set(`${index}-${oldVal}`, {
        verticale: `${index}-${val}`,
      });
    }
    i++;
  }
}
for (const [index, values] of horizontaleMap.entries()) {
  let i = 0;
  let oldVal = -1;
  for (const val of values) {
    if (i % 2 == 0) {
      oldVal = val;
    } else {
      directionMap.set(`${val}-${index}`, {
        ...directionMap.get(`${val}-${index}`),
        horizontale: `${oldVal}-${index}`,
      });
      directionMap.set(`${oldVal}-${index}`, {
        ...directionMap.get(`${oldVal}-${index}`),
        horizontale: `${val}-${index}`,
      });
    }
    i++;
  }
}

let test = 0;
let res = 0;
for (let i = 0; i < data.length; i++) {
  for (let j = i + 1; j < data.length; j++) {
    let top = Math.min(data[i][1], data[j][1]);
    let bottom = Math.max(data[i][1], data[j][1]);
    let left = Math.min(data[i][0], data[j][0]);
    let right = Math.max(data[i][0], data[j][0]);

    let isValidAnswer = true;
    let firstCorner = data[i];
    let secondCorner = data[j];

    let temp = directionMap.get(
      `${firstCorner[0]}-${firstCorner[1]}`
    ).horizontale;
    let loop = 0;
    let isLeft = false;
    let isRight = false;
    let isTop = false;
    let isBottom = false;
    while (isValidAnswer && temp != `${secondCorner[0]}-${secondCorner[1]}`) {
      const [x, y] = temp.split("-");
      const intX = parseInt(x);
      const intY = parseInt(y);
      const check = checkBorder(top, bottom, left, right, intX, intY);
      if (
        !check ||
        switchSide(
          isTop,
          isBottom,
          isLeft,
          isRight,
          top,
          bottom,
          left,
          right,
          x,
          y
        )
      )
        isValidAnswer = false;
      const tempChoice = directionMap.get(temp);
      temp = loop % 2 == 0 ? tempChoice.verticale : tempChoice.horizontale;
      loop++;
      isTop = top == y;
      isBottom = bottom == y;
      isLeft = left == x;
      isRight = right == x;
    }
    temp = directionMap.get(`${firstCorner[0]}-${firstCorner[1]}`).verticale;
    loop = 1;
    isLeft = false;
    isRight = false;
    isTop = false;
    isBottom = false;
    while (isValidAnswer && temp != `${secondCorner[0]}-${secondCorner[1]}`) {
      const [x, y] = temp.split("-");
      const intX = parseInt(x);
      const intY = parseInt(y);
      const check = checkBorder(top, bottom, left, right, intX, intY);
      if (
        !check ||
        switchSide(
          isTop,
          isBottom,
          isLeft,
          isRight,
          top,
          bottom,
          left,
          right,
          x,
          y
        )
      )
        isValidAnswer = false;
      const tempChoice = directionMap.get(temp);
      temp = loop % 2 == 0 ? tempChoice.verticale : tempChoice.horizontale;
      loop++;
      isTop = top == y;
      isBottom = bottom == y;
      isLeft = left == x;
      isRight = right == x;
    }

    if (isValidAnswer) {
      const polygon = createPolygon(directionMap, firstCorner);
      let isIn = true;
      for (let i = left; i < right; i++) {
        isIn =
          isIn &&
          pointInPolygon([i, top], polygon) &&
          pointInPolygon([i, bottom], polygon);
        if (!isIn) break;
      }
      for (let i = top; i < bottom; i++) {
        isIn =
          isIn &&
          pointInPolygon([left, i], polygon) &&
          pointInPolygon([right, i], polygon);
        if (!isIn) break;
      }
      if (isIn) {
        if (rectangleArea(firstCorner, secondCorner) > res) {
          res = rectangleArea(firstCorner, secondCorner);
        }
      }
    }
  }
}

console.log(res);
