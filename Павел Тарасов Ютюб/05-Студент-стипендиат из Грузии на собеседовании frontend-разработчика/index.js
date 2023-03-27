//08:39 - Какая разница между attribute и property у DOM-элементов?
const input = document.querySelector('input');
console.log(input.getAttribute('value'));
console.log(input.value);
const button = document.querySelector('button');
button.addEventListener('click', () => {
	console.log(input.getAttribute('value'));
	console.log(input.value);
})
//12:08 - Вопрос про установку конструктора.
class MyArray extends Array {
	// static get[Symbol.species]() { // 2-й способ
	// 	return Array;
	// }
}
MyArray.prototype.constructor = Array; // 1-й способ
const arr = new MyArray(1, 2, 3);
const result = arr.map(x => x * x);
console.log(result); // MyArray(3) [ 1, 4, 9 ] 
console.log(result instanceof MyArray); // true
console.log(result instanceof Array); // true
//26:54 - Задача 1 (https://jsfiddle.net/mockinterview/db...)
/*
Прислал Тимур Гутнов
Мы разрабатываем банкомат.
В банкомате купюры могут быть разного номинала, например - 50, 100,
500, 1000, 5000 руб.
Есть ограничение на количество каждой из купюр (объект limitsObj).
Нужно вернуть купюры и их количество, которыми можно выдать
запрашиваемую сумму, в виде строки указанного формата. Начинать с
самой крупной.
Если выдать запрашиваемую сумму не получается, выбросить ошибку.
*/
const getMoney = function (sum, limits) {
	const array = Object.entries(limits).reverse();
	let string = '';
	for (const arr of array) {
		if (sum >= arr[0] && arr[1] > 0) {
			const minValue = Math.min(Math.floor(sum / arr[0]), arr[1]);
			sum -= (minValue * arr[0]);
			string += `${minValue}x${arr[0]} `;
		}
	}
	if (sum > 0) {
		return new Error('Недостаточно купюр!')
	}
	return string.trim();
};
const limitsObj = {
	5000: 4,
	1000: 5,
	500: 2,
	100: 7,
	50: 100
};
console.log(getMoney(3600, limitsObj)); // "3x1000 1x500 1x100"
console.log(getMoney(6650, limitsObj)); // "1x5000 1x1000 1x500 1x100 1x50"
console.log(getMoney(22000, limitsObj)); // "4x5000 2x1000"
console.log(getMoney(100000, limitsObj)); // Uncaught Error: Not enough bank notes.

//53:58 - Задача 2 (https://jsfiddle.net/mockinterview/xn...)
/*
Задание с https://learn.javascript.ru/
Создайте декоратор spy(func), который должен возвращать обёртку,
которая сохраняет все вызовы функции в своём свойстве calls.
Каждый вызов должен сохраняться как массив аргументов.
*/
function spy(func) {
	const newFunc = function(...args) {
		func.apply(this, args);
		newFunc.calls.push(args);
	}
	newFunc.calls = []; // [ [ 1, 2 ], [ 4, 5 ] ]
	return newFunc;
}

function work(a, b) {
	console.log(a + b);
}
work = spy(work);
work(1, 2); // 3
work(4, 5); // 9
for (let args of work.calls) {
	console.log('call:' + args.join()); // "call:1,2", "call:4,5"
}

//01:09:44 - Задача 3 (https://jsfiddle.net/mockinterview/qc...)
/**
 * Прислал Dead__ Angel_ (задача с реального собеседования)
 * Function getSortedString
 * @param {string} str - String with numbers.
 * Create a function that receives sequence of numbers as a string
 * and returns another string with the same numbers,
 * but sorted by the sum of its characters.
 * If 2 numbers are of the same sum value, sort them as strings.
 */
function getSortedString(str) { // Мое решение!
	return str.split(' ').sort((a, b) => {
		const sumA = a.split('').reduce((acc, str) => acc + +str, 0);
		const sumB = b.split('').reduce((acc, str) => acc + +str, 0);
		if (sumA !== sumB) {
			return sumA - sumB;
		} else {
			if (a < b) {
				return -1; // return a - b;
			} else {
				return 1; 
			}
		}
	}).join(' ');
}
//   1    4   10  15  18   <- sum of digits below
// "1000 1111 280 456 99"  <- expected string in console.log
console.log(getSortedString("280 456 1111 99 1000"));
//   1   9  9  11 11 11 14 14 18   <- sum of digits below
// "100 180 90 56 65 74 68 86 99"  <- expected string in console.log
console.log(getSortedString("74 56 65 100 99 180 68 86 90"));

function getSortedString(str) { // Мое решение!
	return str.split(' ').sort((a, b) => {
		const sumA = a.split('').reduce((acc, str) => acc + +str, 0);
		const sumB = b.split('').reduce((acc, str) => acc + +str, 0);
		if (sumA !== sumB) {
			return sumA - sumB;
		} else {
			return a > b ? 1 : -1;
		}
	}).join(' ');
}
//   1    4   10  15  18   <- sum of digits below
// "1000 1111 280 456 99"  <- expected string in console.log
console.log(getSortedString("280 456 1111 99 1000"));
//   1   9  9  11 11 11 14 14 18   <- sum of digits below
// "100 180 90 56 65 74 68 86 99"  <- expected string in console.log
console.log(getSortedString("74 56 65 100 99 180 68 86 90"));

const array = [7, 3, 6, 2, 5];
function fn(arr) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = i; j < arr.length; j++) {
			if (arr[i] > arr[j]) {
				let t = arr[i];
				arr[i] = arr[j];
				arr[j] = t;
			}	
		}
	}
	return arr;
}
console.log(fn(array))

// const value = new Boolean(false);
const value = []; // [], '0'
if (value && value == false) {
	console.log(value);
	console.log('Невозможно!');
}

//Дано 3 промиса. Что выведет в консоли?
const promise1 = () => Promise.resolve('Promise 1');
const promise2 = () => Promise.reject(new Error('Kinda error'));
const promise3 = () => new Promise((resolve, reject) => resolve ? resolve('Promise 3') : reject());
Promise.all([promise1(), promise2(), promise3()]).then(console.log).catch((err) => {
	console.log(err);
});
