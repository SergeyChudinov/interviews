// Рекурсия
// 1 Максимальная глубина рекурсии
const getMaxCallStackSize = i => {
	try {
		return getMaxCallStackSize(++i);
	} catch (e) {
		return i
	}
}
console.log(getMaxCallStackSize(0))

// 2 Неявная рекурсия
function f(x) {
	return g(x)
}
function g(x) {
  return f(x);
}
// console.log(f(0)) // index.js:82 Uncaught RangeError: Maximum call stack size exceeded

// 3 возведение в степень
const pow = (base, power) => {
	if (power === 1) return base;
	else return pow(base, power -1) * base
}
console.log(pow(2, 3))

// 4 факториал
const factorial = n => {
	if (n === 0) return 1
	else return n * factorial(n - 1)
}
console.log(factorial(10))

// 5 фибоначи
const fibonacci = n => (n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2));
console.log(fibonacci(10))

// 6 reduce
let count = 0;
const reduce = (fn, acc, [cur, ...rest]) => {
  // console.log("count-", ++count, "acc-", acc);
  return cur === undefined ? acc : reduce(fn, fn(acc, cur), rest);
};
const res = reduce((a, b) => a + b, 0, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log(res);

// 7 tail
const add = (n, acc = 0) => {
	if (n === 0) return acc
	return add(n - 1, acc + n)
}
console.log(add(3))

const tail = (n, acc = 0) => {
	while (true) {
		if (n === 0) return acc
		acc = acc + n
		n = n -1
	}
}
console.log(tail(3));

// 8 fib-iter
const fibonacci_1 = n => {
	if (n <= 2) return 1
	return fibonacci(n - 1) + fibonacci(n - 2)
}
console.log(fibonacci_1(14));

const fibonacci_2 = n => {
	let a = 1;
	let b = 0;
	let c = 0;
	let counter = n
	while (n > 0) {
		c = a + b
		b = a
		a = c
		n--
	}
	return b
}
console.log(fibonacci_2(14));

/*
Реализуйте (с использованием рекурсии) функцию sequenceSum, которая находит сумму последовательности целых чисел. Последовательность задается двумя значениями: begin - начало последовательности, end - конец последовательности. Например: begin = 2 и end = 6 дают нам такую последовательность 2, 3, 4, 5, 6. Сумма такой последовательности будет: 20.
*/
function sequenceSum (begin, end) {
	let sum = begin;
	if (begin > end) return NaN
	if (begin === end) return begin
	else {
			sum += sequenceSum(begin + 1, end)
	}
	return sum
}
console.log(sequenceSum(1, 5)); // 1 + 2 + 3 + 4 + 5 = 15
console.log(sequenceSum(4, 10)); // 4 + 5 + 6 + 7 + 8 + 9 + 10 = 49
console.log(sequenceSum(-3, 2)); // (-3) + (-2) + (-1) + 0 + 1 + 2 = -3

/*
Напишите функцию, которая принимает первым параметром объект, вторым - массив из цепочки свойств, по которому нужно пройти, чтобы получить значение.
Если какое-то из свойств не найдено - функция возвращает undefined.
*/
function optionalChaining(obj, chain) {
    if (chain.length === 0) return undefined;
    for (let el of chain) {
      if (obj[el]) obj = obj[el];
      else return undefined;
    }
    return obj;
}
const obj = {
  a: {
    b: {
      c: {
        d: "Привет!",
      },
    },
  },
};
console.log(optionalChaining(obj, ["a", "c", "d"])) 
console.log(optionalChaining(obj, ["a", "b", "c", "d"])) 
console.log(optionalChaining(obj, ["a", "b", "c", "d", "e"])) 