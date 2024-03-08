function StairMaster(n) {
  function climb(num) {
    debugger;
    if (num < 0) return 0;
    if (num === 0) return 1;
    return climb(num - 1) + climb(num - 2) + climb(num - 3);
  }
  if (n === 0) return 0;
  return climb(n);
}
console.log(StairMaster(4));
