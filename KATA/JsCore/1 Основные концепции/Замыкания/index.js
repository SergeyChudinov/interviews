// "use strict";
// 1
/*
	Написать свою функцию bind
*/
function bind(context, fn) {
  return function (...args) {
    fn.apply(context, args);
  };
}

function logPerson(a, b) {
  console.log(`Person: ${this.name}, ${this.age}, ${this.job}`);
  console.log(a, b);
}

const person1 = { name: "Sergey", age: 21, job: "Frontend" };
const person2 = { name: "Елена", age: 19, job: "SMM" };

bind(person1, logPerson)(1, 2);
bind(person2, logPerson)(1, 2);

// Оптимизация на практике
/*
Одним из важных побочных эффектов в V8 (Chrome, Edge, Opera) является то, что такая переменная становится недоступной при отладке.
*/
function f() {
  let value = Math.random();
  function g() {
    // debugger; // в консоли: напишите alert(value); Такой переменной нет!
  }
  return g;
}
let g = f();
g();
/*
Как вы можете видеть – такой переменной не существует! В теории, она должна быть доступна, но попала под оптимизацию движка.
Это может приводить к забавным (если удаётся решить быстро) проблемам при отладке. Одна из них – мы можем увидеть не ту внешнюю переменную при совпадающих названиях:
*/
let value = "Сюрприз!";
function f2() {
  let value = "ближайшее значение";
  function g() {
    // debugger; // в консоли: напишите alert(value); Сюрприз!
  }
  return g;
}
let g2 = f2();
g2();

// 1
let x = 1;
function func() {
  // console.log(x); // ReferenceError: Cannot access 'x' before initialization
  let x = 2;
}
func();
// 2
let arr = [1, 2, 3, 4, 5, 6, 7];
const inBetween = (a, b) => {
  return (num) => num >= a && num <= b;
};
console.log(arr.filter(inBetween(3, 6))); // 3,4,5,6
const inArr = (array) => {
  return (num) => array.includes(num);
};
console.log(arr.filter(inArr([1, 2, 10, 7])));

// 3
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" },
];
// users.sort((a, b) => a.name > b.name ? 1 : -1);
// users.sort((a, b) => a.age > b.age ? 1 : -1);
const byField = (key) => {
  return (a, b) => (a[key] > b[key] ? 1 : -1);
};
users.sort(byField("name"));
users.sort(byField("age"));
console.log(users);

// 4
function makeArmy() {
  let shooters = [];
  let i = 0;
  while (i < 10) {
    let shooter = function () {
      // функция shooter
      console.log(i); // должна выводить порядковый номер
    };
    shooters.push(shooter); // и добавлять стрелка в массив
    i++;
  }
  // ...а в конце вернуть массив из всех стрелков
  return shooters;
}
let army = makeArmy();
// все стрелки выводят 10 вместо их порядковых номеров (0, 1, 2, 3...)
army[0](); // 10 от стрелка с порядковым номером 0
army[1](); // 10 от стрелка с порядковым номером 1
army[2](); // 10 ...и т.д.

function makeArmy2() {
  let shooters = [];
  let i = 0;
  while (i < 10) {
    let j = i;
    let shooter = function () {
      // функция shooter
      console.log(j); // должна выводить порядковый номер
    };
    shooters.push(shooter); // и добавлять стрелка в массив
    i++;
  }
  // ...а в конце вернуть массив из всех стрелков
  return shooters;
}
let army2 = makeArmy2();
// все стрелки выводят 10 вместо их порядковых номеров (0, 1, 2, 3...)
army2[0](); // 10 от стрелка с порядковым номером 0
army2[1](); // 10 от стрелка с порядковым номером 1
army2[2](); // 10 ...и т.д.

function makeArmy3() {
  let shooters = [];
  for (let i = 0; i < 10; i++) {
    let shooter = function () {
      // функция shooter
      console.log(i); // должна выводить порядковый номер
    };
    shooters.push(shooter);
  }
  return shooters;
}
let army3 = makeArmy3();
army3[0](); // 0
army3[5](); // 5

// 5
/*
Реализуйте функцию once, которая принимает функцию в качестве аргумента и возвращает новую функцию, которая вызывает функцию-аргумент, но только единожды. Повторный вызов функции-результата once не должен давать никакого эффекта.
*/
const once = (fn) => {
  let once = false;

  return function () {
    if (!once) {
      fn();
      once = !once;
    }
  };
};
const fun = () => console.log("hi!");
const onceF = once(fun);
onceF(); // hi!
onceF(); // nothing

