function User(name) {
  this.name = name;
}
User.prototype = {}; // (*)
let user = new User('John');
console.log(user);
let user2 = new user.constructor('Pete');
console.log(user2.name); // undefined
/*
Почему user2.name приняло значение undefined?
Рассмотрим, как отработал вызов new user.constructor('Pete'):
Сначала ищется свойство constructor в объекте user. Не нашлось.
Потом задействуется поиск по цепочке прототипов. Прототип объекта user – это User.prototype, и там тоже нет искомого свойства.
Идя дальше по цепочке, значение User.prototype – это пустой объект {}, чей прототип – встроенный Object.prototype.
Наконец, для встроенного Object.prototype предусмотрен встроенный Object.prototype.constructor == Object. Таким образом, свойство constructor всё-таки найдено.
В итоге срабатывает let user2 = new Object('Pete').
Вероятно, это не то, что нам нужно. Мы хотели создать new User, а не new Object. Это и есть результат отсутствия конструктора.
(На всякий случай, если вам интересно, вызов new Object(...) преобразует свой аргумент в объект. Это теоретическая вещь, на практике никто не вызывает new Object со значением, тем более, в основном мы вообще не используем new Object для создания объектов).
*/

/*
Добавьте всем функциям в прототип метод defer(ms), который вызывает функции через ms миллисекунд.
После этого должен работать такой код:
*/
Function.prototype.defer = function(ms) {
	setTimeout(this, ms)
}
function f() {
  console.log("Hello!");
}
// f.defer(1000); // выведет "Hello!" через 1 секунду

/*
Добавьте всем функциям в прототип метод defer(ms), который возвращает обёртку, откладывающую вызов функции на ms миллисекунд.
*/
Function.prototype.defer = function(ms) {
	let _this = this
	return function(a, b) {
		setTimeout(() => _this(a, b), ms);
	}
}
function f(a, b) {
  console.log(a + b);
}
// f.defer(1000)(1, 2); // выведет 3 через 1 секунду.

/*
Добавьте toString в словарь
Имеется объект dictionary, созданный с помощью Object.create(null) для хранения любых пар ключ/значение.
Добавьте ему метод dictionary.toString(), который должен возвращать список ключей, разделённых запятой. Ваш toString не должен выводиться при итерации объекта с помощью цикла for..in.
*/
let dictionary = Object.create(null);
dictionary.toString = function() {
	return Object.keys(this).join(",");
}
Object.defineProperty(dictionary, "toString", {
  enumerable: false,
});

dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // здесь __proto__ -- это обычный ключ
for(let key in dictionary) {
  console.log(key); // "apple", затем "__proto__"
}
alert(dictionary); // "apple,__proto__"

// вариант от learn.javascript.ru
let dictionary = Object.create(null, {
  toString: { // определяем свойство toString
    value() { // значение -- это функция
      return Object.keys(this).join();
    }
  }
});
dictionary.apple = "Apple";
dictionary.__proto__ = "test";
// apple и __proto__ выведены в цикле
for(let key in dictionary) {
  alert(key); // "apple", затем "__proto__"
}
// список свойств, разделённых запятой, выведен с помощью toString
alert(dictionary); // "apple,__proto__"
/*
Когда мы создаём свойство с помощью дескриптора, все флаги по умолчанию имеют значение false. Таким образом, в коде выше dictionary.toString – неперечисляемое свойство.
*/

/*
Разница между вызовами
Все эти вызовы делают одно и тоже или нет?
*/
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function () {
  console.log(this.name);
};
let rabbit = new Rabbit("Rabbit");

rabbit.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit).sayHi();
rabbit.__proto__.sayHi();
/*
В первом вызове this == rabbit, во всех остальных this равен Rabbit.prototype, так как это объект перед точкой.
Так что только первый вызов выведет Rabbit, а остальные – undefined:
*/

/*
IsEmpty
Напишите функцию isEmpty, которая возвращает true, если у объекта нет свойств(у самого объекта, не у прототипов), иначе возвращает false.

Напишите функцию isEmptyWithProtos, которая возвращает true, если у объекта и его прототипов(не включая Object.prototype) нет свойств, иначе возвращает false.
Обрати внимание на то, что функция isEmptyWithProtos проверяет наличие свойств не только у самого объекта, но и у его прототипов. Если создать пустой объект литерально (просто через фигурные скобки как в примере {}) то у такого объекта автоматически будет прототип Object. Поэтому isEmptyWithProtos возвращает false для таких объектов.
*/

function isEmpty(obj) {
	if (Object.keys(obj).length) return false;
	return true
}
const obj = Object.create(null);
console.log(isEmpty(obj)); // -> true
console.log(isEmpty({ prop: 'value' })); // -> false

function isEmptyWithProtos(obj) {
	for (let key in obj) {
    if (obj[key] !== undefined) return false;
  }
  return true;
}
const protoObj = Object.create(null);
const obj2 = Object.create(protoObj);
console.log(isEmptyWithProtos(obj2)); // -> true
console.log(isEmptyWithProtos({})); // -> false
// console.clear();