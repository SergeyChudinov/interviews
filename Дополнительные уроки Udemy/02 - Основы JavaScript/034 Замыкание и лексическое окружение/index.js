// лексическое окружение- это технический обьект локальный и глобальный
// любая переменная - это свойсво {} лексическое окружения
// при создании новой функции создается новое лекс окруж.(или обновляется!)

function createCounter() {
	let counter = 0;
	const myFunction = function() {
		counter++; // само замыкание, ссылка на counter
		return counter;
	}
	return myFunction;
}
console.log(createCounter()()); // 1
console.log(createCounter()()); // 1
console.log(createCounter()()); // 1

const increment = createCounter(); // так createCounter вызывается только 1 раз и не будет перезаписан counter, как в примерах выше!
console.log(increment()); // 1
console.log(increment()); // 2
console.log(increment()); // 3

//Замыкане- это функция , котор запоминает свои внешние переменные и может получить к ним доступ

for (let i = 0; i < 9; i++) {
	for (let i = 0; i < 9; i++) {
		let num = 3;
	}
	console.log(num)
}