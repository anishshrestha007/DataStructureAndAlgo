const directions = [
  [0, -1],
  [0, 1],
  [1, 0],
  [-1, 0],
];

const traversalDfs = function () {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const visited = new Array(matrix.length)
    .fill(0)
    .map((a) => new Array(matrix[0].length).fill(false));
  const values = [];

  dfs(matrix, 0, 0, values, visited);
  console.log(values);
};

const dfs = function (matrix, row, col, values, visited) {
  if (
    row < 0 ||
    col < 0 ||
    row >= matrix.length ||
    col >= matrix[0].length ||
    visited[row][col]
  ) {
    return;
  }
  values.push(matrix[row][col]);
  visited[row][col] = true;
  for (let index = 0; index < directions.length; index++) {
    const element = directions[index];
    dfs(matrix, row + element[0], col + element[1], values, visited);
  }
};

traversalDfs();
