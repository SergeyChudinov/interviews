class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    alert(this.name);
  }
}
const user = new User('Sergey')
console.log(user)
// класс - это функция
console.log(typeof User); // function
// ...или, если точнее, это метод constructor
console.log(User === User.prototype.constructor); // true
// Методы находятся в User.prototype, например:
console.log(User.prototype.sayHi); // sayHi() { alert(this.name); }
// в прототипе ровно 2 метода
console.log(Object.getOwnPropertyNames(User.prototype));


/*
Перепишите класс
Класс Clock написан в функциональном стиле. Перепишите его, используя современный синтаксис классов.
P.S. Часики тикают в консоли. Откройте её, чтобы посмотреть.
*/
function Clock({ template }) {
  let timer;
  function render() {
    let date = new Date();
    let hours = date.getHours();
    if (hours < 10) hours = "0" + hours;
    let mins = date.getMinutes();
    if (mins < 10) mins = "0" + mins;
    let secs = date.getSeconds();
    if (secs < 10) secs = "0" + secs;
    let output = template
      .replace("h", hours)
      .replace("m", mins)
      .replace("s", secs);
    console.log(output);
  }
  this.stop = function () {
    clearInterval(timer);
  };
  this.start = function () {
    render();
    timer = setInterval(render, 1000);
  };
}
let clock = new Clock({ template: "h:m:s" });
// clock.start();

// решение
class Clock2 {
  constructor({ template }) {
    this.template = template;
  }
  render() {
    let date = new Date();
    let hours = date.getHours();
    if (hours < 10) hours = "0" + hours;
    let mins = date.getMinutes();
    if (mins < 10) mins = "0" + mins;
    let secs = date.getSeconds();
    if (secs < 10) secs = "0" + secs;
    let output = this.template
      .replace("h", hours)
      .replace("m", mins)
      .replace("s", secs);
    console.log(output);
  }
  stop() {
    clearInterval(this.timer);
  }
  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}
let clock2 = new Clock2({ template: "h:m:s" });
// clock2.start();

/*
Личный Счет
Создайте 2 класса - Person для описания клиента и Account для работы с банковским счетом частного лица.
Считаем, что отрицательный баланс счета - это нормально, обрабатывать как ошибку не надо.
Person
const person = new Person('Johannes', 'Helms', '1983-01-02');
Методы
getAge() - Возвращает возраст владельца счета
Свойства
firstName - Имя
lastName - Фамилия
fullName - Имя вместе с фамилией, вычислямое свойство (используем геттер)
Account
new Account(person, 1000);
Методы
addMoney(amount, description) - Положить деньги на аккаунт с комментарием к переводу
withdrawMoney(amount, description) - Вывести деньги с аккаунта с комментарием к переводу
getAmount() - Получить текущее состояние счета
getAccountHistory() - Возвращает массив с объектами формата { timestamp: 1574434091131, target: 'in', amount: 10, description: 'ЗП' }. Поле target может иметь значения in или out.
transfer(fromAccount, toAccount, amount) - статический метод, переводит деньги с одного счета на другой
Свойства
person - Владелец счета
Пример
const alex = new Person('Alexey', 'Petrov', '1994-05-22');
const alexAccount = new Account(alex, 1000);
const helen = new Person('Helen', 'Smith', '1990-06-06');
const helenAccount = new Account(helen, 400);
alexAccount.addMoney(1000, 'Зарплата');
const amount = alexAccount.getAmount();
alexAccount.withdrawMoney(amount * 0.1, 'Налоги');
Account.transfer(alexAccount, helenAccount, 100);
helenAccount.getAmount(); // 500
alexAccount.getAmount(); // 1700
Disclamer
Конечно, математику с плавающей точкой для обработки балансов использовать не стоит - будут накапливаться ошибки вычисления. Но в данном упражнении этим можно пренебречь.
*/
class Person {
  constructor(firstName, lastName, birthDay) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDay = new Date(birthDay);
  }
  get fullName() {
    return this.firstName + " " + this.lastName;
  }
  // getAge() {
  //   return new Date().getFullYear() - +this.birthDay.slice(0, 4);
  // }
  getAge() {
    const currentDate = new Date();
    const age = currentDate.getFullYear() - this.birthDay.getFullYear();
    if (
      currentDate.getMonth() < this.birthDay.getMonth() ||
      (currentDate.getMonth() === this.birthDay.getMonth() &&
        currentDate.getDate() < this.birthDay.getDate())
    )
      return age - 1;
    return age;
  }
}

