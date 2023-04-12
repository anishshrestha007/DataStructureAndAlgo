document.querySelector("#grandparent").addEventListener(
  "click",
  () => {
    console.log("G");
  },
  true
); // true is for event capturing
document.querySelector("#parent").addEventListener(
  "click",
  () => {
    console.log("P");
  },
  true
);
document.querySelector("#child").addEventListener(
  "click",
  () => {
    console.log("C");
  },
  true
);

//Output:
//G
//P
//C
