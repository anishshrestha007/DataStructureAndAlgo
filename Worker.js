self.addEventListener("message", (ev) => {
  const data = ev.data;
  const name = data.methodName,
    values = data.values;
  if (data) {
    switch (name) {
      case "sum":
        let sumOfArray = values.reduce((agg, v) => {
          return agg + v;
        });

        self.postMessage(sumOfArray);

        break;

      default:
        break;
    }
  }
});
