// 1- Остановка сложного процесса
// let amount = 100000;
let step = 1000;
let index = 0;
let stopped = false;
let stopCycle = () => {
	console.log(stopped);
	stopped = true;
}
let startCycle = () => {
	index = 0;
	stopped = false;
	continueCycle();
}
let continueCycle = () => {
	stopped = false;
	console.log('index', index)
	cycle(getNextMaxIndex(index))
}

function cycle(maxIndex) {
	if (stopped) {
		return;
	}
	for (let i = index + 1; i <= maxIndex; i++) {
		const a = Math.log2(i);
		console.log(`log2(${i}) = ${a}`)
	}
	let nextMaxIndex = getNextMaxIndex(maxIndex);
	index = maxIndex;
	return setTimeout(() => cycle(nextMaxIndex), 0);
}

function getNextMaxIndex(maxIndex) {
	return maxIndex + step;
}
document.querySelector('.stopCycle').addEventListener('click', () => stopCycle());
document.querySelector('.startCycle').addEventListener('click', () => startCycle());
document.querySelector('.continueCycle').addEventListener('click', () => continueCycle());
// return (maxIndex + step) > amount ? amount : maxIndex + step;

// 2- Задача
function sort(arr) {
	const numberIsEven = arr[0] % 2 === 0;
	const evenArr = [];
	const notEvenArr = [];
	for (const num of arr.reverse()) {
		if (num % 2 === 0) {
			evenArr.push(num);
		} else {
			notEvenArr.push(num);
		}
	}
	const newArr = [];
	const maxLengthArr = Math.ceil(arr.length / 2);
	for (let i = 0; i < maxLengthArr; i ++) {
		// if (!numberIsEven) {
		// 	notEvenArr[i]  && newArr.push(notEvenArr[i]);
		// 	evenArr[i]  && newArr.push(evenArr[i]);
		// } else {
		// 	evenArr[i] && newArr.push(evenArr[i]);
		// 	notEvenArr[i] && newArr.push(notEvenArr[i]);
		// }
		numberIsEven ? (evenArr[i] && newArr.push(evenArr[i])) : (notEvenArr[i] && newArr.push(notEvenArr[i]));
		numberIsEven ? (notEvenArr[i] && newArr.push(notEvenArr[i])) : (evenArr[i] && newArr.push(evenArr[i]));
	}
	return newArr;
}
console.log(sort([1, 2, 3, 4, 5, 6, 7, 8])); // [7,8,5,6,3,4,1,2]
console.log(sort([1, 2, 3, 4, 5, 6, 7])); // [7,6,5,4,3,2,1]  +
console.log(sort([2, 3, 4, 5, 6])); // [6,5,4,3,2]            +
console.log(sort([2, 3, 4, 5, 6, 7])); // [6,7,4,5,2,3]
// 2 вариант!
function sort2(arr) {
	if (arr.length % 2 === 1) {
		return arr.reverse();
	}
	const newArr = [];
	for (let i = 0; i < arr.length / 2; i++) {
		newArr.push(arr[arr.length - 2 - 2 * i])
		newArr.push(arr[arr.length - 1 - 2 * i])
	}
	return newArr;
}
console.log(sort2([1, 2, 3, 4, 5, 6, 7, 8])); // [7,8,5,6,3,4,1,2]
console.log(sort2([1, 2, 3, 4, 5, 6, 7])); // [7,6,5,4,3,2,1]  +
console.log(sort2([2, 3, 4, 5, 6])); // [6,5,4,3,2]            +
console.log(sort2([2, 3, 4, 5, 6, 7])); // [6,7,4,5,2,3]
// 3 варианте
function sort3(arr) {
	if (arr.length % 2 === 1) {
		return arr.reverse();
	}
	const result = [...arr];
	for (let i = 0; i < result.length / 2; i++) {
		const seconIndex = i % 2 === 0
			? result.length -2 - i
			: result.length - i;
		[result[i], result[seconIndex]] = [result[seconIndex], result[i]]
	}
	return result;
}
console.log(sort3([1, 2, 3, 4, 5, 6, 7, 8])); // [7,8,5,6,3,4,1,2]
console.log(sort3([1, 2, 3, 4, 5, 6, 7])); // [7,6,5,4,3,2,1]  +
console.log(sort3([2, 3, 4, 5, 6])); // [6,5,4,3,2]            +
console.log(sort3([2, 3, 4, 5, 6, 7])); // [6,7,4,5,2,3]

let n = 25;
let flag = true;
let i = 2;
while (flag) {
	if (n % i === 0) {
		flag = false;
		console.log(i)
	} else if (i > Math.floor(n / 2)) {
		console.log(n)
		flag = false;
	}
	i++
}