const obj1 = [
  {
    id: 1,
    name: "anish",
  },
  {
    id: 2,
    name: "manju",
  },
];

const returnObj = obj1.map((item) => {
  return {
    [item.id]: {
      item,
    },
  };
});

console.log(returnObj);
