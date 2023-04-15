// 06: 31​ - В чем разница между явным и неявным приведением типов ?
// Не явное когда привидение делает за нас сам JS. Явное когда мы сами!

// 08 : 02​ - Поток выполнения кода никогда не блокируется, что это значит ? Есть исключения ?
// 13 : 30​ - Какой будет вывод, если раскомментировать код ?
// setTimeout(() => Promise.resolve()
// 	.then(() => console.log(1))
// 	.then(() => console.log(2))
// )
// setTimeout(() => Promise.resolve()
// 	.then(() => console.log(3))
// 	.then(() => console.log(4))
// )
// Promise.resolve().then(() => console.log(5))
// Promise.resolve().then(() => console.log(6))
// console.log(7)
// 7 5 6 1 2 3 4

// 16 : 19​ - Какие цифры будут выведены ? Вопрос про наследование от Promise.
class MyPromice extends Promise {
	constructor(...args) {
		console.log(1);
		super(...args);
		console.log(2);
	}
	then(...args) {
		console.log(3);
		super.then(...args);
		console.log(4);
	}
}
MyPromice.prototype.constructor = Promise; // 012345
// MyPromice.resolve(console.log(0)).then((_) => console.log(5)); // 0 1 2 3 1 2 4 5

class Fish {
	constructor(habitat, length) {
		this.habitat = habitat
		this.length = length
	}
}
// class Trout extends Fish {
// 	constructor(habitat, length, variety) {
// 		super(habitat, length)
// 		console.log(this)
// 		this.variety = variety
// 		console.log(this)
// 	}
// }
class Trout extends Fish {
	constructor(habitat, length, variety) {
		super()
		console.log(this)
		this.habitat = habitat
		this.length = length
		this.variety = variety
		console.log(this)
	}
}
new Trout('a', 'b', 'c')

class Fish2 {
		constructor(habitat, length) {
			this.habitat = habitat
			this.length = length
		}
	renderProperties(element) {
		element.innerHTML = JSON.stringify(this)
	}
}
class Trout2 extends Fish2 {
	renderPropertiesWithSuper(element) {
		element.className = "green"
		super.renderProperties(element);
	}
}
// console.log(new Trout2('a', 'b'))
// new Trout2('a', 'b').renderPropertiesWithSuper(document.querySelector('div'))

class Fish3 {
	constructor(habitat, length) {
		this.habitat = habitat
		this.length = length
	}
	renderProperties(element) {
		element.innerHTML = JSON.stringify(this)
	}
}
class Trout3 extends Fish3 {
	constructor(habitat, length, variety) {
		super(habitat, length)
		this.variety = variety
	}
	renderPropertiesWithSuper(element) {
		element.className = "green"
		super.renderProperties(element);
	}
}
let grouper3 = new Fish3("saltwater", "26in");
console.log(grouper3);
grouper3.renderProperties(document.getElementById("grouper"));
let rainbowTrout3 = new Trout3("freshwater", "14in", "rainbow");
console.log(rainbowTrout3);
// вызываем функцию родителя
rainbowTrout3.renderProperties(document.getElementById("rainbowTrout"));
//вызываем функцию потомка
rainbowTrout3.renderPropertiesWithSuper(document.getElementById("rainbowTroutParent"));

// 29: 50​ - Какой вывод будет, если раскомментировать console.log ?
function Mashine(name, year) {
	Mashine.prototype.getFullName = function() {
		return name + ' ' + year;
	}
}
const car = new Mashine('AUDI', '1998');
const car2 = new Mashine('BMV', '2005');// из за замыкания остануться только последние переменные!
// console.log(car);
// console.log(car.getFullName());

// 34 : 45​ - При другом варианте какой будет вывод ?
function Mashine2(name, year) {
	function F() {
		F.prototype.getFullName = function () {
			return name + ' ' + year;
		}
	}
	return new F();
}
const car3 = new Mashine2('AUDI', '1998');
const car4 = new Mashine2('BMV', '2005');
// console.log(car3); // каждый раз будет создавать новая функция!
// console.log(car3.getFullName());
// console.log(car4.getFullName());

// 40 : 00​ - В чем отличие рекурсивного setTimeout и setInterval ?
let startTimeInterval = +new Date();
let startTimeTimout = +new Date();
let intervalCount = 1;
let timoutCount = 1;
const func = (from, timestamp) => {
	console.log(from, `delta: ${
		from === 'setInterval'
		? timestamp - startTimeInterval - (intervalCount++ * 1000)
		: timestamp - startTimeTimout - (timoutCount++ * 1000)}`);
};
// setInterval(function() {
// 	func('setInterval', +new Date());
// }, 1000);
// setTimeout(function run() {
// 	func('setTimeout', +new Date());
// 	setTimeout(run, 1000);
// }, 1000);

// 51 : 44​ - Задача 1(https: //jsfiddle.net/mockinterview/06...)
function findMissingnumver(arr, n) {
	const newArr = [];
	for (let i = 1; i <= arr.length + n; i++) { // i <= arr[arr.length - 1]
		newArr.push(i);
	}
	console.log(newArr)
	let missedNum = 0;
	for (let i = 1; i <= newArr.length; i++) {
		if (!arr.includes(i) && ++missedNum === n) {
			return i;
		}
	}
}
function findMissingnumver2(arr, n) {
	let workArr = Array.from(
		{length: arr[arr.length - 1] + n},
		(_, i) => i + 1
	);
	let result = workArr.reduce((acc, el) => {
		if (!arr.includes(el)) {
			acc.push(el);
		}
		return acc;
	}, []);
	console.log(result);
	return result[n - 1];
}
// //Пропущенны [5,6,7,8,...], второе пропущенное - 6
// console.log(findMissingnumver([1, 2, 3, 4], 2)); // 6    
// //Пропущенны [1,5,6,8,9,10,...], пятое пропущенное - 9
// console.log(findMissingnumver([2, 3, 4, 7, 11], 5)); // 9
// //Пропущенны [1,5,6,8,9,10,12,13,14,...], девятое пропущенное - 14
// console.log(findMissingnumver([2, 3, 4, 7, 11], 9)); // 14
// //Пропущенны [1,2,3,4,5,6,7], третье пропущенное - 3
// console.log(findMissingnumver([8, 9, 10], 3)); // 3

// // 01: 27: 51​ - Задача 2(https: //jsfiddle.net/mockinterview/9v...)
function isSorted(arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		if (arr[i] >= arr[i + 1]) {
			return false
		}
	}
	return true
}
console.log(isSorted([])); // true
console.log(isSorted([-Infinity, -5, 0, 3, 9])); // true
console.log(isSorted([3, 9, -3, 10])); // false





