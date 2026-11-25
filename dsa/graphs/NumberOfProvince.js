// There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b,
// and city b is connected directly with city c, then city a is connected indirectly with city c.

// A province is a group of directly or indirectly connected cities and no other cities outside of the group.

// You are given an n x n matrix isConnected where isConnected[i][j] = 1
// if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.

// Return the total number of provinces.

// Test Cases 1
// Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
// Output: 2

// Test Cases 2
// Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
// Output: 3

const isConnected = [
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 1],
];

const NumberOfProvince = function (isConnected) {
  let province = 0;
  const visited = new Array(isConnected.length).fill(false);

  for (let row = 0; row < isConnected.length; row++) {
    if (!visited[row]) {
      province++;
      dfs(row, visited);
    }
  }
  console.log(province);
};

const dfs = function (row, visited) {
  for (let col = 0; col < isConnected.length; col++) {
    if (isConnected[row][col] && !visited[col]) {
      visited[col] = true;
      dfs(col, visited);
    }
  }
};

NumberOfProvince(isConnected);