class Account {
  constructor(person, amount) {
    this.person = person;
    this.amount = amount;
    this.history = [];
  }
  addMoney(amount, description = "") {
    this.amount += amount;
    this.description = description;
    const history = {
      timestamp: Date.now(),
      target: "in",
      amount: amount,
      description: description,
    };
    this.history.push(history);
  }
  withdrawMoney(amount, description = "") {
    this.amount -= amount;
    this.description = description;
    const history = {
      timestamp: Date.now(),
      target: "out",
      amount: amount,
      description: description,
    };
    this.history.push(history);
  }
  getAmount() {
    return this.amount;
  }
  getAccountHistory() {
    return this.history;
  }
  static transfer(fromAccount, toAccount, amount) {
    fromAccount.withdrawMoney(amount);
    toAccount.addMoney(amount);
  }
}
const alex = new Person('Alexey', 'Petrov', '1994-05-22');
const alexAccount = new Account(alex, 1000); // 1000
const helen = new Person('Helen', 'Smith', '1990-06-06');
const helenAccount = new Account(helen, 400); // 400
alexAccount.addMoney(1000, 'Зарплата'); // 2000
const amount = alexAccount.getAmount();
alexAccount.withdrawMoney(amount * 0.1, 'Налоги'); // 1800
Account.transfer(alexAccount, helenAccount, 100);
helenAccount.getAmount(); // 500
alexAccount.getAmount(); // 1700
console.log(alex.getAge());

/*
Calc
Реализовать класс Calc с методами sub / add / result
В конструкторе можем передать начальное иммутабельное значение (поумолчанию 0), потом методами add и sum прибавлять и вычитать из него.
Вызов add/sub можно объединять в цепочку (fluent interface), методы возвращают новый объект класса.
По вызову result() получаем результат вычислений.
Пример использования:
const calc = new Calc();
calc.result(); // 0
calc.add(5).result(); // 0 + 5 = 5
calc.add(3).sub(10).result(); // 0 + 3 - 10 = -7
const ten = calc.add(10);
ten.sub(5).result(); // 10 - 5 = 5
ten.result(); // 10
*/
class Calc {
  constructor(initial = 0) {
    this.initial = initial;
  }
  add(num) {
    return new Calc(this.initial + num);
  }
  sub(num) {
    return new Calc(this.initial - num);
  }
  result() {
    return this.initial;;
  }
}
const calc = new Calc();
console.log(calc.result()); // 0
console.log(calc.add(5).result()); // 0 + 5 = 5  calc.add(5).result()
console.log(calc.add(3).sub(10).result()); // 0 + 3 - 10 = -7

const ten = calc.add(10);
console.log(ten)
console.log(ten.sub(5).result()); // 10 - 5 = 5
console.log(ten.result()); // 10
console.clear();

