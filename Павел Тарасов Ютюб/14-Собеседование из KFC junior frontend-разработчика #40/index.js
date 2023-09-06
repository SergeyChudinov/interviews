// 04: 54 - scss - шаблон % , что это ?
/*
Шаблонные селекторы
Препроцессор SASS вводит новый тип селекторов— шаблонные.Из их названия становится понятно, 
что они служат для создания шаблонов стилей, которые можно применять в разных частях таблицы стилей.
Создадим шаблон для флекс - контейнера, внутри которого элементы должны центрироваться по всем осям.
Чтобы создать шаблонный селектор, используется символ % и присваивается уникальное имя:
%flex - element - center {
	display: flex;
	justify - content: center;
	align - items: center;
}
Если попробовать скомпилировать данный код, то в файле.css мы получим пустоту.Такие шаблоны никак не 
компилируются до тех пор, пока не будут использованы.Это помогает хорошо структурировать код внутри 
проекта, так как теперь мы можем иметь даже целый файл с различными шаблонами.
Чтобы применить эти стили к элементу, используется директива @extend.Добавим наш шаблон в CSS:
%flex - element - center {
	display: flex;
	justify - content: center;
	align - items: center;
}
.flex-center {
	@extend %flex-element-center;
}
*/

// 06 : 35 - Расскажи про eventloop
// Микротаск(все)=> Макротаск(1)=> рендер
console.log('Hi');
setTimeout(function cb1() {
	console.log('cb1');
}, 5000);
console.log('Bye');
// 11: 59 - Что за аббревиатуры DRY, KISS, YAGNI ?
/*
	DRY– Don’ t repeat yourself– принцип призывает Вас не повторяться при написании кода.Все что Вы пишите в проекте,
должно быть определено только один раз.
	KISS– keep it short simple– делайте вещи проще.Порой наиболее правильное решение– это наиболее простая реализация
задачи, в которой нет ничего лишнего.
	YAGNI— You ain’ t gonna need it– вам это не понадобится.Все что не предусмотрено техническим заданием проекта,
не должно быть в нем.
*/
// 14 : 22 - Задача 1(https: //jsfiddle.net/mockinterview/xk...)
/*
Прислал Den Pol, задача с реального собеса.
Дан массив строк arr.
Требуется написать функцию, которая принимает произвольную строку.
Функция должна проверить, существует ли как минимум два значения в
массиве, которые являются анаграммами к переданной в функцию строке,
если такие строки существуют, тогда функция должна вернуть первую
встретившуюся в массиве строку-анаграмму.
В случае если анаграмм в массиве менее 2, необходимо вернуть null.
*/
const arr = ['asfd', 'asd', 'dsa', '1nkil', 'asd', 'fhk', 'lfd', 'link', 'link1'];

const getFirstAnagram = (str) => {
	const newArr = arr.filter(el => { // 'asfd'
		if (el.length !== str.length) {
			return false;
		}
		for (let i = 0; i < str.length; i++) {
			if (el.includes(str[i])) {
				const index = el.indexOf(str[i]);
				el = el.substring(0, index) + el.substring(index + 1)
			} else {
				return false;
			}
		}
		return true;
	});
	return newArr.length > 1 ? newArr[0] : null;
};
console.log(getFirstAnagram('asd')); // "asd"
console.log(getFirstAnagram('link')); // null
console.log(getFirstAnagram('link1')); // "1nkil"

// решение студента
const getFirstAnagram2 = (str) => {
	let count = 0;
	let newArr = [];
	let sortedStr = str.split('').sort().join('');
	for (let i = 0; i < arr.length; i++) {
		sortedStr === arr[i].split('').sort().join('') && ++count && newArr.push(arr[i]);
	}
	return count > 1 ? newArr[0] : null;
};

console.log(getFirstAnagram2('asd')); // "asd"
console.log(getFirstAnagram2('link')); // null
console.log(getFirstAnagram2('link1')); // "1nkil"

// 47: 48 - Задача 2(https: //jsfiddle.net/mockinterview/ta...)
/*
Прислал Andriy Oleksievets
Представьте что вы попали на собеседование в Гугл, так-вот у Гугла
очень крутая система защиты от взлома серверов. Каждый сервер
расположен на разном уровне от 0 к N, но не всё так просто чтобы
попасть на N уровень нужно пройти все N-1 уровней защиты. Ваша задача,
как собеседуемого, состоит в том чтобы получить все данные с i-го
уровня защиты.
*/
function getDataFromSecurityNumber(arr, floor) {
	let newArr = [];
	function goToAnotherLevel(arr, floor) {
		arr.forEach(element => {
			if (floor == 0 && typeof element == 'number') {
				newArr.push(element);
			} else if (floor > 0 && Array.isArray(element)) {
				goToAnotherLevel(element, floor - 1);
			}
		});
	}
	goToAnotherLevel(arr, floor)
	return newArr;
}
const array = [1, 2, 3, [4, 5], [6, [7]], [8, 9]];
console.log(getDataFromSecurityNumber(array, 0)); // [1, 2, 3]
console.log(getDataFromSecurityNumber(array, 1)); // [4, 5, 6, 8, 9]
console.log(getDataFromSecurityNumber(array, 2)); // [7]
console.log(getDataFromSecurityNumber(array, 3)); // []

// решение студента
function getDataFromSecurityNumber2(arr, floor) {
	let i = 0;
	while (i < floor) {
		arr = arr.filter(el => typeof el !== 'number');
		arr = arr.flat();
		i++
	}
	return arr.filter(el => typeof el === 'number');
}
const array2 = [1, 2, 3, [4, 5], [6, [7]], [8, 9]];

console.log(getDataFromSecurityNumber2(array2, 0)); // [1, 2, 3]
console.log(getDataFromSecurityNumber2(array2, 1)); // [4, 5, 6, 8, 9]
console.log(getDataFromSecurityNumber2(array2, 2)); // [7]
console.log(getDataFromSecurityNumber2(array2, 3)); // []
// 01: 16: 15 - Как бы ты оценил свое решение ?
// 01 : 18: 05 - Какой это - "красивый код" ?
// 01 : 18: 59 - Что такое оптимизация ?
// 01 : 20: 48 - Что такое для тебя "хороший код" ?



var arr1 = [1, 2, [3, 4]];
arr1.flat();
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


function fizzbuzz(number) {
  if (number % 3 === 0 && number % 5 === 0) return "FizzBuzz";
  if (number % 3 === 0) return "Fizz";
  if (number % 5 === 0) return "BuzzBuzz";
  return number;
}
console.log(fizzbuzz(10))