// 6
/*
Для этой задачи вам нужно будет ознакомиться с методом массива filter, который принимает функцию-коллбэк для фильтрации массива.
Реализуйте набор готовых к использованию функций для arr.filter:
inRange(a, b) – число находится между a и b (включительно).
Если аргумент или элемент массива можно привести к числу,
то функция должна сначала приводить его к числу, а потом проверять условие.
Если a > b, то функция должна возвращать false для всех элементов массива
inArray([...]) – значение находится в данном массиве.
notInArray([...]) – значение не находится в данном массиве.
Они должны использоваться таким образом:
arr.filter(inRange(3,6)) – выбирает только значения между 3 и 6 (включительно).
arr.filter(inArray([1,2,3])) – выбирает только элементы, совпадающие с одним из элементов массива
arr.filter(notInArray([1,2,3])) – выбирает только те элементы,
которые не совпадают ни с одним из элементов массива
*/
const inRange = (a, b) => {
  return (num) => num >= a && num <= b;
};
const inArray = (arr) => {
  return (num) => arr.includes(num);
};
const notInArray = (arr) => {
  return (num) => !arr.includes(num);
};
let array = [1, 2, 3, 4, 5, 6, 7, true, undefined, NaN];
console.log(array.filter(inRange(3, 6))); // [3, 4, 5, 6]
console.log(array.filter(inArray([1, 2, 10, undefined]))); // [1, 2, undefined]
console.log(array.filter(notInArray([1, 2, 3, 4, 5, 6, 7, true]))); // [undefined, NaN]

// 7
/*
createObjectCalculator
Реализуйте функцию createObjectCalculator, которая принимает в качестве аргументов два числа, а возвращает следующий объект:
Объект calculator (калькулятор) с тремя методами:
read(a, b) (читать) принимает два значения и сохраняет их как свойства объекта. sum() (суммировать) возвращает сумму сохранённых значений. mul() (умножить) перемножает сохранённые значения и возвращает результат.
Гарантируется, что оба числа, передаваемых в read всегда будут числами.
*/
const createObjectCalculator = (initialA, initialB) => {
  return {
    read(a, b) {
      initialA = a;
      initialB = b;
    },
    sum() {
      return initialA + initialB;
    },
    mul() {
      return initialA * initialB;
    },
  };
};
const calculator = createObjectCalculator(2, 3);
console.log(calculator.sum()); // 2 + 3 = 5
console.log(calculator.mul()); // 2 * 3 = 6
calculator.read(12, 34);
console.log(calculator.sum()); // 12 + 34 = 46
console.log(calculator.mul()); // 12 * 34 = 408

// 8
/*
Здесь функция makeUser возвращает объект.
Каким будет результат при обращении к свойству объекта ref? Почему?
Это потому, что правила, которые определяют значение this, никак не смотрят на объявление объекта. Важен лишь момент вызова.
Здесь значение this внутри makeUser() равно undefined, потому что оно вызывается как функция, а не через «точечный» синтаксис как метод.
Значение this одно для всей функции, блоки кода и объектные литералы на него не влияют.
Таким образом, ref: this фактически принимает текущее this функции makeUser().
*/
function makeUser() {
  return {
    name: "John",
    ref: this,
  };
}
let user = makeUser();
console.log(user.ref.name); // Каким будет результат?
// Вот противоположный случай:
//Теперь это работает, поскольку user.ref() – это метод. И значением this становится объект перед точкой ..
function makeUser2() {
  return {
    name: "John",
    ref() {
      return this;
    }
  };
}
let user2 = makeUser2();
console.log(user2.ref().name); // John
console.clear()

// 9
/*
Цепь вызовов
У нас есть объект ladder (лестница), который позволяет подниматься и спускаться:
let ladder = {
  step: 0,
  up() {
    this.step++;
  },
  down() {
    this.step--;
  },
  showStep: function () {
    // показывает текущую ступеньку
    console.log(this.step);
  },
};
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
Измените код методов up, down и showStep таким образом, чтобы их вызов можно было сделать по цепочке, например так:
ladder.up().up().down().showStep().down().showStep(); // показывает 1 затем 0
*/
let ladder = {
  step: 0,
  up() {
    this.step++;
    return this
  },
  down() {
    this.step--;
    return this;
  },
  showStep: function () {
    // показывает текущую ступеньку
    console.log(this.step);
    return this;
  },
};
ladder.up().up().down().showStep().down().showStep(); // показывает 1 затем 0