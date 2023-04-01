//08:40 - Что такое чистая  функция? 
//Чистая функция — это функция, которая при одинаковых значениях аргументов всегда возвращает 
//одинаковые значения и не имеет наблюдаемых побочных эффектов.

//10: 00 - Вопрос от студента, попробуй себя в роли преподавателя.



//15: 03 - Можно ли менять const ?



//16: 25 - Интересовался optional chaining, nullish coalescing operator ?
let c = 0;
let d = 1;
let a = c || d;
let b = c ?? d;
console.log('a-', a, ' b-', b); // a- 1  b- 0


//22 : 32 - Задача 1 про влюбленную парочку(https: //jsfiddle.net/mockinterview/td...)
/*
Прислал Andriy Oleksievets

Билеты в кино.
Однажды Пётр и Кристина решили сходить в кино. Так получилось, что они
не успели забронировать билеты заранее. Поэтому, придя в кассу
кинотеатра, перед ними стоял важный выбор.
Они хотели выбрать два соседних самых дешевых места, причем так,
чтобы они располагались подальше от экрана, но поближе к середине ряда.
Пётр и Кристина очень хотят попасть на сеанс, но не знают какие места
им выбрать.
Поэтому сделайте приятное дело: помогите влюбленной паре в решении этой
задачи.

Входные данные:
data - матрица с ценами за каждый билет. Занятые места обозначаются
значением -1.

Данные к выводу:
Через пробел в круглых скобках необходимо вывести индексы двух
забронированных мест, а также общую конечную сумму покупки двух билетов
на соседние места.
Приоритет выбора мест (в порядке убывания):
1. Цена - она должна быть самая дешевая.
2. Дальность от экрана, в идеале - ряд для поцелуев (последний).
3. Чем ближе к центру, тем лучше.

Если существует несколько ответов, выведите любой.
Если ответа не существует, выведите "Bad day :(".
*/
function searchTickets(data) { //data = [[], [], []]
	let minSumPrice = data[0][0] + data[0][1];
	let position = [0, 0, 0, 1];
	let center = 2 - length;
	let availabilOfTickets = false;
	function getPosition(i, j, length) {
		position[0] = i;
		position[1] = j;
		position[2] = i;
		position[3] = j + 1;
		center = Math.abs(2 * j + 2 - length);
	}
	data.forEach((el, i)=> {
		for (let j = 0; j < el.length; j++) {
			if (el[j] != -1 && (el[j + 1] != -1 && el[j + 1])) {
				if ((el[j] + el[j + 1]) < minSumPrice) {
					minSumPrice = (el[j] + el[j + 1]);
					getPosition(i, j, el.length);
				} else if ((el[j] + el[j + 1]) === minSumPrice && Math.abs(2 * j + 2 - el.length) < center && i === position[0]) {
					getPosition(i, j, el.length);
				}
				availabilOfTickets = true;
			}
		}
	});
	if (availabilOfTickets) {
		return `(${position[0]}, ${position[1]}) (${position[2]}, ${position[3]}) ${minSumPrice}`;
	} else {
		return 'Bad day :('
	}
}
// console.log(searchTickets([
// 	[1, 1, 1, 1, 1],
// 	[-1, -1, 4, 1, 1],
// 	[-1, 3, 5, 1, 1],
// 	// экран
// ])); // => "(0, 1) (0, 2) 2"
// console.log(searchTickets([
// 	[3, 2, 1],
// 	[-1, -1, 4],
// 	[-1, 3, 5],
// 	// экран
// ])); // => "(0, 1) (0, 2) 3"
// console.log(searchTickets([
// 	[1, 2, 1],
// 	[-1, -1, 4],
// 	[1, 2, 4],
// 	// экран
// ])); // => "(0, 0) (0, 1) 3"
// console.log(searchTickets([
// 	[3, 2, 5, 1, 1],
// 	[-1, -1, 4, 2, 1],
// 	[-1, 3, 1, 1, 5],
// 	// экран
// ])); // => "(0, 3) (0, 4) 2"
// console.log(searchTickets([
// 	[-1, 1, -1, 2, -1],
// 	[-1, -1, 4, -1, 1],
// 	[2, -1, 5, -1, 1],
// 	// экран
// ])); // => "Bad day :("
// console.log(searchTickets([
// 	[3, 2, 2, 4, 5, 3],
// 	[1, 1, 1, 1, 1, 1],
// 	[1, 3, 5, -1, 1, -1],
// 	[2, -1, 5, 1, 3, -1],
// 	[1, 3, 4, 1, 1, -1],
// 	// экран
// ])); // => "(1, 2) (1, 3) 2"
// [3, 1, 1, 4, 1, 1]
// Студент
function searchTickets2(data) { //data = [[], [], []]
	const variants = [];
	const center = data[0].length / 2;
	data.forEach((row, r_ind) => {
		for (let i = 0; i < row.length -1; i++) {
			if (row[i] !== -1 && row[i + 1] !== -1) {
				variants.push({
					price: row[i] + row[i + 1],
					row: r_ind,
					center: Math.abs(center - i - 1),
					seat: i,
				});
			}
		}
	});
	console.log(variants)
	variants.sort((a, b) => {
		if (a.price !== b.price) return a.price - b.price;
		if (a.row !== b.row) return a.row - b.row;
		return a.center - b.center
	})
	return variants[0]
		? `(${variants[0].row}, ${variants[0].seat}) ${variants[0].row}, ${variants[0].seat + 1}) ${variants[0].price}` :
		'Bad day :(';
}

