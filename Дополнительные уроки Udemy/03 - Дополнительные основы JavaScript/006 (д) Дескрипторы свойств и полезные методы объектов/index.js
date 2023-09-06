// значения по умолчанию true
// writable, если true , то можно изменить!
// enumerable, если true , то свойства перечесляются в циклах! 
// configurable, если true, то свойства можно удалить, а атрибуты заменить! 
const birthday2 = Symbol('birthday2');
const user = {
	name: 'Alex',
	surname: 'Smith',
	[birthday2]: '20/04/2021',
	showMyPublicData: function() {
		console.log(`${this.name} ${this.surname}`);
	}
}


Object.defineProperty(user, 'birthday', {
	value: '20/04/2021',
	enumerable: true,
	configurable: true,
});
console.log(Object.getOwnPropertyDescriptor(user, 'birthday'));

console.log(Object.getOwnPropertyDescriptor(user, 'name'));
Object.defineProperty(user, 'name', {writable: false});

//При написан новых свойст, если не указывать значения, то они - false!
Object.defineProperty(user, 'gender', {value: 'male'});
console.log(Object.getOwnPropertyDescriptor(user, 'gender'));

Object.defineProperty(user, 'showMyPublicData', {
	enumerable: false
});
for (let key in user) console.log(key)
console.log(Object.getOwnPropertyDescriptor(user, birthday2));

console.log(Object.getOwnPropertyDescriptor(Math, 'PI')); 

Object.defineProperties(user, {
	name: {writable: false},
	surname: {writable: false},
})

// Полезные методы {}
// Object.preventExtensions()-Предотвращает любое расширение обьекта!
/* Object.seal()-Предотвращает удаление свойств {} другим кодом! запечатывает объект, предотвращая добавление новых свойств 
к объекту и делая все существующие свойства не настраиваемыми. Значения представленных свойств всё ещё 
могут изменяться, поскольку они остаются записываемыми. - Изменять можно! +++ configurable = false*/
/*Object.freeze() замораживает объект: это значит, что он предотвращает добавление
новых свойств к объекту, удаление старых свойств из объекта и изменение существующих 
свойств или значения их атрибутов перечисляемости, настраиваемости и записываемости.
В сущности, объект становится эффективно неизменным.Метод возвращает замороженный объект.
(заморозка неглубокая)
Чтобы сделать объект obj полностью неизменяемым, замораживаем каждый объект в объекте obj.
Для этого воспользуемся этой функцией.
*/
// Object.isExtensible();
// Object.isSealed(); 
// Object.isFrozen();

// Object.is() // определяет являются ли значения различимыми!

// Object.keys();
// Object.values();
// Object.entries();