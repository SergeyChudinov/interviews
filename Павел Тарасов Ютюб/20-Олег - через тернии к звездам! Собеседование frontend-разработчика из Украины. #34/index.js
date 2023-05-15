// 06:54 - Вопросы с Promise'ом.
// if let - Cannot access 'promise' before initialization
var promise = new Promise((res, rej) => { 
	res(promise);
});
console.log(promise); // Promise {<fulfilled>: undefined}

// let promise2 = new Promise((res, rej) => {
// 	setTimeout(
// 		() => res(promise2),
// 		1000
// 	)
// });
// console.log(promise2);  // Promise {<pending>} потом ошибка!
// 13:59 - Серия дурацких вопросов по JS.
console.log([] == ''); // true [] => 0, '' => 0
console.log(Boolean([]) == Boolean('')); // false
// 16:53 - Вопрос про параметры addEventListener
// options => capture: Boolean , once: Boolean , passive: Boolean 
// 22:00 - well-know symbols, для чего они нужны?
//Символ (symbol) – примитивный тип данных, использующийся для создания уникальных идентификаторов. 
// 30:24 - Задача 1, доминантные элементы массива (https://jsfiddle.net/mockinterview/xh...)
/*
Доминантыне элементы массива, кот больше чем все елементы следующие за ним.
Напишите функцию которая пинимает массив чисел и возвращает массив из доминантных чисел.
*/
function solve2(arr) {
	const array = [];
	for (let i = 0; i < arr.length; i++) {
		const max = Math.max(...arr.slice(i));
		if (arr[i] === max && !array.includes(max)) array.push(max);
	}
	return array;
}

function solve(arr) {
	return arr.filter((el, i, array) => array.slice(i + 1).every(e => el > e));
}
console.log(solve([16,17,14,3,14,5,2])) // [17,14,5,2]
console.log(solve([92,52,93,31,89,87,77,105])) // [105]
console.log(solve([75,47,42,56,13,55])) // [75,56,55]
console.log(solve([67,54,27,85,66,88,31,24,49])) // [88,49]
// 55:24 - Задача 2, склеиваем интервалы (https://jsfiddle.net/mockinterview/ov...)
/*
Мы получанм массив строк, состоящих из интервалов натуральных чисел, разделенных дефисом ('1-5'). Нужно вернуть массив строк в таком же формате, но склеев пересекающиеся интервалы.
*/
function intersect(arr) {
	return arr.map((el, i) => {
		const index = el.indexOf('-');
		const el1_1 = +el.substring(0, index); // 1
		const el1_2 = +el.substring(index + 1); // 5
		for (let j = i + 1; j < arr.length; j++) {
			const index2 = arr[j].indexOf('-');
			const el2_1 = +arr[j].substring(0, index2); // 2
			const el2_2 = +arr[j].substring(index2 + 1); // 6
			if ((el2_1 >= el1_1 && el2_1 <= el1_2) || (el2_2 >= el1_1 && el2_2 <= el1_2)) {
				let min = Math.min(el1_1, el2_1);
				let max = Math.max(el1_2, el2_2);
				arr[j] = '';
				return `${min}-${max}`;
			}
		}
		return el;
	}).filter(el => el !== '');
}
console.log(intersect(['1-5', '7-9', '2-6'])) // ['1-6', '7-9']
console.log(intersect(['2-4', '5-5', '5-15'])) // ['2-4', '5-15']
console.log(intersect([])) // []


// 01:29:49 - Иммутабельность (вопрос из чата)

// 01:41:49 - Вопросы из чата - завезут в JS многопоточность? (вопрос из чата)



