document.addEventListener("DOMContentLoaded", function () {
  let outputEle = document.getElementById("output");

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
  let i = 0;
  while (i < yourArray.length) {
    let j = 0;
    while (j < yourArray.length) {
      if (i == j) {
        j++;
        continue;
      }
      if (yourArray[i].Name == yourArray[j].Name) {
        duplicateArray.push(yourArray[i]);
        break;
      }
      if (
        yourArray[i].Characteristics.Index == yourArray[j].Characteristics.Index
      ) {
        duplicateArray.push(yourArray[i]);
        break;
      }
      if (
        yourArray[i].Characteristics.EmployeeCode ==
        yourArray[j].Characteristics.EmployeeCode
      ) {
        duplicateArray.push(yourArray[i]);
        break;
      }
      j++;
    }
    i++;
  }
  outputEle.innerText = JSON.stringify(duplicateArray, null, 2);
});
