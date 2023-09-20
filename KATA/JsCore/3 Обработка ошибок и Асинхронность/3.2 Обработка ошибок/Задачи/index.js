function arrayToCsv(data) {
	let string = ''	
	data.forEach((array, i) => {  // array => [1, 2], ['a', 'b']
		let hasComma = false;     // ,
		let hasDoubleQuotes = false; // "
		let hasLineBreak = false; // \n
		function check(array) {
			array.forEach(el => {
				if (typeof el === 'string') {
					el.includes(',') && (hasComma = true);
					el.includes('"') && (hasDoubleQuotes = true);
					el.includes("\n") && (hasLineBreak = true);
				}
			})
		}
		check(array);
		let str = "";
		array.forEach(el => {  // el =>    1, 2,    'a,b', 'c,d'
			if (typeof el == 'number') {
				str += el + ','
			} else if (typeof el == 'string') {
				if (!hasComma && !hasDoubleQuotes && !hasLineBreak) {
          str += el + ",";
        } else {
					if (hasDoubleQuotes) {
						el = el.replace(/"/g, '""')
					}
          str += '"' + el + '"' + ",";
        }
			} else {
				throw new Error("Unexpected value");
			}
		});
		str = str.slice(0, -1);
		if (i === (data.length - 1)) {
			string += str;
		} else {
			string += str + '\n';
		}
	})
	return string;
}

console.log(arrayToCsv([["1,2,3", "4,5"], [",,,,", 1]])) // '1,2
console.log(arrayToCsv([[1, 2], [3, 4], ['a', 'b']])) 
console.log(arrayToCsv([[1, 2], ['a', 'b']])) // '1,2
// a,b'
console.log(arrayToCsv([[1, 2], ['a,b', 'c,d']])) // '1,2
// "a,b","c,d"'

/*
Урок с кодом
В localStorage по ключу "counters" находится JSON c объектом, полями которого являются имена счётчиков, а значениями - числовое значение счётчика. Напишите функцию incrementCounter, которой на вход первым параметром передаётся counterName - имя счётчика.
Задача функцции увеличить значение счётчика counterName на 1 и обновить данные в localStorage. В localStorage может находится невалидный JSON, чтение которого может првести к ошибке, в этом случае функция должна записывать новые данные, где у указанного счетчика будет значение 1. В конце функция должна возвращать значение счетчика после инкремента.
Пример использования:
// в localStorage 1 счетчик: bannerClick = 5
incrementCounter('bannerClick'); // 6
incrementCounter('bannerClose'); // 1
// в localStorage 2 счетчика: bannerClick = 6, bannerClose = 1
Про работу с localStorage читаем тут: https://learn.javascript.ru/localstorage
*/

const counters = {
  bannerClick: 1,
  bannerClose: 1,
};
// localStorage.setItem("counters", JSON.stringify(counters));
localStorage.setItem("counters", '{"bannerClick":1,"bannerClose"}');
console.log(localStorage.getItem("counters"));
function incrementCounter(counterName) {
	let locJSON = localStorage.getItem("counters");

	let obj = {}
	try {
		obj = JSON.parse(locJSON);
		if (!obj[counterName]) obj[counterName] = 0;
	} catch(e) {
		obj[counterName] = 0
	}

	obj[counterName]++
	const count = obj[counterName];
	locJSON = JSON.stringify(obj);
	localStorage.setItem("counters", locJSON);
	return count
}
console.log(incrementCounter("bannerClick"));
console.log(incrementCounter("bannerClose"));
console.log(localStorage.getItem("counters"));
console.clear();

/*
getRepeatableData
Написать функцию getRepeatableData, котрая принимает на вход три параметра:
getData- функция, возвращающая данные со стороннего источника. Может генерировать ошибки (см ниже)
key - аргумент, с которым нужно вызвать getData
maxRequestsNumber- максимальное количество вызовов getData функции. Если этот параметр отсутствует - повторяем бесконечное количество раз.
getRepeatableData(getData, key, maxRequestNumber);
Функция getRepeatableData должна вызывать getData и обрабатывать ошибки по условию:
Если вызов getData возвращает ошибку NotFoundError, то мы пробрасываем исключение.
Если вызов getData возвращает ошибку TemporaryError, то мы должны делать повторный вызов getData функции. Кол-во таких вызовов не должно превышать значение maxRequestsNumber. Если кол-во повторого вызыва превышает maxRequestsNumber, то функция getRepeatableData должна пробрасывать ошибку AttemtsLimitExceeded.
Если getData выполняется без ошибок - функция должна вернуть то, что вернула getData. Пример:
const getData = (key) => 'hello' + key;
const res = getRepeatableData(getData, '1', 3); // 'hello1'
*/
class AttemptsLimitExceeded extends Error {
  constructor() {
    super("Max attempts limit exceed");
    this.name = "AttemptsLimitExceeded";
  }
}
class NotFoundError extends Error {
  constructor() {
    super("Not found");
    this.name = "NotFoundError";
  }
}
class TemporaryError extends Error {
  constructor() {
    super("TemporaryError");
    this.name = "TemporaryError";
  }
}
function getRepeatableData(getData, key, maxRequestsNumber) {
  let attempts = 0;
  while (true) {
    try {
      const result = getData(key);
      return result;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      } else if (error instanceof TemporaryError) {
        attempts++;
        if (maxRequestsNumber && attempts >= maxRequestsNumber) {
          throw new AttemptsLimitExceeded();
        }
      } else {
        throw error;
      }
    }
  }
}
const getData = (key) => 'hello' + key
const res = getRepeatableData(getData, '1', 3); // 'hello1'
console.log(res);


/*
Apply Functions
Написать функцию applyFn, которая принимает на вход 2 параметра:
Массив с входными данными
Функцию, которую нужно применить к каждому элементу массива входных данных applyFn(dataArr, callback);
Функция должна возвращать объект в котором 2 массива массив результатов succeeded и массив ошибок errors с правильными call stacks
{
  succeeded: [...], // Массив данных после функции обработчика, как при вызове .map
  errors: [...],    // Массив инстансов ExecutionError
}
Создать класс ошибки ExecutionError с методом .getArgData(), по которому можно получить входные данные, на которых упала функция-коллбэк, то есть возвращать element входного массива dataArr, если вызов callback(element) сгенерирует ошибку
Стек трейс должен указывать на корректную позицию в функции-коллбэке Примечание: класс ExecutionError нужно сделать наследником другого класса
*/
class ExecutionError extends Error {
  constructor(message, stack, element) {
    super(message);
    this.element = element;
		this.stack = stack
		this.name = this.constructor.name;
  }
  getArgData() {
		return this.element;
	}
}

function applyFn(dataArr, callback) {
	let succeeded = [];
	let errors = [];
	for (let i = 0; i < dataArr.length; i++) {
		try {
			succeeded.push(callback(dataArr[i]));
		} catch(e) {
			const executionError = new ExecutionError(e.message, e.stack, dataArr[i]);
			errors.push(executionError);
		}
	}

	return {
    succeeded,
    errors,
  };
}
// console.log(applyFn([1, 2, 3], (arg) => arg + 1));
// const { succeeded, errors } = applyFn([1, 2, 3], (arg) => arg + 1);
//   succeeded: [2, 3, 4],
//   errors: [],
const dataArr = ['{"login":"login","password":"password"}', '{{}'];
const callback = JSON.parse;
const { succeeded, errors } = applyFn(dataArr, callback);
//   succeeded: [{ login: 'login', password: "password" }],
//   errors: [ExecutionError],
// console.log(errors[0].getArgData()) // '{}'
// console.log(succeeded);
// console.log(errors);
