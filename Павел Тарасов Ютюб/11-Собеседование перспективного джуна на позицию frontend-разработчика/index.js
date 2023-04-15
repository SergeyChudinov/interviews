// 05:43 - Чем отличается NodeList-коллекция и HTMLCollection?
// 09:41 - Чем отличаются методы .forEach и .map массива?
// 10:42 - Можно ли продолжить цепочку вызовов после forEach?
// 11:43 - Чет отличаются методы Object.freeze и Object.seal?
	/*Метод Object.freeze() замораживает объект: это значит, что он предотвращает добавление
новых свойств к объекту, удаление старых свойств из объекта и изменение существующих 
свойств или значения их атрибутов перечисляемости, настраиваемости и записываемости.
В сущности, объект становится эффективно неизменным.Метод возвращает замороженный объект.
(заморозка неглубокая)
Чтобы сделать объект obj полностью неизменяемым, замораживаем каждый объект в объекте obj.
Для этого воспользуемся этой функцией.
*/
const obj = {
	internal: {
		a: 'значениеA'
	}
};
Object.freeze(obj); // можем поменять a, так как он вложеный!
Object.isFrozen(obj); // === true;
function deepFreeze(obj) {
	// Получаем имена свойств из объекта obj
	var propNames = Object.getOwnPropertyNames(obj);
	// Замораживаем свойства для заморозки самого объекта
	propNames.forEach(function (name) {
		var prop = obj[name];
		// Заморозка свойства prop, если оно объект
		if (typeof prop == 'object' && prop !== null)
			deepFreeze(prop);
	});
	// Заморозить сам объект obj (ничего не произойдёт, если он уже заморожен)
	return Object.freeze(obj);
}
deepFreeze(obj);
obj.internal.a = 'другоеЗначение';
obj.internal.a; // undefined
console.log(obj)

/*Метод Object.seal() запечатывает объект, предотвращая добавление новых свойств к объекту и
делая все существующие свойства не настраиваемыми. Значения представленных свойств всё ещё 
могут изменяться, поскольку они остаются записываемыми. - Изменять можно!*/
Object.seal(obj);
Object.isSealed(obj); // === true;

/* 12:47 - Что такое мемоизация (memoization)? Можешь написать пример?
Мемоизация— сохранение результатов выполнения функций для предотвращения повторных вычислений.
Это один из способов оптимизации, применяемый для увеличения скорости выполнения компьютерных программ.*/
function fn(a) {
	return function fn2(b) {
		return a + b;
	}
}
console.log(fn(1)(2))
(function(data) {console.log(data)})(20)

const add = (n) => (n + 10);
add(9);
// аналогичная функция с мемоизацией
const memoizedAdd = () => {
	let cache = {};
	return (n) => {
		if (n in cache) {
			console.log('Fetching from cache');
			return cache[n];
		} else {
			console.log('Calculating result');
			let result = n + 10;
			cache[n] = result;
			return result;
		}
	}
}
// эту функцию возвратит memoizedAdd
const newAdd = memoizedAdd();
console.log(newAdd(9)); // вычислено
console.log(newAdd(9)); // взято из кэша

//Написание функции с мемоизацией
// простая чистая функция, которая возвращает сумму аргумента и 10
const add2 = (n) => (n + 10);
console.log('Simple call', add2(3));
// простая функция, принимающая другую функцию и
// возвращающая её же, но с мемоизацией
const memoize2 = (fn) => {
	let cache = {};
	return (...args) => {
		let n = args[0]; // тут работаем с единственным аргументом
		if (n in cache) {
			console.log('Fetching from cache');
			return cache[n];
		} else {
			console.log('Calculating result');
			let result = fn(n);
			cache[n] = result;
			return result;
		}
	}
}
// создание функции с мемоизацией из чистой функции 'add'
const memoizedAdd2 = memoize2(add2);
console.log(memoizedAdd2(3)); // вычислено
console.log(memoizedAdd2(3)); // взято из кэша
console.log(memoizedAdd2(4)); // вычислено
console.log(memoizedAdd2(4)); // взято из кэша

//Мемоизация рекурсивных функций
// уже знакомая нам функция memoize
const memoize3 = (fn) => {
	let cache = {};
	return (...args) => {
		let n = args[0];
		if (n in cache) {
			console.log('Fetching from cache', n);
			console.log('cache', cache)
			return cache[n];
		} else {
			console.log('Calculating result', n);
			let result = fn(n);
			cache[n] = result;
			console.log('cache', cache)
			return result;
		}
	}
}
const factorial3 = memoize3(
	(x) => {
		if (x === 0) {
			return 1;
		} else {
			return x * factorial3(x - 1);
		}
	}
);
console.log(factorial3(5)); // вычислено
console.log(factorial3(6)); // вычислено для 6, но для предыдущих значений взято из кэша

//вариант студента
function memoize4(fn) {
	const cache = new Map();
	return function(arg) {
		if (cache.has(arg)) return cache.get(arg);
		const result = fn.call(this, arg);
		cache.set(arg, result);
		return result
	}
}
const add4 = (n) => (n + 10);
const memoizedAdd4 = memoize4(add4);
console.log(memoizedAdd4(4));

