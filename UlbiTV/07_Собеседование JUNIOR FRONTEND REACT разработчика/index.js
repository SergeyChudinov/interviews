// 1
let obj1 = {name: 'Sergey'}
let obj2 = obj1
console.log(obj1 === obj2)
obj1 = {name: 'UPDATED'}
// obj1.name = 'UPDATED'
console.log(obj1)
console.log(obj2)

// 2
function someFn() {
	try {
		if(Math.random() <= 0.5) {
			throw new Error('')
		}
		return 1
	} catch (e) {
		return 2
	} finally {
		return 3
	}
}
console.log(someFn())

// 3
function checkBrackets(str) {
	const bracketArr = ['(', ')', '{', '}', '[', ']']
	let bracketsStr = str.split('').reduce((acc, value) => {
		if (bracketArr.includes(value)) acc += value;
		return acc
	}, '')

	while (bracketsStr.length) { // (())    (()
		let index
		if (bracketsStr.includes('()')) {
			index = bracketsStr.indexOf('()')
		} else if (bracketsStr.includes('[]')) {
			index = bracketsStr.indexOf('[]')
		} else if (bracketsStr.includes('{}')) {
			index = bracketsStr.indexOf('{}')
		} else {
			return false
		}
		bracketsStr = bracketsStr.slice(0, index) + bracketsStr.slice(index + 2)
	}

	return true
}
console.log(checkBrackets('sam(,[s]()s)'))
console.log(checkBrackets('sam(,s(s)'))

function checkBrackets2(str) {
	const bracketArr = ['(', ')', '{', '}', '[', ']', '|']
	const parsedBrackedConfig = ['()', '[]', '{}', '||']
	let bracketsStr = str.split('').reduce((acc, value) => {
		if (bracketArr.includes(value)) acc += value;
		return acc
	}, '')
	console.log(bracketsStr)
	let prevLength = bracketsStr.length;
	while (bracketsStr !== '') {
		parsedBrackedConfig.forEach((r) => {
			bracketsStr = bracketsStr.replaceAll(r, '');
		});
		if (prevLength === bracketsStr.length) {
			return false;
		}
		prevLength = bracketsStr.length;
	}
	return true;
}
console.log(checkBrackets2('sam(,[|s|]()s)'))
console.log(checkBrackets2('sam(,s(s)'))

// 4
const arr = [1,2,2,3,4,4,5,6,7,7,8,9]
console.log(Array.from(new Set(arr)))

function fn(array) {
	const newArr = []
	array.forEach(num => {
		if (!newArr.includes(num)) newArr.push(num)
	})
	return newArr
}
console.log(fn(arr))

function arrayWithoutRepeat(array) {
	const newArr = []
	for (let i = 0; i < array.length; i++) {
		let num = array[i]
		if (![...array.slice(0, i), ...array.slice(i + 1)].includes(num)) {
			newArr.push(num)
		}
	}
	return newArr
}
console.log(arrayWithoutRepeat(arr))

