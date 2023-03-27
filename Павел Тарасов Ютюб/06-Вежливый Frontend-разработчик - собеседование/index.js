//08:20 - Что такое DNS?
// DNS - Domain Name System «система доменных имён»)
//11:00 - Вопрос про приоритеты в css, какого цвета будут div'ы?
//14:04 - Что такое IIFE и пример с ключевым словом void.
//IIFE - IIFE (Immediately Invoked Function Expression) это JavaScript функция, которая выполняется сразу же после того, как она была определена.
(function() {}());
(function () {})();
(() => {})();

// void function hello() {
// 	console.log('Hello');
// }();
// console.log(hello());

//16:55 - Почему мы можем вызывать методы у скалярных значений?
//Он ищет такой метод у себя, если не находит то ищет у родителя!
let a = 5;
console.log(typeof a.toString());
// a у нас оборачивается в- new Number(a) кот является {}, и после ужу вызывается!
console.dir(a)
// a.b = 100;
// console.log(a)
// console.log(a.b)
Number.prototype.toString2 = function() {
	return String(this);
}
let b = 1;
console.log(typeof b.toString2());

//24:20 - Что выведется в console.log?
const data = [
	'HTML',
	'CSS',
	'JavaScript',
	{
		inner: {
			getValue() {
				return 0n
			},
		},
	},
];
const getResult = ([, , , {inner}] = []) => inner?.getValue();
const result = getResult(data) ?? false;
console.log(typeof result);

const arrrr = [1, 2, 3, 4, 5];
const [,,, m] = arrrr;
console.log(m) // 4
//30:16 - Что такое JSX?
//31: 11 - Что такое Virtual DOM ?  https://habr.com/ru/post/256965/ -это {}
// Virtual DOM— это техника и набор библиотек / алгоритмов, которые позволяют нам улучшить производительность на клиентской стороне,
// избегая прямой работы с DOM путем работы с легким JavaScript - объектом, имитирующем DOM - дерево.
//31:54 - Что  такое JEST? Jest — это восхитительный фреймворк для тестирования JavaScript с акцентом на простоту.
//31:13 - Какие этапы жизненного цикла ты помнишь?
//37:33 - Расскажи что такое middleware, какие middleware с redux используются? 
// это функции, которые последовательно вызываются в процессе обновления данных в хранилище, выполняет асинхронные функции!
//39:20 - Разговоры про мемоизацию в реакте.
// В react.memo нужно оборачивать ресурсоемкие функции, для оптимизации работы!
//43:55 - Задача про программиста Пашу и setTimeout в цикле (https://jsfiddle.net/mockinterview/go...)
/*
Программист Паша написал код. Ожидалось, что вывод будет  1, 2, 3, 4, 
но что-то пошло не так. Помогите Паше исправить код.
*/
var i = 0;
while (i++ < 4) {
	setTimeout(() => {
		console.log(i);
	}, i * 1000);
}

var i = 0; // решение
while (i < 4) {
	i++;
	setTimeout(((i) => () => console.log(i))(i), i * 1000);
}

//01:01:17 - Задача с типизированными массивами и отслеживанием пересечений (https://jsfiddle.net/mockinterview/us...)
/**
 * Прислал Anton
 * Необходимо дописать код так, чтобы метод "getRange" возвращал
 * подмассив массива размером "size", начиная с индекса "offset". В
 * случае пересечения возвращаемого массива с одним из уже возвращенных
 * необходимо выбросить RangeError ошибку.
 * Например:
 * В конструктор передан массив размером 5: [0, 1, 2, 3, 4]
 * вызываем getRange(0, 2) => [0,1]
 * вызываем getRange(2, 2) => [2,3]
 * вызываем getRange(3, 2) => ошибка, так как элемент с индексом 3 уже
 * был возвращен в массиве выше (массивы пересекаются)
 */
class TypedArrayRangeStorage {
	/**
	 * @param {TypedArray} typedArray
	 */
	constructor(typedArray) {
		this.typedArray = typedArray; //[0, 1, 2, 3, 4];
	}
	/**
	 * @param {number} offset
	 * @param {number} size
	 * @returns {TypedArray}
	 */
	getRange(offset, size) { // (2, 2) => [2,3]
		if (!this.arrayIndex) {
			this.arrayIndex = [];
		}
		for (let i = offset; i < offset + size; i++) {
			if (this.arrayIndex.includes(i)) {
				throw new Error(`RangeError, элемент с индексом ${i} уже был возвращен в массиве выше`)
			}
			this.arrayIndex.push(i);
		}
		const arr = this.typedArray.slice(offset, offset + size);
		return arr;
	}
}
const u8 = Uint8Array.from({
	length: 12
}, (_) => Math.random() * 8);
const rangeStorage = new TypedArrayRangeStorage(u8);
console.log(rangeStorage.getRange(4, 4));
console.log(rangeStorage.getRange(2, 2));
// console.log(rangeStorage.getRange(3, 4)); // RangeError: Invalid range: [3,7]
console.log(rangeStorage);

console.log(new Array(2, 3))
console.log(new Array(2, 3).fill(''))