 /*
Map – это коллекция ключ/значение, как и Object. Но основное 
отличие в том, что Map позволяет использовать ключи любого типа.
Методы и свойства:
new Map() – создаёт коллекцию.
map.set(key, value) – записывает по ключу key значение value.
map.get(key) – возвращает значение по ключу или undefined, если ключ key отсутствует.
map.has(key) – возвращает true, если ключ key присутствует в коллекции, иначе false.
map.delete(key) – удаляет элемент (пару «ключ/значение») по ключу key.
map.clear() – очищает коллекцию от всех элементов.
map.size – возвращает текущее количество элементов.
*/
let map2 = new Map();
map2.set("1", "str1");    // строка в качестве ключа
map2.set(1, "num1");      // цифра как ключ
map2.set(true, "bool1");  // булево значение как ключ
// помните, обычный объект Object приводит ключи к строкам?
// Map сохраняет тип ключей, так что в этом случае сохранится 2 разных значения:
// alert(map2.get(1)); // "num1"
// alert(map2.get("1")); // "str1"
// alert(map2.size); // 3

const shops = [
	{rice: 500, bread: 50},
	{oil: 200},
	{bread: 50},
]
const map = new Map([
	[{paper: 400}, 8000]
]); // передаем нач знач=> [ [key, val] ]
// map.set(shops[0], 5000);
// map.set(shops[1],15000);
// map.set(shops[2], 25000);

// map.set(shops[0], 5000)
// 	.set(shops[1],15000)
// 	.set(shops[2], 25000); // или циклом!

const budget = [5000, 15000, 25000];
shops.forEach((shop, i) => {
	map.set(shop, budget[i]);
})
console.log(map) // [[Entries]] => Map(4) {{…} => 8000, {…} => 5000, {…} => 15000, {…} => 25000}
console.log("new Map", new Map(map));
/*
map.keys() – возвращает итерируемый объект по ключам,
map.values() – возвращает итерируемый объект по значениям,
map.entries() – возвращает итерируемый объект по парам вида
[ключ, значение], этот вариант используется по умолчанию в for..of.
*/
console.log(map.keys());
console.log(map.values());
console.log(map.entries());

const goods = [];
console.log(map.keys());
for (let shop of map.keys()) {
	console.log(shop);
	// goods.push(Object.keys(shop)[0])
	Object.keys(shop).forEach(good => {
		if (!goods.includes(good)) {
			goods.push(good)
		}
	}); 
}
console.log(goods);

for (let price of map.values()) {
	console.log(price);
}

for (let [shop, price] of map.entries()) { // деструкторизация
	console.log(shop, price);
	Object.keys(shop).forEach(good => {
		console.log(good);
	})
}

map.forEach((value, key, map) => {
	console.log(key, value)
})

//Создадим Map из {}
const user = {
	name: 'Alex',
	surname: 'Smith',
	birthday: '20/04/2021',
	showMyPublicData: function() {
		console.log(`${this.name} ${this.surname}`);
	}
}
console.log(user)
console.log(Object.entries(user))
const userMap = new Map(Object.entries(user));
console.log(userMap);
console.log(userMap.get('surname'));

//Создадим {} из Map
let userFromMap = {}
console.log(userMap.entries());
for (let [key, value] of userMap.entries()) {
	userFromMap[key] = value;
}
console.log(userFromMap)

const newUserObj = Object.fromEntries(userMap); // или fromEntries
console.log(newUserObj)