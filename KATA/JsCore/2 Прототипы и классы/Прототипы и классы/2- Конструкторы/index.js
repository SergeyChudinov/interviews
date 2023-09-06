// Получение класса
function classof(object) {
  return Object.prototype.toString.call(object).slice(8, -1);
}
console.log(classof(""));
console.log(classof([]));
console.log(classof({}));
console.log(classof(function () {}));
console.log(classof(123));
console.log(classof(true));
console.log(classof(/\d/));

/*
Возможно ли создать функции A и B, чтобы new A() == new B()?
*/
let obj = {};
function A() {
  return obj;
}
function B() {
  return obj;
}
console.log(new A() == new B()); // true

/*
Создайте калькулятор при помощи конструктора, new Calculator
Создайте функцию-конструктор Calculator, которая создаёт объекты с тремя методами:
read() запрашивает два значения при помощи prompt и сохраняет их значение в свойствах объекта.
sum() возвращает сумму этих свойств.
mul() возвращает произведение этих свойств.
*/
function Calculator() {
  this.read = function () {
    this.a = prompt("Введите a");
    this.b = prompt("Введите b");
  };
  this.sum = function() {
    return +this.a + +this.b
  }
  this.mul = function () {
    return +this.a * +this.b;
  };
}
let calculator = new Calculator();
// calculator.read();
// console.log("Sum=" + calculator.sum());
// console.log("Mul=" + calculator.mul());

/*
Создайте new Accumulator
Создайте функцию-конструктор Accumulator(startingValue).
Объект, который она создаёт, должен уметь следующее:
Хранить «текущее значение» в свойстве value. Начальное значение устанавливается в аргументе конструктора startingValue.
Метод read() должен использовать prompt для считывания нового числа и прибавления его к value.
Другими словами, свойство value представляет собой сумму всех введённых пользователем значений, с учётом начального значения startingValue.
*/
function Accumulator(value) {
  this.value = value
  this.read = function() {
    this.value += +prompt('Введите число')
  }
}
let accumulator = new Accumulator(1); // начальное значение 1
// accumulator.read(); // прибавляет введённое пользователем значение к текущему значению
// accumulator.read(); // прибавляет введённое пользователем значение к текущему значению
console.log(accumulator.value); // выведет сумму этих значений

/*
Library
Реализуйте функционал для работы с книгами в библиотеке:

создание книги(добавление новой книги в библиотеку)
Выдача книги читателю
Получение книги от читателя
Получение у кого книга сейчас находится
Необходимо создать контруктор объектов Book, который будет создавать объекты со следующими полями:
name - имя книги
author - имя автора
year - год книги
reader - текущий читатель книги(у кого она на руках) - если она сейчас свободна - должно быть равно null
Необходимо реализовать на прототипе следующие методы работы с книгой:
isAvailable() // true/false - доступна ли книга для выдачи или она у кого-то на руках
takeBook(readerName) - должен выдавать книгу читателю, если она доступна для выдачи и записывать его имя в reader, возвращает true, если выдача книги возможна и она произведена, false, если книга уже выдана
returnBook() - регистрирует возврат книги, устанавливает reader в null, возвращает true, если книга была на руках, false если книга итак в библиотеке
changeBookName(newBookName) - изменяет название книги на newBookName, возвращает true/false, в зависимости от результата
changeAuthorName(newAuthorName) - изменяет имя автора на newAuthorName, возвращает true/false в зависимости от результата
getCurrentReader() - возвращает имя текущего читателя или null, если книга доступна для выдачи
*/
function Book(name, author, year) {
  this.name = name;
  this.author = author;
  this.year = year;
  this.reader = null;
}
Book.prototype.isAvailable = function() {
  return this.reader === null;
}
Book.prototype.takeBook = function (readerName) {
  if (!this.reader) {
    this.reader = readerName;
    return true
  }
  return false;
};
Book.prototype.returnBook = function () {
  if (this.reader) {
    this.reader = null;
    return true
  }
  return false;
};
Book.prototype.changeBookName = function (newBookName) {
  if (!this.reader) {
    this.name = newBookName;
    return true;
  }
  return false;
};
Book.prototype.changeAuthorName = function (newAuthorName) {
  if (!this.reader) {
    this.author = newAuthorName;
    return true;
  }
  return false;
};
Book.prototype.getCurrentReader = function () {
  return this.reader;
};
const book = new Book('1984', 'Роман, Джордж Оруэлл', 1949);
console.log(book.takeBook('sergey'))
console.log(book.getCurrentReader());
console.log(book)