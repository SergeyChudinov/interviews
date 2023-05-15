/*
Прототипы - это механизм, с помощью которого объекты JavaScript наследуют свойства друг от друга. 
*/

d = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '/': (a, b) => a / b,
    '>=': (a, b) => a >= b
}
function exe(a, op, b) {
    return d[op](a, b);
}

console.log(exe(6, '-', 3));
console.log(exe(6, '+', 3));
console.log(exe(6, '/', 3));
console.log(exe(6, '>=', 3));

function execute(a, b, c) {
	// return eval(`a ${b} c`);
	return new Function('x', 'y', `return x ${b} y`)(a, c);
}
console.log(execute(6, '-', 3));
console.log(execute(6, '>=', 3));

function sum(a, b, o) {
	return Function('x', 'y', `return x ${o} y`)(a, b); //1
	return Function(`return ${a} ${o} ${b}`); //2
}
console.log(sum(8, 5, '-')); //1
console.log(sum(8, 5, '-')()); //2

const arr = [2,3,1,4,21]
const filterArr = arr.filter(n => n >= 2) 
console.log(filterArr)
const sortArr = arr.sort((a, b) => a - b)
console.log(sortArr)

const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
function isPrime(num) {
	for (let i = 2; num > i; i++) {
		if (num % i == 0) {
			return false;
		}
	}
	return num > 1;
}
console.log(array.filter(isPrime)); // [2, 3, 5, 7, 11, 13]

function filter(arr, func) {
	return arr.filter(func);
}
const res = filter([1, 3, 2, 4, 7, 0], n => n < 3);
console.log(res);

function filter(arr, func, thisArg) {
	let filterArr = [];
	for (let i = 0; i < arr.length; i++) {
		typeof arr[i] === 'number' && func.call(thisArg, arr[i], i, arr) && filterArr.push(arr[i]);
	}
	return filterArr;
}
// const res2 = filter([1, 3, 2, 4, 7, 0, '5'], (n, i , arr) => n < 3);
const res2 = filter([1, 3, 2, 4, 7, 0, '5'], function (val, i, arr) {
	return val < this.val;
}, {val: 5});
console.log(res2);

const a = "30";
const b = "20";
const operator = "+";
const formula = a + operator + b;
console.log(eval(formula));

const i = Infinity;
if (i + 1 === i) {
	console.log('Infinity')
}