// 06:07 - Как отработает оператор in?
const arr = [1,4,9];
const result = 2 in arr;
console.log(result); // true, in смотрит на keys
// 08:19 - Разбираемся с побитовыми операторами
/*
Побитовое И (AND)	a & b	Ставит 1 на бит результата, для которого соответствующие биты операндов равны 1.
Побитовое ИЛИ (OR)	a | b	Ставит 1 на бит результата, для которого хотя бы один из соответствующих битов операндов равен 1.
Побитовое исключающее ИЛИ (XOR)	a ^ b	Ставит 1 на бит результата, для которого только один из соответствующих битов операндов равен 1 (но не оба).
Побитовое НЕ (NOT)	~a	Заменяет каждый бит операнда на противоположный.
Левый сдвиг	a << b	Сдвигает двоичное представление a на b битов влево, добавляя справа нули.
Правый сдвиг, переносящий знак	a >> b	Сдвигает двоичное представление a на b битов вправо, отбрасывая сдвигаемые биты.
Правый сдвиг с заполнением нулями	a >>> b	Сдвигает двоичное представление a на b битов вправо, отбрасывая сдвигаемые биты и добавляя нули слева.

Например, число 18, записываемое в двоичной системе счисления, имеет значение:
18 / 2 = 9 // остаток 0
9 / 2 = 4 // остаток 1
4 / 2 = 2 // остаток 0
2 / 2 = 1 // остаток 0
1 / 2 = 0 // остаток (обратите внимание!) 1
-------------------------------------------
            10010
*/
console.log(9..toString(2)); // 1001
console.log((9 >> 2).toString(2)); // 10
console.log((-9 >>> 0).toString(2)); // 10
// 9   => 00000000000000000000000000001001
// -10 => 11111111111111111111111111110110
console.log(~~65) // 65
console.log(2 ^ 14) // 0010 ^ 1110 => 1100 => 12

