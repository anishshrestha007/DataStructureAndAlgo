function cheaperFunction() {
  var timer;
  return function (fn, limit, context) {
    let args = arguments;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.call(context, ...args);
    }, limit);
  };
}

function expensiveFunction(args) {
  alert(this.target.value);
}

const cheapExpFunction = cheaperFunction();

function handleTextChange(event) {
  cheapExpFunction(expensiveFunction, 1000, event);
}
