function MaxProfitDays(prices) {
  if (prices.length <= 1) return 0;
  let i = 0,
    j = 1,
    k = 1,
    first = 0,
    last = 1;
  let max = prices[j] - prices[i];

  while (j > i && k < prices.length) {
    if (prices[k + 1] && prices[k] < prices[i]) {
      i = k;
      j = k + 1;
    }
    if (j < k && prices[j] < prices[k]) {
      j = k;
    }
    if (prices[j] && prices[j] - prices[i] > max) {
      max = prices[j] - prices[i];
      first = i;
      last = j;
    }
    k++;
  }

  return prices[last] - prices[first] > 0 ? prices[last] - prices[first] : 0;
}

console.log(MaxProfitDays([4, 2, 1, 7]));

//  i j
//  2 1 2 1 0 1 2
