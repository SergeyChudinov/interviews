// 01:20 - Сортировка массива с числами
// 04:00 - Перебирающие методы массива
// 05:50 - своя реализация функции map в прототипе Array
Array.prototype.myMap = function(fn) {
	 if (typeof fn !== 'function') {
    throw new TypeError(`${fn} is not a function`)
  }
	const newArr = []
	const length = this.length
	for (let i = 0; i < length; i++) {
		if (this[i]) {
			newArr.push(fn(this[i], i, this))
		}
	}
	return newArr
}
const arr = [1,2,3]
const newArr = arr.map((el, i, arr) => {
	if (i % 2 !== 0) {
		// arr.pop()
		return el
	} else {
		return el * el
	}
})
console.log(newArr)
// ---React----
/* 12:00 - Зачем нужен React?
React - JavaScript фронтенд библиотека, разработанная Facebook в 2011
В ядре - компонентный подход, позволяющий создавать переиспользуемые UI
блоки
Служит, для создания сложных интерактивных UI для web и мобильной
разработки

Увеличивает производительность отрисовки приложений
Может использоваться и на клиенте и на сервере
Из-за JSX читаемость кода увеличивается
Легко интегрировать с другими фреймворками
Легко писать unit тесты
*/
// 14:40 - Virtual DOM
// 20:00 - Задача с setState
// 23:00 - Задача с useEffect
// 27:10 - Реализация управляемого и неуправляемого инпута
// 32:50 - Списки, ключи
// 34:20 - Redux flow
// 40:40 - Зачем нужен Redux thunk и как можно обойтись без него?
// ---JS---
// 45:50 - ES6, Деструктуризация
// 47:50 - Задача палиндром
function palindrom(word) {
	word = word.toLowerCase()
	const reverse = word.split('').reverse().join('')
	return word === reverse
}
console.log(palindrom('aBccba'))
// 53:35 - Объекты, ссылки, глубокое и неглубокое копирование, способы
const obj1 = {
	a: 1,
	b: 2,
	c: {
		e: 3,
		d: 4
	}
}
const obj2 = {...obj1}
obj1.c.e = 30
console.log(obj1)
console.log(obj2)
console.log(obj1.a === obj2.a)
console.log(obj1.c === obj2.c)
// 01:02:00 - Проверка полей

