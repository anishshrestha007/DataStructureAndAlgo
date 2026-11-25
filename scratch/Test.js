// let time = "09:09AM";
// let timeArr = time.split("");
// function normalizeTime(time) {
//   return timeArr.slice(6);
// }
// function TwentyFourhourformat(time) {
//   const timeEndsWith = time.endsWith("AM") ? "AM" : "PM";
//   if (timeEndsWith === "AM") {
//     normalizeTime(time);
//   } else {
//     let newTime = timeArr.slice(3) + 12;
//   }
// }

// console.log(TwentyFourhourformat(time));
// let len = nums.length;
// var removeElement = function (nums, val) {
//   for (i = 0; i < len; i++) {
//     let j = 1;
//     if (nums[i] === val) {
//       len = replaceArray(i, nums, len, val);
//     }
//   }
//   return len;
// };

// var replaceArray = function (i, nums, len, val) {
//   for (j = i + 1; j <= len; j++) {
//     nums[j - 1] = nums[j];
//   }
//   len--;
//   if (nums[i] == val) {
//     replaceArray(i, nums, len, val);
//   }

//   return len;
// };
// let nums = [0, 1, 2, 2, 3, 0, 4, 2];
// let val = 2;

// removeElement(nums, val);

// var moveZeroes = function (nums) {
//   let len = nums.length;
//   writerPointer = len - 1;

//   for (i = 0; i < len; i++) {
//     if (nums[i] === 0 && i < writerPointer) {
//       nums[i] = nums[writerPointer];
//       nums[writerPointer] = 0;
//       writerPointer--;
//     }
//   }
//   return nums;
// };

// moveZeroes([0, 1, 0, 3, 12]);

// var canBeIncreasing = function (nums) {
//   var removeCount = 0;
//   var firstPointer = 0;
//   var secPointer = 1;
//   while (secPointer < nums.length) {
//     if (nums[firstPointer] >= nums[secPointer]) {
//       removeCount++;
//       if (
//         secPointer === nums.length - 1 ||
//         nums[secPointer + 1] > nums[firstPointer]
//       )
//         nums.splice(secPointer, 1);
//       else nums.splice(firstPointer, 1);
//       if (firstPointer > 0) {
//         firstPointer--;
//         secPointer--;
//       }
//     } else {
//       firstPointer++;
//       secPointer++;
//     }
//     if (removeCount > 1) return false;
//   }
//   return true;
// };

// function rot13(str) {
//   return str
//     .split("")
//     .map((item) => {
//       let charCode = item.charCodeAt();
//       let calculatedValue = charCode - 64 + 13;
//       if (charCode < 65 || charCode > 90) {
//         return item;
//       } else if (charCode - 64 + 13 > 26) {
//         return String.fromCharCode(charCode + 13 - 26);
//       } else {
//         return String.fromCharCode(charCode + 13);
//       }
//     })
//     .join("");
// }

// console.log(rot13("SERR-PBQR PNZC"));

// function showCustomers(customers, targetList) {
//   customers.map((customer, i) => {
//     targetList.innerHTML =
//       targetList.innerHTML +
//       `<li id= ${i}>
//     <p class="name">${customer.name}</p>
//     </li>`;
//   });
//   targetList.addEventListener("click", function (event) {
//     currentElement = event.target;
//     const currentCustomer = customers[currentElement.parentElement.id];
//     pTag = currentElement.parentElement.getElementsByTagName("p");
//     countPTag = pTag.length;
//     if (countPTag > 1) {
//       currentElement.parentElement.getElementsByClassName("email")[0].remove();
//     } else {
//       currentElement.get.innerHTML =
//         currentElement.parentElement.innerHTML +
//         `<p class="email">${currentCustomer.email}</p>`;
//     }
//   });
// }

// document.body.innerHTML = `
// <div>
//  <ul id="customers">
//  </ul>
// </div>
// `;
// let customers = [
//   { name: "John", email: "john@example.com" },
//   { name: "Mary", email: "mary@example.com" },
// ];
// showCustomers(customers, document.getElementById("customers"));

// let customerParagraph = document.querySelectorAll("li > p")[0];
// if (customerParagraph) {
//   customerParagraph.click();
// }
// console.log(document.body.innerHTML);

// function setup() {
//   // Write your code here
//   const items = ["Taco", "Pizza", "Eggs"];

//   document
//     .getElementsByTagName("ol")[0]
//     .addEventListener("click", function (event) {
//       const currElement = event.target;
//       const currentItemPosition = items.indexOf(
//         currElement.parentElement.childNodes[1].textContent
//       );
//       switch (currElement.innerHTML) {
//         case "Up!":
//           if (currentItemPosition !== 0) {
//             const temp = items[currentItemPosition];
//             items[currentItemPosition] = items[currentItemPosition - 1];
//             items[currentItemPosition - 1] = temp;
//           }

//           break;
//         case "Down!":
//           if (currentItemPosition !== items.length - 1) {
//             const temp = items[currentItemPosition];
//             items[currentItemPosition] = items[currentItemPosition + 1];
//             items[currentItemPosition + 1] = temp;
//           }

//           break;
//       }

