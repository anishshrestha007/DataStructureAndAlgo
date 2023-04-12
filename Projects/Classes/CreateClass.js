// Example for inheritance with public class fields
class Base {
  height = 44;
  constructor() {
    console.log("Base constructor:", this.field);
  }
}

class Derived extends Base {
  field = 1;
  constructor() {
    super(); // this step calls the constructor of the Base class / Super class
    console.log("Derived constructor:", this.field);
  }
}

const instance = new Derived();

//Expected Output
//Base constructor: undefined
//Derived constructor: 1

// Example for inheritance with private class fields

class ClassWithPrivateField {
  #privateField;

  constructor() {
    this.#privateField = 42;
  }
}

class SubClass extends ClassWithPrivateField {
  #subPrivateField;

  constructor() {
    super();
    this.#subPrivateField = 23;
  }
}

const subClass = new SubClass();

// SubClass {#subPrivateField: 23}
