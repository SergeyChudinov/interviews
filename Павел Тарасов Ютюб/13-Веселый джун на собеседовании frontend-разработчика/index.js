// 12: 00 - Вопрос про: last - child и: last - of -type
// 19: 14 - Вопросы про try / catch
try {
	try {
		throw new Error('ошибка');
	} finally {
		console.log('finally')
	}
} catch (e) {
	console.error(e.message);
}
console.log('123')

try {
	try {
		throw new Error('ошибка');
	} catch (e) {
		console.error(`внутренний  catch с ошибкой: ${e.message}`);
	} finally {
		console.log('finally')
	}
} catch (e) {
	console.error(`внешний  catch с ошибкой: ${e.message}`);
}

const f = () => {
	try {
		console.log('try 1');
		return 'try';
	} catch(e) {
		console.log('catch 1');
		return 'catch';
		console.log('catch 2');
	} finally {
		console.log('finally 1');
		return 'finally';
		console.log('finally 2');
	}
}
console.log(f()); // try 1, finally 1, finally

// 27: 29 - Ужасная задача на реальном собеседовании. Используя только ()[]!+ получить строку "u"
console.log((!+[] + [])[(!+[] + !+[])])

// ![] => false
// !+[] => true
// +[] => 0
// (+(!+[])) => 1

// 43: 20 - Спорная задачка на "пробежаться туда-обратно"(https: //jsfiddle.net/mockinterview/pw...,
// в комментариях были варианты более правильные, спасибо что подметили.
const arr = [10, 20, 30, 40, 50];
for (let i = 0; i < 2 * arr.length - 1; i++) {
	i >= arr.length
		? console.log(arr[arr.length * 2 - i - 2])
		: console.log(arr[i])
}

const arr2 = [10, 20, 30, 40, 50];
console.log([...(arr2.slice(0, arr2.length - 2)), ...arr2.reverse()].toString()) // 10,20,30,50,40,30,20,10

// 59: 56 - Задача "развернуть массив", тоже правильно заметили что при деструктуризации создается новый массив,
// так что стоило оставить вариант без деструктуризации.
const array = [1, 2, 3, 4, 5]
for (let i = 0; i < (array.length / 2); i++) {
	const num = array[i];
	array[i] = array[array.length - 1 - i];
	array[array.length - 1 - i] = num;
}
console.log(array)

//01: 16: 37 - Простая задачка на проверку деления без остатка.
// Создайте функцию , кот проверяет, делиться ли число n на два числа x и y. Все вход данные- полож ненулевые числа.
function check(num, first, second) {
	if (num % first == 0 && num % second == 0) {
		return true;
	}
	return false;
}
console.log(check(3, 1, 3)); // true
console.log(check(12, 2, 6)); // true
console.log(check(100, 5, 3)); // false
console.log(check(12, 7, 5)); // false

// 01 : 37: 58 - Зачем нужно знать прототипы / классы реакт - разработчику ?

// 01 : 40: 30 - Про сложность устройства на работу новичкам  