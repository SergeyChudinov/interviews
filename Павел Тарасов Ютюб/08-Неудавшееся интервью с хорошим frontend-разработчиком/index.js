/*03:52 - Почему не стоит создавать глобальные переменные?
Проблемы с глобальными переменными заключаются в том, что они будут доступны во всем коде JavaScript вашего приложения 
или страницы. Они находятся в глобальном пространстве имен, и всегда есть шанс для коллизий именования, когда две разных
части приложения определяют глобальные переменные с одинаковым именем, но для разных целей.
Также, обычно, веб страница включает код, написанный другими разработчиками.Например:
	Другие библиотеки JavaScript.
	Скрипты партнеров по рекламе.
	Код для отслеживания пользователей и аналитики.
	Разные виджеты, кнопки и плагины.
*/
/*
04:38 - Что можешь рассказать про БЭМ?
БЭМ — компонентный подход к веб-разработке, в основе которого лежит принцип разделения интерфейса
на независимые блоки, а также набор интерфейсных библиотек, фреймворков и вспомогательных 
инструментов. Расшифровывается как «Блок, Элемент, Модификатор».
В основе БЭМ — соглашение по именованию, которое делает имена CSS-классов максимально информативными 
для разработчиков и позволяет многократно использовать компоненты.
*/
/*07:08 - Что такое SPA-сайты и какие проблемы у SPA-сайтов с SEO? Как исправлять недочеты? - Single Page Application
SPA работает так: когда пользователь открывает страницу, браузер загружает сразу весь код приложения.
Но показывает только конкретный модуль— часть сайта, которая нужна пользователю.Когда пользователь переходит в 
другую часть приложения, браузер берёт уже загруженные данные и показывает ему.И, если нужно, динамически подгружает 
с сервера нужный контент без обновления страницы.
С одной стороны, такие приложения работают быстро и меньше нагружают сервер.С другой стороны, они требуют большей загрузки на старте.
SEO(англ.Search Engine Optimization)– это комплекс мер по улучшению сайта для его ранжирования в поисковых системах.
*/
/*13:50 - Чем отличается git pull и git fetch?
pull скачивает и делает и делает marge
fetch только скачивает
*/
/*14:23 - Использовал когда-нибудь git stash?
Команда git stash позволяет на время« сдать в архив»(или отложить) изменения, сделанные в рабочей копии, чтобы 
вы могли применить их позже.Откладывание изменений полезно, если вам необходимо переключить контекст и вы пока не готовы к созданию коммита.
*/
//15:34 - Пишу кривой код, найти ошибки.
const inputElements = document.querySelectorAll('input');
// const events = inputElements.map(el => el.addEventListener) // оригенал
// events.forEach(event => {
// 	event('change', () => {
// 		console.log(this.value());
// 	})
// })
// Array.from(inputElements) - создаст массив из псевдомассива!
const events = inputElements.forEach(el => el.addEventListener('change', (e) => {
	console.log(e.target.value);
}))
//25:20 - Что будет в закомментированных console.log'ах?
class A {}
class B extends A {}
const b1 = new B();
b1.__proto__.five = 5;
const b2 = new B();
console.log(b1.five) // 5
console.log(b2.five) // 5
console.log(B.five) // und
console.log(A.prototype.five) // und
console.log(B.prototype.five) // 5
//27:45 - Задача 1, которую не провалили :) Сорян, в след. раз постараюсь брать что-то только если сам решал. (https://jsfiddle.net/mockinterview/ak...)
/*
Cформировать массив из элементов в седловых точках матриц. В седловой точке 
элемент является минимальным в строке и максимальным в столбце.
*/
function myFunc(matrix) {
	const obj = {}
	matrix.forEach((row, i) => {
		const minN = Math.min(...row);
		const index = row.findIndex(el => el === minN);
		obj[`min${i + 1}`] = {
			value: minN,
			index: index,
			boolean: true
		}
	})
	const minArray = Object.values(obj)

	minArray.forEach((obj, i) => {
		matrix.forEach((row, j) => {
			if (obj.value <= row[obj.index] && j !== i) {
				obj.boolean = false;
			}
		})
	})

	const res = minArray.find(obj => {
		return obj.boolean === true;
	})?.value;

	// return res ? (() => {
	// 	return res
	// })() : (() => {
	// 	return 'Нет седловой точки!';
	// })()

	if (res) {
		return res;
	} else {
		return 'Нет седловой точки!';
	}
}

const arr = [
	[150, 200, 300, 140],
	[15, 20, 3, 2],
	[111, 222, 333, 130],
	[15, 2, 43, 16],
];
const arr2 = [
	[4, 8, 7, 3],
	[5, 6, 7, 8],
	[3, 7, 1, 4],
	[2, 6, 7, 5],
];

console.log(myFunc(arr)); // 140

//01:20:09 - Задача 2 (https://jsfiddle.net/mockinterview/k1...)
/*
Дана упорядоченная последовательность чисел от 1 до N. Из нее удалили
одно число, а оставшиеся перемешали. Найти удаленное число.
*/
function getMissingNumber(arr) {
	const maxNumber = Math.max(...arr); // const maxNumber = Math.max.apply(null, arr);
	for (let i = 1; i <= maxNumber; i++) {
		if (!arr.includes(i)) {
			return i
		}
	}
}

// console.log(getMissingNumber([6, 8, 2, 4, 3, 5, 7, 10, 1])); // 9
// console.log(getMissingNumber([9, 8, 1, 7, 3, 5, 11, 2, 10, 6])); // 4