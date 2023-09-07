class Car {
  constructor(name) {
    this.name = name;
  }

  get fullName() {
    return this.name;
  }
}

const CarObject = {
  get carName() {
    return this._name;
  },

  set carName(name) {
    this._name = name;
  },
};

const carFunction = function () {
  this.getCarName = function () {
    return this._carname;
  };

  this.setCarName = function (name) {
    this._carname = name;
  };
};

let redCar = new Car("red");
console.log(redCar.fullName);

let blueCar = Object.create(CarObject);

blueCar.carName = "blue";
console.log(blueCar.carName);

let blackCar = new carFunction();
blackCar.setCarName("black");

console.log(blackCar.getCarName());