/*
Транслятор событий
Cоздайте класс EventEmitter для управления событиями. У этого класса должны быть следующие методы:
.on(event, callback) - добавить обработчик события
.off(event, callback) - удалить обработчик события
.once(event, callback) - добавить обработчик события, который сработает единожды
.emit(event, [...arg]) - вызвать все обработчики события event, можно передать аргументы
Расширьте EventEmitter классом BroadcastEventEmitter так, чтобы была возможность вызвать все обработчики всех событий:
emit("*", [...arg]) - вызвать все обработчики событий, можно передать аргументы
Event Emitter можно перевести как “транслятор” событий.
Представьте себе такую ситуацию: происходит какое-то событие, например пользователь кликнул на кнопку, на которое должны отреагировать разные участки программы. Чтобы проще организовать такую логику, используют шаблон Event Emitter, который можно реализовать разными способами. Основная идея в том, чтобы грамотно создать основу для управления событиями и реализовать возможность любым элементам “подписаться” на него (и быть в курсе происходящего).
*/
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }
  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== callback
      );
    }
  }
  once(eventName, callback) {
    const onceCallback = (args) => {
      callback(args);
      this.off(eventName, onceCallback);
    };
    this.on(eventName, onceCallback);
  }
  emit(eventName, args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        callback(args);
      });
    }
  }
}
let input = document.querySelector("input");
let button = document.querySelector("button");
let h1 = document.querySelector("h1");
let emitter = new EventEmitter();
emitter.on("event:name-changed", (data) => {
  console.log(data)
  h1.innerHTML = `New value is: ${data.name}`;
});
// emitter.once("event:name-changed", (data) => {
//   console.log(data);
//   h1.innerHTML = `New value is: ${data.name}`;
// });
// emitter.off("event:name-changed", (data) => {
// });
button.addEventListener("click", () => {
  emitter.emit("event:name-changed", { name: input.value });
});
console.log(emitter);

class BroadcastEventEmitter extends EventEmitter {
  emit(event, args) {
    if (event === "*") {
      // Вызов всех обработчиков для всех событий
      const eventNames = Object.keys(this.events);

      for (const eventName of eventNames) {
        const handlers = this.events[eventName];

        for (const handler of handlers) {
          handler.call(this, args);
        }
      }
    } else {
      // Вызов обработчиков для указанного события
      super.emit(event, args);
    }
  }
}
let emitter2 = new EventEmitter();
const multiplyTwo = (num) => {
  console.log('multiplyTwo', num * 2);
  return num * 2;
};
const multiplyThree = (num) => {
  console.log('multiplyThree', num * 3);
  return num * 3;
}
const divideTwo = (num) => {
  console.log('divideTwo', num / 2);
  return num / 2;
}
const divideThree = (num) => {
  console.log("divideThree", num / 3);
  return num / 3;
}
// Добавляем для события multiplication два обработчка
emitter2.on('multiplication', multiplyTwo);
emitter2.on('multiplication', multiplyThree);
// Вызываем событие multiplication, должны вызвать все обработчики для этого события - multiplyTwo и multiplyThree
// emitter2.emit('multiplication', 2); //////
// -> 4
// -> 6
// Удалим обработчик multiplyThree для события multiplication
emitter2.off('multiplication', multiplyThree);
// Еще раз вызываем событие multiplication, теперь срабатывает только один обработчик multiplyTwo
// emitter2.emit('multiplication', 2); //////
// -> 4
// Создадим новое событие divideTwo и добавим два обработчика:
// divideTwo - срабатывает всегда, когда вызывается событие division (до тех пор, пока не удалим этот обработчик)
//  divideThree - сработает только ОДИН раз, во время первого ВЫЗОВА события division
emitter2.on('division', divideTwo);
emitter2.once('division', divideThree);
// Вызываем событие division - срабатывают обработчики divideTwo и divideThree
emitter2.emit('division', 6);
// -> 3
// -> 2
// Вызываем еще раз событие division - срабатывает ТОЛЬКО обработчики divideTwo
emitter2.emit('division', 6);
// -> 3
// Вызываем еще раз событие division - срабатывает ТОЛЬКО обработчики divideTwo
emitter2.emit('division', 6);
// -> 3
let broadcastEmitter = new BroadcastEventEmitter();
broadcastEmitter.on('multiplication', multiplyTwo);
broadcastEmitter.on('multiplication', multiplyThree);
broadcastEmitter.on('division', divideTwo);
broadcastEmitter.on('division', divideThree);
// Вызываем все события (multiplication и division) => все обработчики для всех событий будут вызваны.
// Для события multiplication - вызовутся обработчики multiplyTwo и multiplyThree.
// Для события division - вызовутся обработчики divideTwo и divideThree.
// broadcastEmitter.emit("multiplication", 6);
broadcastEmitter.emit("*", 6);
// -> 12
// -> 18
// -> 3
// -> 2
console.log(broadcastEmitter);