function dog(name) {
  let behaviour = 0;

  function showName() {
    return `My name is ${name}`;
  }

  function showBehaviour() {
    return `${name} behaviour count is ${behaviour}`;
  }

  function incrementBehaviour(count = 1) {
    behaviour += count;
  }

  return {
    showName,
    showBehaviour,
    incrementBehaviour,
  };
}

var tappy = new dog("tappy");
console.log(tappy.showName());

var rester = new dog("rester");
console.log(rester.showName());
console.log(rester.showBehaviour());
rester.incrementBehaviour();
console.log(rester.showBehaviour());
console.log(tappy.showBehaviour());
