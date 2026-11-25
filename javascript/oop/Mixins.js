// Example if we want to build a superman then we can say he is a man with super abilities
// So to create a superman we have to mixin mans object with a super ablities
//Code for Mixins

// First we create a man with a factory function

// Reference URL : https://www.youtube.com/watch?v=DpGuDFK4xss&list=PL7pEw9n3GkoW0ceMeoycg9D00YjPAbtvt&index=8&ab_channel=techsith

const humanBeing = function (obj) {
  let walking = false;
  let sleeping = true;
  // now we return a new object with walking ablities, obj will be the super ablities which we are going to add in
  return Object.assign({}, obj, {
    walk() {
      walking = true;
      sleeping = false;
      return this;
    },
    isWalking() {
      return walking;
    },
  });
};

const superAbilities = function (obj) {
  let flying = false;
  // now we return new object with flying method

  return Object.assign({}, obj, {
    fly() {
      flying = true;
      return this;
    },
    isFlying() {
      return flying;
    },
  });
};

// now we create a superman

const superman = Object.create(humanBeing(superAbilities({})));

console.log(superman);