//58: 47 - Задача 2 про ООП с серией вопросов(https: //jsfiddle.net/mockinterview/h1...)
/*
Прислал Денис Лопатин
Задача 1:
Переписать данный код сделав это так, что-бы инстанс класса SecondClass
(second) не получал свойство data, а имел только одно свойство, которое
в нем явно указано - count. Сейчас, если вывести его в консоль (объект
second) он выглядит так:
{data: undefined, count: 7}
нам нужно, что бы он выглядет так:
{count: 7}

Использовать только ES6 синтаксис классов
Запрещено использовать оператор delete и какие либо еще способы
удаления свойств.
SecondClass должен наследоваться от FirstClass
*/
class FirstClass {
	constructor(data) {
		this.data = data; // this._data = data; private
	}
	getKey() {
		return '05837dj7:00476056ku5';
	}
}
class SecondClass extends FirstClass {
	constructor(count) {
		super();
		this.count = count;
	}
}
const first = new FirstClass(['JavaScript', 'CSS', 'HTML']);
const second = new SecondClass(7, 12);
console.log(second)
console.log(second.hasOwnProperty('data')); // true - должно быть false
console.log(first.getKey()); // '05837dj7:00476056ku5' - должно работать
console.log(second.getKey()); // '05837dj7:00476056ku5' - должно работать
//решение
class FirstClass2 {
	constructor(data) {
		this._constructor(data);
	}
	_constructor(data) {
		this.data = data;
	}
	getKey() {
		return '05837dj7:00476056ku5';
	}
}
class SecondClass2 extends FirstClass2 {
	constructor(count) {
		super(count);

	}
	_constructor(count) {
		this.count = count;
	}
}
const first2 = new FirstClass2(['JavaScript', 'CSS', 'HTML']);
const second2 = new SecondClass2(7, 12);
console.log(second2);
console.log(second2.hasOwnProperty('data')); // true - должно быть false
console.log(first2.getKey()); // '05837dj7:00476056ku5' - должно работать
console.log(second2.getKey()); // '05837dj7:00476056ku5' - должно работать
// другое решение
class AbstractClass {
	constructor(data) {
		if (this.constructor === AbstractClass) {
			throw new Error('Невозможно создать экземпляр абстрактного класса!')
		}
	}
	getKey() {
		return '05837dj7:00476056ku5';
	}
}
class FirstClass3 extends AbstractClass {
	constructor(data) {
		super()
		this.data = data;
	}
}
class SecondClass3 extends AbstractClass {
	constructor(count) {
		super();
		this.count = count;
	}
}
const first3 = new FirstClass3(['JavaScript', 'CSS', 'HTML']);
const second3 = new SecondClass3(7, 12);
console.log(second3);
console.log(second3.hasOwnProperty('data')); // true - должно быть false
console.log(first3.getKey()); // '05837dj7:00476056ku5' - должно работать
console.log(second3.getKey()); // '05837dj7:00476056ku5' - должно работать
//01: 25: 02 - Простая задача 3(https: //jsfiddle.net/mockinterview/f8...)
/*
Прислал Ivan Efimov

Необходимо реализовать функцию hasConsecutive, которая будет принимать 
список цифр (arr) и проверять, встречается ли заданная цифра (n) 
указанное число раз подряд (times). 
Функция должна возвращать true или false. 
Исходим из того, что все параметры всегда будут валидными.
*/
function hasConsecutive(arr, n, times) {
	let nTimes = 0;
	for (let i = 0; i < arr.length; i++) {
		nTimes = arr[i] === n ? ++nTimes : 0;
		if (nTimes === times) {
			return true;
		}
	}
	return false;	
	// const str = arr.join(''); // через регулярку!
	// const regExp = new RegExp(n.toString().repeat(times), 'ig');
	// return regExp.test(str);
}
console.log(hasConsecutive([1, 3, 5, 5, 3, 3, 1], 3, 2)); // true
console.log(hasConsecutive([1, 2, 3, 4, 5], 1, 1)); // true
console.log(hasConsecutive([3], 1, 0)); // true
console.log(hasConsecutive([2, 2, 3, 2, 2, 2, 2, 3, 4, 1, 5], 3, 2)); // false
console.log(hasConsecutive([5, 5, 5, 5, 5], 5, 7)); // false


//01: 30: 08 - Разговоры про чистоту кода.