var yourArray = [
  {
    Name: "Farley, Charley",
    Characteristics: {
      Index: 1,
      EmployeeCode: "13",
      PaymentType: "Void",
      CheckDate: "01/04/2012",
    },
  },
  {
    Name: "Farley, Charley",
    Characteristics: {
      Index: 2,
      EmployeeCode: "12",
      PaymentType: "Void",
      CheckDate: "01/04/2012",
    },
  },
  {
    Name: "Tarley, Charley",
    Characteristics: {
      Index: 3,
      EmployeeCode: "12",
      PaymentType: "Void",
      CheckDate: "01/04/2012",
    },
  },
  {
    Name: "Tarley, Charley",
    Characteristics: {
      Index: 4,
      EmployeeCode: "14",
      PaymentType: "Void",
      CheckDate: "01/04/2012",
    },
  },
  {
    Name: "Anish, Charley",
    Characteristics: {
      Index: 5,
      EmployeeCode: "15",
      PaymentType: "Void",
      CheckDate: "01/04/2012",
    },
  },
];

let duplicateArray = [];
let arr = [];

for (const ele of yourArray) {
  if (arr.indexOf(ele) === -1) {
    arr.push(ele);
  } else {
    duplicateArray(ele);
  }
}

console.log(duplicateArray);
