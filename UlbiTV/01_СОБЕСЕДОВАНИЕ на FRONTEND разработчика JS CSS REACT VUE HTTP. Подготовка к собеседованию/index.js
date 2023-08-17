const numbers = {
	a: 1,
	b: 2,
	c: {
		x: 10,
		y: 20
	}
}
const add = {
	d: 4,
	e: 5
}
const sumNumbers = Object.assign({}, numbers, add)
const copy = JSON.parse(JSON.stringify(sumNumbers))
numbers.c.x = 11
// sumNumbers.c.x = 11
console.log(numbers)
console.log(sumNumbers)
console.log(copy)

function fn() {
	return this
}
const obj = {name: 'Sergey'}
newFn = fn.bind(obj)
console.log(newFn())
console.log(fn.call(obj, 1, 2))
console.log(fn.apply(obj, [1, 2]))
