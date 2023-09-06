let user = {name: 'Ivan'}
const arr =[user];
user = null;
console.log(user);
console.log(arr[0]);

let user2 = {name: 'Ivan'}
let map = new Map();
map.set(user2, 'data');
user2 = null;
console.log(user2);
console.log(map);
console.log(map.keys());
console.log(map.has(user2));

/*
WeakMap
Объект WeakMap — коллекция пар ключ-значение. В качестве ключей могут быть 
использованы только объекты, а значения могут быть произвольных типов.
Если нет ссылки на этот {} и он сущ только внутри WeakMap, то он будет удален!
нет методов: map.keys(), map.values(), map.entries(), for of
есть: set, get, has, delete
*/
let user3 = {name: 'Ivan'}
let map3 = new WeakMap();
map3.set(user3, 'data');
user3 = null;
console.log(user3);
console.log(map3);
console.log(map3.has(user3));

// приме кеширования!
let cache  = new WeakMap();
function cacheUser(user) {
	if (!cache.has(user)) {
		cache.set(user, Date.now())
	}
	return cache.get(user); 
}
let lena = {name: 'Elena'};
let alex = {name: 'Alex'};
cacheUser(lena);
cacheUser(alex);
console.log(cache);
lena = null;
console.log(cache);
console.log(cache.has(lena));
console.log(cache.has(alex));

/*
WeakSet
Объект WeakSet - коллекция, элементами которой могут быть только объекты. 
Ссылки на эти объекты в WeakSet являются слабыми. Каждый объект может быть 
добавлен в WeakSet только один раз.
Если нет ссылки на этот {} и он сущ только внутри WeakSet, то он будет удален!
нет методов: map.keys(), map.values(), map.entries(), size, for of
есть: add, has, delete
*/
let messages = [
	{text: 'Hello', from: 'John'},
	{text: 'World', from: 'Alex'},
	{text: '...', from: 'M'},
];
let readMessages = new WeakSet();
readMessages.add(messages[0]); 
readMessages.add(messages[1]);
console.log(readMessages.has(messages[0]));
// messages.shift();
delete messages[0];
console.log(messages[0]);
console.log(readMessages.has(messages[0]));
console.log(readMessages);

/*
-WeakMap и WeakSet явл допол хранилищем данных для {} управляемых с 
других мест в коде
-Если на них нет ссылок, они будут удалены из памяти!
*/