// 18:46 - Задача 1 (https://jsfiddle.net/mockinterview/jL...)
/*
Implement function check(str, bracketsConfig), that for given brackets
sequence will return true if it is correct and false otherwise.

In the second param there is bracketsConfig - the array of pairs
open-closed brackets. Each subarray includes only 2 elements - opening
and closing bracket.
*/
function check2(str, bracketsConfig) { // '|()|(||)||'
	const openBreckets = bracketsConfig.map(arr => arr[0]).join('');  // '([{'
	const closeBreckets = bracketsConfig.map(arr => arr[1]).join(''); // ')]}'

	let openBrecketsArray = [];
	for (let i = 0; i < str.length; i++) {
		if (str[i] === '|') {
			if (!openBrecketsArray.includes(str[i]) || (openBrecketsArray.includes(str[i]) && openBrecketsArray[openBrecketsArray.length - 1] !== '|')) {
				openBrecketsArray.push(str[i]);
			} else if (openBrecketsArray.includes(str[i]) && openBrecketsArray[openBrecketsArray.length - 1] === '|') {
				openBrecketsArray.pop();
			}
		} else {
			if (openBreckets.includes(str[i])) {
				openBrecketsArray.push(str[i]);
			} else if (closeBreckets.includes(str[i])) {
				const openBracket = openBreckets[closeBreckets.indexOf(str[i])];
				if (openBracket === openBrecketsArray[openBrecketsArray.length - 1]) {
					openBrecketsArray.pop();
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
	}
	return !openBrecketsArray.length;
}

function check(str, bracketsConfig) {
	const parsedBrackedConfig = bracketsConfig.map((r) => {
		return `${r[0]}${r[1]}`;
	});
	let prevLength = str.length;
	while (str !== '') {
		parsedBrackedConfig.forEach((r) => {
			str = str.replaceAll(r, '');
		});
		if (prevLength === str.length) {
			return false;
		}
		prevLength = str.length;
	}
	return true;
}

console.log(check('()', [['(', ')']]), true); // -> true
console.log(check('((()))()', [['(', ')']]), true); // -> true
console.log(check('())(', [['(', ')']]), false); // -> false
console.log(check('([{}])', [['(', ')'], ['[', ']'], ['{', '}']]), true); // -> true
console.log(check('[(])', [['(', ')'], ['[', ']']]), false); // -> false
console.log(check('[]()', [['(', ')'], ['[', ']']]), true); // -> true
console.log(check('[]()(', [['(', ')'], ['[', ']']]), false); // -> false
// special case: opening and closing bracket can be the same :)
console.log(check('||', [['|', '|']]), true); // -> true
console.log(check('|()|', [['(', ')'], ['|', '|']]), true); // -> true
console.log(check('|(|)', [['(', ')'], ['|', '|']]), false); // -> false
console.log(check('|()|(||)||', [['(', ')'], ['|', '|']]), true); // -> true
console.log(check('|(||||(||)||)|', [['(', ')'], ['|', '|']]), true); // -> true

// 01:02:17 - Задача 2 (https://jsfiddle.net/mockinterview/6y...)
/*
Задача с реального собеседования.
Отрефакторить код.
*/
function School (name, minYears) {
	if (!name || !name.trim()) {
		throw Error("Не указано название школы");
  }
	console.log(Number.isNaN(Number.parseInt(minYears, 10)))
  if (!minYears || !parseInt(minYears, 10)) {
		throw new Error("Не указано минимальное количество лет");
  }
	this.SCHOOL_ADDRESS = 'Санкт-Петербург, ул. Пушкина, дом 23';
  this.MIN_YEARS = minYears;
  this.SCHOOL_NAME = name;
}
// без prototype функция будет дублироваться для каждого экземпляра класса, а когда в prototype , то все экземпляры используют одну и туже функцию!
School.prototype.checkAge = function (age, name) {
	if (age < this.MIN_YEARS) {
		return {
			result: false,
			message: `Вам запрещено водить авто, вам должно быть ${this.MIN_YEARS} лет или больше`
		};
	} 
	return {
		result: true,
		message: `Добро пожаловать в автошколу \"${this.SCHOOL_NAME}\", ${name}`
	};
};
School.prototype.getTeacherList = function () {
	return [
		"А. С. Иванов",
		"В. С. Петров",
		"И. А. Сидоров",
	];
}
School.prototype.getTeacher = function (id) {
	id = id || (Math.floor(Math.random() * this.getTeacherList().length));
	return this.getTeacherList()[id];
};
School.prototype.welcome = function (name, years) {
	name = name || prompt('Как вас зовут?');
	if (!name) {
		alert('Вы не указали имя!');
		return this.welcome(name, years);
	}
	years = years || Math.abs(parseInt(prompt('Укажите ваш возраст'), 10));
	if (!years) { // 14
		alert('Вы не указали возраст!');
		return this.welcome(name, years);
	}
	const res = this.checkAge(years, name);
	alert(res.message);
	if (!res.result) return;
	const teacherName = this.getTeacher();
	alert(`Ваш преподаватель: ${teacherName}\n\nЖдём вас по адресу: ${this.SCHOOL_ADDRESS}`);
};
var autoSchool = new School('Парус', 18);
autoSchool.welcome();
// autoSchool.welcome("Тест");
// autoSchool.welcome("", 15);
// autoSchool.welcome("Тест", 16);
// autoSchool.welcome("Тест", 18);
// 01:26:40 - Вопросы из чата + общие вопросы

Object.keys({}).length // венет длину лбьекта!
console.log(Object.keys({}).length) // 0

/*
	https://codernet.ru/articles/js/interpretator_javascript_obyasnyaem_rabotu_dvizhka_na_palczax/
	*Интерпретатор-  это некая программа, которая преобразует код JS в машиночитаемый язык. Но важно не путать его с компилятором JS,потому что разница, возможно, не очевидна сразу, однако она есть. Интерпретатор JS считывает заданный код построчно и по порядку и тут же начинает его «выполнять». 
	*Компилятор же вначале «считывает» весь код, потом проводит с ним оптимизацию и только после этого воспроизводит уже оптимизированный код.
	*«Движок» JavaScript — это программа, объединяющая в себе интерпретатор JS и компилятор. Именно внутри этих «движков» код JS преобразуется в код более «простого» уровня. Разрабатывая программы на языке JavaScript, мы преследуем идею, что компьютер (или, возможно, просто браузер) обязательно выполнял ее правильно. Но компьютер может выполнить и понять только «машинный» код.«Движок» как раз переводит наш код JS на «машинный»
	*Транспилирование — это преобразование исходного кода, написанного на одном языке, на другой язык с сопоставимым уровнем абстракции. Следовательно, в случае JavaScript транспилятор берет синтаксис, который старые браузеры не понимают, и превращает его в синтаксис, который они понимают.
	*/