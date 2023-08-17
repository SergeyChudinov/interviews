// 1
const binnaryTree = {
	value: 6,
	left: {
		value: 5,
		left: {
			value: 3,
			left: {
				value: 1
			}
		},
		right: {
			value: 7
		}
	},
	right: {
		value: 10,
		left: {
			value: 4
		},
		right: {
			value: 5
		}
	}
}
const reqursive = (tree) => {
	let sum = tree.value; // 6
	for (let key in tree) {
		if (typeof tree[key] === 'object') {
			sum += reqursive(tree[key])
		}
	}
	return sum
}
const result = reqursive(binnaryTree)
console.log(result)

//решение без рекурсии
const itaration = (tree) => {
	const stack = []
	let sum = 0
	Object.values(tree).forEach(node => {
		if (typeof node === 'number') {
			sum += node
		} else {
			stack.push(node)
		}
	})
	while (stack.length) {
		const node = stack.pop()

		Object.values(node).forEach(n => {
			if (typeof n === 'number') {
				sum += n
			} else {
				stack.push(n)
			}
		})	
	}
	return sum
}
const result3 = itaration(binnaryTree)
console.log(result3)

// 2
function someFn() {
	console.log(arguments)
}
Function.prototype.delay = function(ms) {
	return (...args) => {
		setTimeout(function() {
			this(...args)
		}.bind(this), ms)
	}
}
const someFnWithDelay = someFn.delay(2000)
someFnWithDelay('arg1', 2, [])
