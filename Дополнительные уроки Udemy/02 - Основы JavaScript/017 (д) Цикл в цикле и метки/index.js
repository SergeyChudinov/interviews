// for (let i = 0; i < 3; i++) {
// 	console.log(i);
// 	for (let j = 0; j < 3; j++) {
// 		console.log(j);
// 	}
// }

// first - метка, continue first не просто пропускает текущий цикл, но и тот на котром стоит указывающая метка 'first'! Можно исп. break
let count = 0;
first: for (let i = 0; i < 3; i++) {
	console.log(`First level: ${i}`);
	for (let j = 0; j < 3; j++) {
		console.log(`Second level: ${j}`);
		for (let k = 0; k < 3; k++) {
			if (k === 2) continue first;
			console.log(`Third level: ${k}`);
			count++
		}
	}
}
console.log(count)

// *
// **
// ***
// ****
// *****
let str = '';
for (let i = 1; i < 8; i++) {
	if (i === 4) continue;
	for (let j = 0; j < i; j++) {
		str += '*'
	}
	str += '\n';
}
console.log(str)
