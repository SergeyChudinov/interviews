// 05:25 - Чем отличается тип данных от структуры данных?
// 07:05 - Чем отличается HTTP 1.1 и HTTP/2
// 09:05 - Что такое long-polling запрос?
// 12:50 - Задача 1 (https://jsfiddle.net/mockinterview/pb...)
/*
Прислал Дмитрий
Реализовать функцию leftPad, которая добавляет слева к строке пробелы.
Функция принимает два аргумента: число, обозначающее минимальную длину
результата, и строку, которую нужно дополнить, если её длина меньше.
*/
function leftPad(symbolsCount, str) {
	const difference = symbolsCount - str.length;
	if (difference < 1) return str;
	return ' '.repeat(difference) + str;
}

console.log(leftPad(6, 'test')); // Вернет "  test"
console.log(leftPad(3, 'test')); // Вернет "test"
// 22:52 - Задача 2 (https://jsfiddle.net/mockinterview/96...)
/*
Прислал Игорь, задача с реального собеседования.
Создать функцию objCreator(arr), в которую передается массив строк. Функция
должна вернуть объект с вложенными объектами под свойствами, переданными в
массиве.
*/

function objCreator(arr) {

	function recursion(arr, i) {
		const obj = {}
		if (i === arr.length) {
			return {}
		} else {
			obj[arr[i]] = recursion(arr, i + 1);
			return obj;
		}
	}
	
	return recursion(arr, 0);
}
console.log(objCreator(['a', 'b', 'c'])); // {a:{b:{c:{}}}}     
console.log(objCreator(['a', 'b', 'c', 'd', 'i', 'f'])); // {a:{b:{c:{d:{}}}}}
console.log(objCreator([])); // {}

function objCreator2(arr, i = 0) {
	if (i === arr.length) {
		return {};
	} else {
		return {[arr[i]]: objCreator2(arr, i + 1)};
	}
}
console.log(objCreator2(['a', 'b', 'c'])); // {a:{b:{c:{}}}}     
console.log(objCreator2(['a', 'b', 'c', 'd', 'i', 'f'])); // {a:{b:{c:{d:{}}}}}
console.log(objCreator2([])); // {}

// решение студента
function objCreator3(arr) {
	if (arr.length === 0) {
		return {};
	} else {
		const value = arr.splice(0, 1);
		return {[value]: objCreator3(arr)};
	}
}
console.log(objCreator3(['a', 'b', 'c'])); // {a:{b:{c:{}}}}     
console.log(objCreator3(['a', 'b', 'c', 'd', 'i', 'f'])); // {a:{b:{c:{d:{}}}}}
console.log(objCreator3([])); // {}
// 42:38 - Задача 3 (https://jsfiddle.net/mockinterview/9a...)
/*
Прислал Геворг.
Необходимо реализовать функцию accum, которая принимает строку, а возвращает
другую строку, как показано в примерах.
аккумулятор ("abcd") -> "A-Bb-Ccc-Dddd"
аккумулятор ("RqaEzty") -> "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
аккумулятор ("cwAt") -> "C-Ww-Aaa-Tttt"
Параметр аккумулятора - это строка, которая включает только буквы от a..z и A..Z.
*/
function accum(str) {
	let newStr = '';
	str.split('').forEach((el, i) => {
		newStr+= el.toUpperCase();
		for (let j = 0; j < i; j++) {
			newStr+= el.toLowerCase();
		}
		newStr+= '-';
		// i !== str.length - 1 && (newStr+= '-');
	})
	
	return newStr.substring(0, newStr.length - 1);
}
console.log(accum("abcd")); // "A-Bb-Ccc-Dddd"
console.log(accum("RqaEzty")); // "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
console.log(accum("cwAt")); // "C-Ww-Aaa-Tttt"
// 52:15 - Задача 4 (https://jsfiddle.net/mockinterview/mh...)
/*
Прислал Volodya Xurshudyan

Завершите решение так, чтобы оно разбило строку на пары из двух символов.
Если строка содержит нечетное количество символов, она должна заменить
отсутствующий второй символ последней пары символом подчеркивания ('_').
*/
function solution(str) {
	let arr = [];
	let newStr = '';
	str.split('').forEach((el, i) => {
		newStr+= el;
		if (i % 2 !== 0) {
			arr.push(newStr);
			newStr = '';
		} else if (i === str.length - 1) {
			newStr+= '_';
			arr.push(newStr);
		}
	})
	return arr;
}
console.log(solution('abc')); // should return ['ab', 'c_']
console.log(solution('abcdef')); // should return ['ab', 'cd', 'ef']
// 01:04:57 - Задача 5 (https://jsfiddle.net/mockinterview/o9...)
/*
Егор скинул вопрос в телеграмм
Реализовать debounce-функцию. Функция debounce принимает функцию - `f`, также 
число миллисекунд - `ms`. Функция debounce должна вернуть другую функцию, 
которая будет вызывать функцию `f` только если с момента последнего вызова 
функции `f` прошло `ms` миллисекунд.
*/
function debounce(f, ms) {
	let firstPerformance = true;
	let time = Date.now();
	return function(text) {
		let newTime = Date.now();
		let differenceTime = newTime - time;
		console.log(differenceTime);
		if (firstPerformance || differenceTime >= ms) {
			f(text);
			time = newTime;
			firstPerformance = false;
		}
	}
}
let debounceFunc = debounce(console.log, 1000);
// выполняется немедленно
// debounceFunc('MockInterview 1');
// //ничего не выполнится, так как не прошло еще 1000 ms с последнего выполнения
// debounceFunc('MockInterview 2');
// // ничего не выполнится, так как не прошло еще 1000 ms с последнего выполнения
// setTimeout(() => debounceFunc('MockInterview 500'), 500);
// // Выполнится
// setTimeout(() => debounceFunc('MockInterview 1200'), 1200);
// // ничего не выполнится, так как не прошло еще 1000 ms с последнего выполнения
// setTimeout(() => debounceFunc('MockInterview 1500'), 1500);
// setTimeout(() => debounceFunc('MockInterview 2200'), 2200);

// вариант студента
function debounce2(f, ms) {
	let timout = false;
	return function(arg) {
		if (timout) return;
		timout = true;

		f(arg);
		this.name && console.log(this.name)
		setTimeout(() => {
			timout = false;
		}, ms)
	}
}
const user = {
	name: 'Sergey'
};
let debounceFunc2 = debounce2(console.log, 1000);
// выполняется немедленно
debounceFunc2.call(user, 'MockInterview 1');
//ничего не выполнится, так как не прошло еще 1000 ms с последнего выполнения
debounceFunc2('MockInterview 2');
// ничего не выполнится, так как не прошло еще 1000 ms с последнего выполнения
setTimeout(() => debounceFunc2('MockInterview 500'), 500);
// Выполнится
setTimeout(() => debounceFunc2('MockInterview 1200'), 1200);
// ничего не выполнится, так как не прошло еще 1000 ms с последнего выполнения
setTimeout(() => debounceFunc2('MockInterview 1500'), 1500);
setTimeout(() => debounceFunc2('MockInterview 2200'), 2200);