//       const liElement = document
//         .getElementsByTagName("ol")[0]
//         .getElementsByTagName("li");
//       liElement[0].childNodes[1].nodeValue = items[0];
//       liElement[1].childNodes[1].nodeValue = items[1];
//       liElement[2].childNodes[1].nodeValue = items[2];
//     });
// }

// // Example case
// document.body.innerHTML = `<ol>
//   <li><button>Up!</button>Taco<button>Down!</button></li>
//   <li><button>Up!</button>Pizza<button>Down!</button></li>
//   <li><button>Up!</button>Eggs<button>Down!</button></li>
// </ol>`;

// setup();
// document.getElementsByTagName("button")[2].click();

// console.log(document.body.innerHTML);

// function createCheckDigit(membershipId) {
//   // Write the code that goes here.
//   debugger;
//   while (membershipId.length !== 1) {
//     membershipId = membershipId.split("");
//     membershipId = membershipId
//       .reduce((partialSum, a) => partialSum + parseInt(a), 0)
//       .toString();
//   }
//   return membershipId;
// }

// console.log(createCheckDigit("55555"));

// function endangeredSpecies(continent, species) {
//   // Your code goes here
//   const continentElement = document.querySelector(
//     `[data-continent="${continent}"]`
//   );
//   const speciesElement = continentElement.querySelector(
//     `[data-species="${species}"]`
//   );
//   return speciesElement.innerHTML;
// }

// // Example case
// document.body.innerHTML = `<div>
//   <ul data-continent="North America">
//     <li data-species="California condor">Critically Endangered</li>
//     <li data-species="American bison">Near Threatened</li>
//   </ul>
//   <ul data-continent="Europe">
//     <li data-species="Cave bear">Extinct</li>
//   </ul>
// </div>`;

// console.log(endangeredSpecies("North America", "American bison"));

// function appendChildren(decorateDiv) {
//   var allDivs = document.getElementsByTagName("div");
//   let newAllDivs = [...allDivs];
//   newAllDivs = newAllDivs.slice();

//   for (let i = 0; i < newAllDivs.length; i++) {
//     debugger;
//     var newDiv = document.createElement("div");
//     decorateDiv(newDiv);
//     allDivs[i].appendChild(newDiv);
//   }
// }

// // Example case.
// document.body.innerHTML = `
// <div id="a">
//   <div id="b">
//   </div>
// </div>`;

// appendChildren(function (div) {});
// console.log(document.body.innerHTML);

// for (var index = 0; index < 10; index++) {
//   setTimeout(() => {
//     console.log(index);
//   }, 0);
// }

// function add(a, b) {
//   this.a = a;
//   this.b = b;

//   console.log(a + b);
// }

// add.prototype.assignA = function (a) {
//   this.a = a;

//   console.log("Assign A:", this.a + this.b);
// };

// add.prototype.assignB = function (b) {
//   this.b = b;

//   console.log("Assign B:", this.a + this.b);
// };

// const a = new add(10, 10);
// a.assignA(20);
// a.assignB(20);

// function delay(timer) {
//   return new Promise((resolve, reject) => {
//     try {
//       setTimeout(() => {
//         console.log("delay");
//         resolve();
//       }, timer);
//     } catch (error) {
//       reject();
//     }
//   });
// }

// (async () => {
//   console.log("Start");
//   await delay(5000);
//   console.log("End");
// })();

// function getNames(params) {
//   let returnName = "";
//   for (let obj of params) {
//     if (obj.name) {
//       returnName += obj.name;
//     }
//   }
//   return returnName;
// }
// console.log(
//   getNames([
//     {
//       name: "Anish1",
//     },
//     {
//       age: "Anish",
//     },
//     {
//       sex: "Anish",
//     },
//     {
//       name: "Anish",
//     },
//     {
//       name: "Anish2",
//     },
//   ])
// );

//Encapsulation
let arrayOfThree = function () {
  var data = [1, 2, 3];
  // let obj = {
  //   multiplyByTwo: function () {
  //     data = data.map((it) => it * 2);
  //     console.log("After Multiply", data);
  //   },
  //   divideByTwo: function () {
  //     data = data.map((it) => it / 2);
  //     console.log("After Divide", data);
  //   },
  // };
  // return obj;
  function nameless(params) {
    console.log("Nameless");
  }
  return { nameless };
};
// let first = arrayOfThree();
// let second = arrayOfThree();

// setTimeout(first.nameless, 2000);
// setTimeout(second.multiplyByTwo, 3000);
// function Person(name) {
//   var _name = name;
//   function setName(name) {
//     _name = name;
//   }
//   function getName() {
//     return _name;
//   }

//   return [setName, getName];
// }
//Inheritance
// class Animals {
//   constructor(name) {
//     this.name = name;
//   }

//   animalName() {
//     return `${name}`;
//   }

//   greet() {
//     return `Hello I am ${name}`;
//   }
// }

// //child class
// class Pets extends Animals {
//   constructor(name, species) {
//     super(name);
//     this.species = species;
//   }

//   speciesName() {
//     return `${species}`;
//   }

//   //this method will override the "greet()" method of Animals class
//   greet() {
//     return `Hello my name is ${this.name}, I am a ${this.species}`;
//   }
// }

// let pet1 = new Pets("T", "Dog");
// console.log(pet1.greet());
