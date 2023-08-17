// 1 Реализвать функцию , которая будет суммировать числа и выводить логи
let total = 0
function sum(n) {
	console.log(total += n)
	return sum
}
sum(5)(4)(10) // 5, 9, 19    



function sum2(n) {
	console.log(n)
	return function(x) {
		return sum2(n + x)
	}
}
sum2(5)(4)(10)(11) // 5, 9, 19    

/* 2
Example:
	obj1 = {
		foo: 'foo',
		bar: 'bar'
	}
	obj2 = {
		bar: 'foo',
		some: 'some'
	}
	result = {
		foo: 'foo',
		bar: 'foo'
	}
*/
const mergeSameKeysOfObjects = (obj1, obj2) => {
	for (const i in obj1) {
		if (i in obj2) {
			obj1[i] = obj2[i]
		}
	}
	return obj1
}
const result = mergeSameKeysOfObjects(
	{
		foo: 'foo',
		bar: 'bar'
	},
	{
		bar: 'foo',
		some: 'some'
	}
)
console.log(result)

// 3
const group = (arr, callback) => {
	const obj = {}
	arr.forEach(num => {
		if (!(callback(num) in obj)) {
			obj[callback(num)] = [num]
		} else {
			obj[callback(num)].push(num)
		}
	})
	console.log(obj)
}
group([6.1, 4.2, 6.3], Math.floor)

const group2 = (arr, callback) => {
	const obj = arr.reduce((acc, v) => {
		if (!(callback(v) in acc)) {
			acc[callback(v)] = [v]
		} else {
			acc[callback(v)].push(v)
		}
		return acc
	}, {})
	console.log(obj)
}
group2([6.1, 4.2, 6.3], Math.floor)