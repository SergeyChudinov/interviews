class Samurai {
  constructor(name) {
    this.name = name;
  }
  hello() {
    alert(this.name)
  }
}
console.log(Samurai.__proto__)
let shogun = new Samurai('Dimych')
console.log(shogun.__proto__ === Samurai.prototype);
console.log(shogun.__proto__.__proto__ === Object.prototype)
console.log(shogun.__proto__.__proto__.__proto__); //null
console.log(shogun.__proto__.constructor);
console.log(shogun.__proto__.constructor.__proto__);
