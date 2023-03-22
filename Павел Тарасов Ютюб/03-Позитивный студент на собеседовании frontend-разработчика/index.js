// const posts = document.querySelector('.posts');
// const n1 = posts.children;
// const n2 = posts.childNodes;
// console.log(n1);
// console.log(n2);
// console.log(1 + 145)

// function f() { // Не верно!
// 	let a = 5;
// 	return new Function('b', 'return a + b')
// }
// console.log(f()(1));

// function f(b) { // Верно!
// 	let a = 5;
// 	return new Function('a', 'b', 'return a + b')(a, b)
// }
// // console.log(f()(1));
// console.log(f(6)); 


/*
Прислал Ruslan Yand (Человек с Топором).

Новый фильм "Мстители" только что вышел! В кассе кинотеатра много людей,
стоящих в огромной очереди. Каждый из них имеет по одной купюре, номиналом
100, 50 или 25 $.
Билет "Мстители" стоит 25 $.
Вася сейчас работает клерком. Он хочет продать билет каждому человеку в этой
очереди.
Может ли Вася продать билет каждому человеку и дать сдачу, если у него
изначально нет денег и он продает билеты строго в порядке очереди?
Верните YES, если Вася сможет продать билет каждому человеку и дать сдачу.
В противном случае верните NO.
*/
// function tickets(people) {
// 	const arr = [];
// 	for (const pay of people) {
// 		if (pay == 25) {
// 			arr.push(pay);
// 		} else if (pay == 50) {
// 			if (arr.includes(pay / 2)) {
// 				const i25 = arr.findIndex(el => el == pay / 2);
// 				arr.splice(i25, 1, pay);
// 			} else {
// 				return "NO";
// 			}
// 		} else {
// 			if (arr.includes(pay / 2) && arr.includes(pay / 4)) {
// 				const i50 = arr.findIndex(el => el == pay / 2);
// 				const i25 = arr.findIndex(el => el == pay / 4);
// 				delete arr[i50];
// 				delete arr[i25]; 
// 				arr.push(pay);
// 			} else if (arr.filter(el => el == pay / 4).length >= 3) {
// 				for (let i = 0; i < 3; i++) {
// 					const i25 = arr.findIndex(el => el == pay / 4);
// 					delete arr[i25];
// 				}
// 				arr.push(pay);
// 			} else {
// 				return "NO";
// 			}
// 		}
// 	}
// 	return "YES";
// }

// console.log(tickets([25, 25, 50])); // "YES"
// console.log(tickets([25, 100])); // "NO" (У Васи нет сдачи со 100)
// console.log(tickets([25, 25, 50, 50, 100])); // "NO"
// console.log(tickets([25, 25, 25, 25, 25, 100, 100])); // "NO"
// console.log(tickets([25, 25, 50, 100, 25, 50, 25, 100, 25, 25, 25, 100])); // "YES"
// console.log(tickets([25, 25, 25, 100, 25, 25, 50, 100, 25, 25, 25, 100])); // "YES"
// console.log(tickets([25, 25, 25, 25, 25, 25, 25, 50, 50, 50, 100, 100, 100, 100])); // => "NO"
// console.log(tickets([25, 25, 50])); // "YES"
// console.log(tickets([25, 100])); // "NO"
// console.log(tickets([25, 25, 50, 50, 100])); // "NO"
// console.log(tickets([25, 50, 25, 100])); // "YES"
// console.log(tickets([25, 50, 50])); // "NO"
// console.log(tickets([25, 25, 25, 100])); // "YES"
// console.log(tickets([25, 25, 25, 25, 25, 50, 100])); // "YES"
// console.log(tickets([25, 100])); // "NO"

// 2 решение
// function tickets(people) {
// 	let money25 = 0;
// 	let money50 = 0;
// 	for (const pay of people) {
// 		if (pay == 25) {
// 			money25++;
// 		} else if (pay == 50) {
// 			if (money25 > 0) {
// 				money25--;
// 				money50++;
// 			} else {
// 				return "NO";
// 			}
// 		} else {
// 			if (money25 > 0 && money50 > 0) {
// 				money25--;
// 				money50--;
// 			} else if (money25 > 2) {
// 				money25 -= 3
// 			} else {
// 				return "NO";
// 			}
// 		}
// 	}
// 	return "YES";
// }

// console.log(tickets([25, 25, 50])); // "YES"
// console.log(tickets([25, 100])); // "NO" (У Васи нет сдачи со 100)
// console.log(tickets([25, 25, 50, 50, 100])); // "NO"
// console.log(tickets([25, 25, 25, 25, 25, 100, 100])); // "NO"
// console.log(tickets([25, 25, 50, 100, 25, 50, 25, 100, 25, 25, 25, 100])); // "YES"
// console.log(tickets([25, 25, 25, 100, 25, 25, 50, 100, 25, 25, 25, 100])); // "YES"
// console.log(tickets([25, 25, 25, 25, 25, 25, 25, 50, 50, 50, 100, 100, 100, 100])); // => "NO"
// console.log(tickets([25, 25, 50])); // "YES"
// console.log(tickets([25, 100])); // "NO"
// console.log(tickets([25, 25, 50, 50, 100])); // "NO"
// console.log(tickets([25, 50, 25, 100])); // "YES"
// console.log(tickets([25, 50, 50])); // "NO"
// console.log(tickets([25, 25, 25, 100])); // "YES"
// console.log(tickets([25, 25, 25, 25, 25, 50, 100])); // "YES"
// console.log(tickets([25, 100])); // "NO"

/*
Прислал Геворг
Ваша задача - создать функцию, которая может принимать любое неотрицательное
целое число в качестве аргумента и возвращать его с цифрами в порядке убывания.
По сути, переставьте цифры, чтобы получить максимально возможное число.
Примеры:
Вход: 42145 Выход: 54421
Вход: 145263 Выход: 654321
Ввод: 123456789 Выход: 987654321
*/
function descendingOrder(n) {
	// return +n.toString().split('').map(el => +el).sort((a, b) => b - a).join('');
	return +n.toString().split('').sort((a, b) => b - a).join('');
}
console.log(descendingOrder(42145)); // 54421
console.log(descendingOrder(145263)); // 654321
console.log(descendingOrder(123456789)); // 987654321