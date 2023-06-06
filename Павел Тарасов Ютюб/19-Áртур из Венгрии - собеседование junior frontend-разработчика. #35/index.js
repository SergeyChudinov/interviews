// 04:46 - Как добавить в конец и начало массива значения?
let array = [1,2,3,4];
array.splice(0,0,0);
array.splice(array.length,0,array.length);
console.log(array);

const arr1 = [1,2,3,4];
const arr2 = [0,5]; 
const arr3 = [arr2[0], ...arr1, arr2[1]];
console.log(arr3);
const arrConcat = arr2.slice(0,1).concat(arr1, arr2.slice(1));
console.log(arrConcat);
// 07:55 - Как можно в setTimeout пробросить какие-то значения для функции?
let a = 7;
setTimeout(() => {
	console.log(a);
}, 1000)

setTimeout(console.log.bind(window, a), 1000);

setTimeout(console.log, 1000, 'Классный');

setTimeout(myFunc, 1000, 'Классный');
function myFunc(arg) {
	console.log(arg);
};
// 22:15 - Чем кодировка отличается от шрифта?
// 31:26 - Переделать код на промисы.
const printSeconds = (number, callback) => {
	setTimeout(() => {
		console.log(`Прошло секунд: ${number}`);
		callback();
	}, 1000);
};
printSeconds(1, () => {
	printSeconds(2, () => {
		printSeconds(3, () => {})
	});
});

const printSeconds2 = (number) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log(`Прошло секунд: ${number}`);
			resolve();
		}, 1000);
	});
};
printSeconds2(1)
	.then(() => {
		return printSeconds2(2);
	})
	.then(() => {
		return printSeconds2(3);
	});

(async function() {
	await printSeconds2(1);
	await printSeconds2(2);
	await printSeconds2(3);
}())

// 43:34 - Задача 1 на поиск суммы индексов (https://jsfiddle.net/mockinterview/ad...)
/*
В функцию findIndex передается число и отсортированный по возрастанию массив.
Функция должна вернуть сумму двух индексов массива, элементы которых в сумме
дают число переданное первым аргументом.
*/
// && arr[i] <= val
// && arr[j] <= val
function findIndexSum(val, arr) {
	let count = 0;
	for (let i = 0; i < arr.length && arr[i] <= val; i++) {
		for (let j = i + 1; j < arr.length && arr[j] <= val; j++) {
			if (arr[i] + arr[j] === val) {
				console.log('count', count);
				return i + j;
			}
			count++
		}
	}
	console.log('count', count);
	return -1;
}

const arr = [2, 5, 8, 9, 22, 57, 94, 100, 127, 198, 345, 451];
console.log(findIndexSum(79, arr)); // 4 + 5 -> 9
console.log(findIndexSum(70, arr)); // -1
// сложность => Sn = ((1 + (n - 1)) / 2) * (n - 1) , но константы не считаются, поэтому все равно сложность будет n^2

function findIndexSum2(val, arr) {
	let start = 0;
	let end = arr.length - 1;
	while(start < end) {
		let sum = arr[start] + arr[end];
		if (sum > val) {
			end--;
		} else if (sum < val) {
			start++
		} else {
			return start + end;
		}
	}
	return -1;
}

const arr4 = [2, 5, 8, 9, 22, 57, 94, 100, 127, 198, 345, 451];
console.log(findIndexSum2(79, arr4)); // 4 + 5 -> 9
console.log(findIndexSum2(70, arr4)); // -1


// 01:10:16 - Задача 2 функция-конструктор (https://jsfiddle.net/mockinterview/p1...)
/**
 * Прислал Дмитрий Кутыршин
 *
 * Returns the rectangle object with width and height parameters and 
 * getArea() method.
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 */
function Rectangle(width, height) {
	this.width = width;
	this.height = height;
	// this.getArea = function() {
	// 	return this.width * this.height;
	// }
}
Rectangle.prototype.getArea = function() { // так метод не будет дублироваться для каждого наследника
	return this.width * this.height;
}

const r = new Rectangle(10,20);
console.log(r.width); // 10
console.log(r.height); // 20
console.log(r.getArea()); // 200

// 01:42:25 - Что в твоем понимании функциональное программирование?
// 01:55:36 - Обучение в Венгрии, как получить грант (https://apply.stipendiumhungaricum.hu).