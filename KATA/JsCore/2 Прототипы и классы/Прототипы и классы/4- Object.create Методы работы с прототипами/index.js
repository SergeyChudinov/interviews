const person = Object.create(
  {
    calculateAge() {
      console.log("Age:", new Date().getFullYear() - this.birthYear);
    },
  },
  {
    name: {
      value: "Sergey",
      enumerable: true,
      writable: true,
      configurable: true,
    },
    birthYear: {
      value: 1986,
      enumerable: true,
      writable: true,
      configurable: false,
    },
    age: {
      get() {
        return new Date().getFullYear() - this.birthYear;
      },
      set(value) {
        this.birthYear = value;
      },
    },
  }
);
for (let key in person) {
	if (person.hasOwnProperty(key)) {
		console.log(key, person[key])
	}
}
person.age = 1990
console.log(person.age)
person.calculateAge()
console.log(person)

//
let animal = {
	eats: true
}
let rabbit = Object.create(animal)
console.log(rabbit)
console.clear()

/*Практическая задача 2.3.8
Object Create
В данном задании вам нужно будет реализовать полифл Object.create.
Реализуйте аналог стандартной фунции Object.create - создаёт и возвращает новый объект, прототипом которого является первый аргумент, переданный в функцию. Если передан второй аргумент - устанавливает его в качестве свойств для нового объекта. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
Ваша функция должна принимать два параметра:
prototype (обязательный) - объект или null (но не undefined), который будет являтся прототипом для созданного объекта.
properties (optional) - аргумент, который установит свойства для нового объекта (будет передан в Object.defineProperties).
Если параметры фунции отсутствуют или prototype НЕ является объектом или null, то необходимо пробросить TypeError.
В результате Object.create вернет созданный объект с внутренним свойством [[Prototype]], установленным в значение переданного в аргументе prototype. Если properties передан и НЕ является undefined, то будет вызван Object.defineProperties(obj, properties), где obj - объект,который должен быть возвращен из Object.create.
*/
console.log(null === {});

Object.create = function (proto, propertiesObject) {
	const obj = {};
	if (typeof proto === "object") {
    Object.setPrototypeOf(obj, proto);
	} else {
		throw new TypeError(
      "Параметры фунции отсутствуют или prototype НЕ является объектом или null"
    );
	}
	if (propertiesObject) {
		Object.defineProperties(obj, propertiesObject);
	}
	console.log(obj.__proto__ === proto);
	return obj;
};
const obj = Object.create({})
console.log(obj)

