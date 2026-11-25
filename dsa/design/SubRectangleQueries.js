/**
 * @param {number[][]} rectangle
 */
var SubrectangleQueries = function (rectangle) {
  this.rectangle = rectangle;
};

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @param {number} newValue
 * @return {void}
 */
SubrectangleQueries.prototype.updateSubrectangle = function (
  row1,
  col1,
  row2,
  col2,
  newValue
) {
  var me = this;
  var inputArr = me.rectangle;

  for (i = row1; i <= row2; i++) {
    for (j = col1; j <= col2; j++) {
      inputArr[i][j] = newValue;
    }
  }
};

/**
 * @param {number} row
 * @param {number} col
 * @return {number}
 */
SubrectangleQueries.prototype.getValue = function (row, col) {
  return this.rectangle[row][col];
};

/**
 * Your SubrectangleQueries object will be instantiated and called as such:
 * var obj = new SubrectangleQueries(rectangle)
 * obj.updateSubrectangle(row1,col1,row2,col2,newValue)
 * var param_2 = obj.getValue(row,col)
 */

var obj = new SubrectangleQueries([
  [1, 2, 1],
  [4, 3, 4],
  [3, 2, 1],
  [1, 1, 1],
]);
obj.updateSubrectangle(0, 0, 3, 2, 5);
var param_2 = obj.getValue(0, 2);
