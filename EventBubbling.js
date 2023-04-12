document.querySelector("#grandparent").addEventListener(
  "click",
  () => {
    console.log("G");
  },
  false
); // false is by a default parameter which is for event bubbling
document.querySelector("#parent").addEventListener("click", () => {
  console.log("P");
});
document.querySelector("#child").addEventListener("click", () => {
  console.log("C");
});

//Output:
//C
//P
//G
