const rows = document.querySelectorAll(".row");
let currMap = new Array(30)
  .fill()
  .map(() => new Array(30).fill().map(() => [false, null]));
let nextMap = currMap.map((row) => row.map((item) => [...item]));

const start = document.querySelector("button");
rows.forEach((row, i) => {
  Array.from(row.children).forEach((cell, j) => {
    currMap[i][j][1] = cell;
    cell.addEventListener("click", () => {
      currMap[i][j][0] = true;
      cell.style.background = "#aaa";
    });
    cell.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      currMap[i][j][0] = false;
      cell.style.background = "#121212";
    });
  });
});

const aroundCount = (map, i, j) => {
  let count = 0;
  for (let idx = i - 1; idx <= i + 1; idx++) {
    if (map[idx] !== undefined) {
      for (let jdx = j - 1; jdx <= j + 1; jdx++) {
        if (i === idx && j === jdx) {
          continue;
        }
        if (map[idx][jdx] && map[idx][jdx][0]) {
          count++;
        }
      }
    }
  }
  return count;
};
let int = null;
start.addEventListener("click", () => {
  if (int) {
    start.textContent = "start";
    clearInterval(int);
    int = null;
  } else {
    start.textContent = "stop";
    nextMap = currMap.map((row) => row.map((item) => [...item]));
    int = setInterval(() => {
      for (let i = 0; i < currMap.length; i++) {
        for (let j = 0; j < currMap[i].length; j++) {
          const around = aroundCount(currMap, i, j);
          if (!currMap[i][j][0] && around === 3) {
            nextMap[i][j][0] = true;
          } else if (currMap[i][j][0] && (around > 3 || around < 2)) {
            nextMap[i][j][0] = false;
          }
        }
      }
      currMap = nextMap.map((row) => row.map((item) => [...item]));
      currMap.map((item) =>
        item.map((cell) => {
          if (cell[0]) {
            cell[1].style.background = "#aaa";
          } else {
            cell[1].style.background = "#121212";
          }
        })
      );
    }, 500);
  }
});
