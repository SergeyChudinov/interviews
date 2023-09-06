//Символ (symbol) – примитивный тип данных, использующийся для создания уникальных идентификаторов.
let id4 = Symbol('id');
const obj = {
	name: 'Test', // можно в "name"
	[Symbol('id')]: 3 ,// так мы не сожем к нему обратиться!
	[id4]: 4,
	getId() { // так можно получить id4
		return this[id4];
	}
}
// символ создается без new, симв- скрытые при обычном доступе свойства!
let id = Symbol('id'); // можно создать символ без описания Symbol()
let id2 = Symbol('id');
console.log(id == id2)
obj[id] = 1;
obj[id2] = 2;
console.log(obj[id])  // нельзя в "id"

// for (const value in obj) {
// 	console.log(value)
// } // символ по умолчанию неперечисляемый!
console.log(obj.getId()); 
console.log(Object.getOwnPropertySymbols(obj)[0]); // получили [] с ссылками на символы
console.log(obj[Object.getOwnPropertySymbols(obj)[0]]);// => 3

const meAwsomeDB = {
	movies: [],
	actors: [],
	// id: 123,
	[Symbol('id')]: 123,
	[id4]: 4,
	[Symbol.for('id')]: 777,
	getId() { 
		return this[id4];
	},
	setId4(id) {
		// this[id4] = id;
		// console.log(this[Object.getOwnPropertySymbols(this)[0]])
		this[Object.getOwnPropertySymbols(this)[1]] = id;
	}
}
// Сторонний код библиотеки
meAwsomeDB.id = '321321312'; // случайно перезаписали свойство{}
console.log(meAwsomeDB['id'])
console.log('Symbol.for', meAwsomeDB[Symbol.for('id')]);// глобальн реест символов!
meAwsomeDB.setId4(99)
console.log(meAwsomeDB.getId())
console.log(meAwsomeDB)
