// 1
const START = Date.now()

function someFn() {
	console.log('time', Date.now() - START)
	console.log('args', arguments)
}

Function.prototype.delay = function(ms) {
	console.log(this)
	return (...args) => {
		console.log(this)
		setTimeout(() => {
			this.call(this, ...args)
			this.bind(this, ...args)()
		}, ms)
	} // .bind(this)
}

const f = someFn.delay(500)

f('arg1', 'arg2', 1, 2)

// 2
const tree = [
	{
		v: 5,
		c: [
			{
				v: 10,
				c: [
					{
						v: 11
					}
				]
			},
			{
				v: 7,
				c: [
					{
						v: 5,
						c: [
							{
								v: 2
							}
						]
					}
				]
			}
		]
	},
	{
		v: 5,
		c: [
			{
				v: 10
			},
			{
				v: 15
			}
		]
	}
]
const reqursive = (tree) => {
	let sum = 0;
	if (Array.isArray(tree)) { 							 // массив
		for (let val of Object.values(tree)) {
			sum += reqursive(val)
		}
	} else {																 // обьект
		for (let val of Object.values(tree)) {
			if (typeof val === 'number') {
				sum += val
			} else {
				sum += reqursive(val)
			}
		}
	}
	return sum
}
const result = reqursive(tree)
console.log(result)

// решение учителя
const reqursive2 = (tree) => {
	let sum = 0;
	tree.forEach(node => {
		sum += node.v
		if(!node.c) {
			return
		}
		sum += reqursive2(node.c)
	});
	return sum
}
const result2 = reqursive2(tree)
console.log(result2)

//решение без рекурсии
const itaration = (tree) => {
	if(!tree.length) {
		return 0
	}
	const stack = []
	let sum = 0
	tree.forEach(node => {
		stack.push(node)
	})
	while (stack.length) {
		const node = stack.pop()
		sum += node.v
		if (node.c) {
			node.c.forEach(n => {
				stack.push(n)
			})
		}
	}
	return sum
}
const result3 = itaration(tree)
console.log(result3)

