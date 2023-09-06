'use strict';

const boxesQuery = document.querySelectorAll('.box');
const boxesGet = document.getElementsByClassName('box');

// boxesQuery[0].remove();
// boxesGet[0].remove();

for (let i = 0; i < 5; i++) {
	const div = document.createElement('div');
	div.classList.add('box');
	document.body.append(div); // так правтльно
	// boxesGet[boxesGet.length - 1] = div; // ошибка, напрямую так работь с HTMLCollection нельзя!
}

console.log(boxesQuery); // остануться все
console.log(boxesGet); // останеться один элемент
console.log(document.body.children);

const array = Array.from(boxesGet) // создали массив из массивоподобного {}
console.log(array); // => [div.box] - обычный массив , статичный, не живая коллеция!


boxesQuery.forEach(box => {
	if (box.matches('div.this')) {
		console.log(box)
	}
})


console.log(boxesQuery[0].closest('.wrapper'))