// 20:31 - Задача 1 про reverse числа (https://jsfiddle.net/mockinterview/mr...)
/*
Функция reverse принимает число, необходимо реализовать функцию так, 
чтобы она возвращала перевернутое число.
*/
function reverse(num) {
	let str = num + '';
	let sign = '';
	if (str[0] === '-') {
		sign = '-';
		str = str.slice(1);
	}
	return +(sign + +str.split('').reverse().join(''));
}
console.log(+((120).toString()).split('').reverse().join(''))
console.log(reverse(123)); // 321
console.log(reverse(-123)); // -321
console.log(reverse(120)); // 21
console.log(reverse(0)); // 0
// 28:46 - Задача 2 про прогулку (https://jsfiddle.net/mockinterview/8b...)
/*
Задачу прислал Alex
Вы живете в городе, где все дороги расположены в идеальной сетке.
Вы пришли на прием на 10 минут раньше, поэтому решили прогуляться.
Город предоставляет своим гражданам приложение для построения пешеходов
на их телефонах - каждый раз, когда вы нажимаете кнопку, он отправляет
вам массив однобуквенных строк, представляющих маршруты ходьбы
(например, ['n', 's', 'w', 'е']).
Вы всегда проходите только один квартал для каждой буквы (направления),
и вы знаете, что вам понадобится 1 минута, чтобы пройти один городской
квартал.
Поэтому создайте функцию, которая вернет true, если прогулка, которую
дает вам приложение, займет у вас ровно 10 минут  и, конечно же, вернет
вас в исходную точку. В противном случае верните false.
Примечание: вы всегда будете получать действительный массив, содержащий
случайный набор букв направления (только «n», «s», «e» или «w»).
Пустого массива никогда не будет.
*/
function isValidWalk(walk) {
	const sides = {
		north: 0,
		west: 0,
	}
	walk.forEach(el => {
		if (el.toString() === 'n') {
			++sides.north
		} else if (el.toString() === 'w') {
			++sides.west
		} else if (el.toString() === 's') {
			--sides.north
		} else {
			--sides.west
		}
	})
	if (sides.north === 0 && sides.west === 0 && walk.length === 10) {
		return true;
	} else {
		return false;
	}
}
console.log(isValidWalk(['w','e','w','e','w','e','w','e','w','e','w','e'])); // false
console.log(isValidWalk(['n','s','n','s','n','s','n','s','n','s'])); // true
console.log(isValidWalk(['w'])); // false
console.log(isValidWalk(['n','n','n','s','n','s','n','s','n','s'])); // false
// 45:58 - Задача 3 Про котов и леопардов (https://jsfiddle.net/mockinterview/av...)
/*
Прислал Владислав Аткишкин
Допиши код так, чтобы Leopard унаследовал от Cat все методы.
Сделай так, чтобы у Leopard метод sayMeow возвращал 'Roar!' А метод
getPet у Leopard должен возвращать ту строку, возвращает метод у Cat, и
кроме этого устанавливать леопарду, у которого был вызван метод, в поле
mood значение 'счастлив'.
Обрати внимание: использование ключевого слова class запрещено.
Наследование нужно реализовывать через прототипы.
*/
function Cat() {}
Cat.prototype.sayMeow = () => {
	return 'Meow!   Meow!   Meow!';
};
Cat.prototype.getPet = () => {
	return 'Purrrrrr';
};
function Leopard() {}
//решение
Leopard.prototype = Object.create(Cat.prototype);
Leopard.prototype.sayMeow = () => {
	return 'Roar!';
}
Leopard.prototype.getPet = function() {
	this.mood = 'счастлив';
	return Cat.prototype.getPet();
}
const cat = new Cat();
const leopard = new Leopard();
console.log(leopard.sayMeow());
console.log(leopard.getPet());
console.log(leopard)

// 58:17 - Задача 4 про покупателя старинных часов (https://jsfiddle.net/mockinterview/nf...)
/*
Прислал: yurec ~, задача с собеседования.
Один покупатель старинных уникальных часов хочет приобрести для музея 
двое часов. В магазине у хозяйки есть n разных часов с соответствующими 
ценами [p1, ..., pn]. Покупатель хочет полностью использовать свой 
бюджет. Необходимо выяснить получится ли это.
*/
function f(clockArr, money) {
	for (let i = 0; i < clockArr.length - 1; i++) {
		for (let j = i + 1; j < clockArr.length; j++) {
			let price = clockArr[i] + clockArr[j];
			price = Math.round(price * 100) / 100;
			console.log(price)
			if (price === money) return true;
		}
	}
	return false;
}
console.log(f([8.74, 3.12, 9.50, 2.35], 2.35)); // false
console.log(f([1.1, 4.2, 7.5, 0.4], 8.4)); // false
console.log(f([54.10, 20.00, 18.51, 97.75, 35.20, 76.42], 89.3)); // true
// 01:21:09 - Вопрос про parseInt, почему так работает?
console.log(parseInt(0.5));
console.log(parseInt(0.000005)); // 0
console.log(parseInt(0.0000005)); // 0.00000005 = 5e^(-7) = 5!!! )))))

// 01:25:30 - У тебя хорошая память? Почему хорошо отвечал?
// 01:26:17 - Какие проекты делал, что писал?
// 01:29:40 - Что рекомендуешь почитать джуну?
// 01:33:10 - С TypeScript работал? С какими языками программирования работал в целом?

