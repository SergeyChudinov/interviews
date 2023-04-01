function getStringIndexes(str) { //Мое!
	const filterStr = str.replace(/([^a-zа-яё])/ig, '').toLowerCase(); // ['a', 'a', 'a', 'a', 'a', 'b', 'b', 'b', 'b', 'b', 'c', 'c', 'c', 'c', 'c', 'a']
	// const array = str.toLowerCase().split(''); //['a', 'a', 'a', 'a', 'a', 'b', 'b', 'b', 'b', 'b', '_', '+', '=', '*', 'c', 'c', 'c', 'c', 'c', 'a']
	const lettersArray = []; //  ['a', 'b', 'c']
	for (const val of filterStr) { // 1 filterStr | array
		if (!lettersArray.includes(val) && val.match(/([a-zа-яё])/i)) {
			lettersArray.push(val)
		}
	}
	const stringArray = [];
	for (const val of lettersArray) { //val = a,b,c
		const indexArray = []; // 0,1,2,3,4,15     5,6,7,8,9     14,15,16,17,18
		for (let i = 0; i < filterStr.length; i++) { // 2 filterStr | array
			if (filterStr[i] == val) { // 3 filterStr | array
				indexArray.push(i)
			}

		}
		stringArray.push(`${val}: [${indexArray}]`);
	}
	return stringArray;
}
console.log(getStringIndexes('aaaaAbbbbBccccCA')); //['a: [0,1,2,3,4,15]', 'b: [5,6,7,8,9]', ...]
console.log(getStringIndexes('aaaaAbbbbB_+=*ccccCAb')); //['a: [0,1,2,3,4,19]', 'b: [5,6,7,8,9]', ...]

function getStringIndexes2(str) { //Ученика!
	const filterStr = str.replace(/[^a-zA-Z]/g, '').toLowerCase(); //'aaaaAbbbbBccccCA'
	const obj = {}; //{a: [0, 1, 2, 3, 4, 15], b: [5, 6, 7, 8, 9], c: [10, 11, 12, 13, 14]}
	for (let i = 0; i < filterStr.length; i++) {
		if (obj[filterStr[i]]) {
			obj[filterStr[i]].push(i)
		} else {
			obj[filterStr[i]] = [i];
		}
	}
	const stringArray = [];

	// for (const val in obj) { // a, b, c
	// 	stringArray.push(`${val}: [${obj[val]}]`);
	// }

	Object.keys(obj).forEach(el => {
		stringArray.push(`${el}: [${obj[el]}]`)
	})
	return stringArray
}
// console.log(getStringIndexes2('aaaaAbbbbBccccCA')); //['a: [0,1,2,3,4,15]', 'b: [5,6,7,8,9]', 'c: [10,11,12,13,14]']
console.log(getStringIndexes2('aaaaAbbbbB_+=*ccccCA')); //['a: [0,1,2,3,4,15]', 'b: [5,6,7,8,9]', 'c: [10,11,12,13,14]']

function getStringIndexes3(str) { //В 1 строку!
	const stringArray = []
	const result = Object.entries(str.toLowerCase().replace(/[^a-z]/g, '').split('').reduce((res, el, i) => {
		res[el] = res[el] ? [...res[el], i] : [i]
		return res
	}, {}));
	console.log(result); //[['a', Array(6)], ['b', Array(5)], ['c', Array(5)]]
	(function () {
		result.forEach(el => {
			stringArray.push(`${el[0]}: [${el[1]}]`)
		})
	}())
	return stringArray
}
console.log(getStringIndexes3('aaaaAbbbbBccccCA'));

function getStringIndexes4(str) { //Еще короче!
	return Object.entries(str.toLowerCase().replace(/[^a-z]/g, '').split('').reduce((res, el, i) => {
		res[el] = res[el] ? [...res[el], i] : [i]
		return res
	}, {})).map(el => `${el[0]}: [${el[1]}]`);
}
console.log(getStringIndexes4('aaaaAbbbbB-ccccCAt'));