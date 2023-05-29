// 03:42 - Что понимаешь под "чистым кодом"?
// 10:09 - Вопрос по символам, они равны?
let x = Symbol('str');
let y = Symbol('str');
console.log(x === y); // false
// 13:10 - Почему JSON формат, а не JSON протокол?
// 15:50 - Что мы получим при сериализации в JSON?
const roleSymbol = Symbol('userRole');
class Autor {
	#password;
	constructor(name, books, password, role) {
		this.name = name;
		this.books = [];
		this.#password = password;
		this[roleSymbol] = role;
	}
	addBook(book) {
		this.books.push(book);
	}
}
class Book {
	constructor(name, author) {
		this.name = name;
		this.author = author;
	}
}
const user = new Autor('Martin', [], 'nitram', 'admin');
user.addBook(new Book('Refactoring', user.name)); // без name будет цикл => TypeError
user.addBook(new Book('Domain', user.name));
console.log(user);
console.log(JSON.stringify(user));
// 27:19 - Мини-задачка
/*
В функцию передается число , необходимо реализовать функ , так что-бы она вернула сумму всех целых частей чисел.
n + n/2 + n/4 + n/8 + ...
25 + 12 + 6 + 3 + 1 = 47
*/
function halvingSum(num) {
	let n = 1;
	let sum = 0;
	while (n <= num) {
		sum += Math.floor(num / n);
		n *= 2;
	}
	return sum;
}
console.log(halvingSum(25));

// решение студента
function halvingSum2(num) {
	if (num === 1) return num;
	return num + halvingSum2(Math.floor(num / 2))
}
console.log(halvingSum2(25));
// 29:42 - Задачка про оставшееся число (https://jsfiddle.net/mockinterview/1y...)
/*
Прислал Валерий.
В функцию getNumber передается целое положительное число. Необходимо внутри 
функции создать массив `[1, n]`, из которого мы постепенно будем убирать 
значения. 
Каждый раз мы будем убирать значения на нечетных позициях (1-я позиция, 3-я позиция, 
то есть 0-ой индекс, 2-ой индекс и т.д.) начиная отсчет сначала с левой стороны, 
затем с правой и дальше повторяя действия до тех пор, пока в массиве не окажется 
лишь одно значение, которое и нужно вернуть из функции.
Пример:
Передали в функцию 9, получили массив:
[1, 2, 3, 4, 5, 6, 7, 8, 9]
Далее убираем все цифры на нечетных позициях начиная отсчет с левой.
[2, 4, 6, 8]   [8, 6, 4, 2] => [6, 2]
Далее убираем все цифры нечетных позициях начиная отсчет с правой.
[2, 6]
Далее убираем все цифры на нечетных позициях начиная отсчет с левой.
[6]
Возвращаем последнюю оставшуюся цифру 6.
*/
function recursion(arr) {
	let filtredArr = arr.filter((num, i) => (i % 2 !== 0));
	if (filtredArr.length > 1) {
		return recursion(filtredArr.reverse()); // [6, 2] => [2, 6]
	} else {
		return filtredArr[0];
	}
}
function getNumber(n) {
	const arr = Array.from(
		{length: n}, (_, i) => i + 1
	)
	return recursion(arr);
}

console.log(getNumber(4)); // 2
console.log(getNumber(9)); // 6
console.log(getNumber(15)); // 8
// 46:29 - Задачка про детективов (https://jsfiddle.net/mockinterview/L5...)
/*
Прислал Дмитрий Жуков.
Мы детективы и нам предстоит взломать сейф. Сейф цифровой:
 ┌───┬───┬───┐
 │ 1 │ 2 │ 3 │
 ├───┼───┼───┤
 │ 4 │ 5 │ 6 │
 ├───┼───┼───┤
 │ 7 │ 8 │ 9 │
 └───┼───┼───┘
     │ 0 │
     └───┘
У нас есть свидетель, человек, который видел как этот сейф открывают. Этот
свидетель знает какие примерно цифры были нажаты, нужно реализовать функцию
getPINs, которая принимает строку с примерным набором цифр, которые видел 
свидетель, а возвращает набор возможных PIN-кодов к сейфу в виде массива строк.
Свидетель знает в какой области была нажата кнопка, но точно не может сказать 
какая. Однако свидетель уверен что его максимальная ошибка составляет одну цифру 
в сторону (вверх, вниз, вправо или влево). То есть если свидетель говорит что
была нажата 2, значит могла быть нажата любая клавиша из `[1, 2, 3, 5]`.
*/

function getPINs(observed) {
	let possibleValuesArr = [];

	observed.split('').forEach(str => {
		function findArr(str) {
			switch (str) {
				case '1':
					return ['1','2','4'];
				case '2':
					return ['1','2','3','5'];
				case '3':
					return ['2','3','6'];
				case '4':
					return ['1','4','5','7'];
				case '5':
					return ['2','4','5','6','8'];
				case '6':
					return ['3','5','6','9'];
				case '7':
					return ['4','7','8'];
				case '8':
					return ['5','7','8','9','0'];
				case '9':
					return ['6','8','9'];
				case '0':
					return ['0','8'];
			}
		}
		const newArr = findArr(str);
		possibleValuesArr.push(newArr);
	});
	console.log(possibleValuesArr);
	// ['1', '2', '4']
	// ['2', '3', '6']
	// ['1', '2', '3', '5']
	const length = possibleValuesArr.length;
	
	const array = [];
	let str = ''; // '1'
	function recursion(arr, i) {
		arr[length - i].forEach(el => {
			if (i === 1) {
				array.push(str + el);
			} else if (i > 1) {
				const oldStr = str;
				str = str + el;
				recursion(possibleValuesArr, i - 1);
				str = oldStr;
			}
		})
		return array;
	}
	return recursion(possibleValuesArr, length)
}
// console.log(getPINs("7")); // ['4', '7', '8']
// console.log(getPINs("8")); // ["5", "7", "8", "9", "0"]
// console.log(getPINs("11")); // ['11', '12', '14', '21', '22', '24', '41', '42', '44']
console.log(getPINs("132")); // 
// console.log(getPINs("00")); // ['00', '08', '80', '88']
// console.log(getPINs("55555")); // 

// решение студента
function getPINs2(observed) {
	const arrObserved = observed.split('');
	const variants = [
		['0','8'],
		['1','2','4'],
		['1','2','3','5'],
		['2','3','6'],
		['1','4','5','7'],
		['2','4','5','6','8'],
		['3','5','6','9'],
		['4','7','8'],
		['5','7','8','9','0'],
		['6','8','9']
	];
	// ['1', '2', '4']
	// ['2', '3', '6']
	// ['1', '2', '3', '5']
	if (arrObserved.length === 1) return variants[+arrObserved[0]];

	const nums = variants[arrObserved[0]];
	const nextVariants = getPINs2(observed.slice(1));

	const variantsOfNum = [];

	for (let i = 0; i < nums.length; i++) {
		for (let j = 0; j < nums.length; j++) {
			variantsOfNum.push(nums[i] + nextVariants[j])
		}
	}
	return variantsOfNum;
}
console.log(getPINs("132")); //
