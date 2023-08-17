function calculate(string) {
	const convertingObj = {
		'I': 1,
		'II': 2,
		'III': 3,
		'IV': 4,
		'V': 5,
		'VI': 6,
		'VII': 7,
		'VIII': 8,
		'IX': 9,
		'X': 10
	}

	function convertingToRoman(num) {
		return [
				{ val: 100, romanNum: 'C' },
				{ val: 90, romanNum: 'XC' },
				{ val: 50, romanNum: 'L' },
				{ val: 40, romanNum: 'XL' },
				{ val: 10, romanNum: 'X' },
				{ val: 9, romanNum: 'IX' },
				{ val: 5, romanNum: 'V' },
				{ val: 4, romanNum: 'IV' },
				{ val: 1, romanNum: 'I' },
		].reduce((acc, currentValue) => {
				while (num >= currentValue.val) {
					acc += currentValue.romanNum
					num -= currentValue.val
				}

				return acc
		}, '')
	}
	
	const array = string.split(' ')
	const isNumbersRoman = (array[0] in convertingObj) && (array[2] in convertingObj)
	const isNumberRoman = ((array[0] in convertingObj) || (array[2] in convertingObj)) && !isNumbersRoman
	
	let isArrayIncludesSign = null
	const sign = ['+', '-', '*', '/']
	sign.forEach(el => {
		if (array.includes(el)) {
			isArrayIncludesSign = true
		}
	})
	
	

	try {
		if (+array[0] < 1 || +array[2] < 1) {
			throw new Error('число должно быть выше 0')
		} else if (isNumberRoman && array.length === 3) {
			throw new Error('используются одновременно разные системы счисления')
		} else if (!isArrayIncludesSign) {
			throw new Error('строка не является математической операцией')
		} else if (array.length !== 3) {
			throw new Error('формат математической операции не удовлетворяет заданию - два операнда и один оператор')
		}
		
		const newString = array.map((n, i) => {
			if (i !== 1) {
				return (n in convertingObj) ? `${convertingObj[n]}`: n
			} else {
				return n
			}
		}).join(' ')

		newString.split(' ').forEach((el, i) => {
			if (i !== 1 && (!Number.isInteger(+el) || +el > 10)) {
				throw new Error('числа должны быть целыми и не больше 10')
			}
		})
			
		let result = Math.floor(new Function(`return ${newString}`)());

		if (isNumbersRoman) {
			if (result < 1) {
				result = ''
			} else {
				result = convertingToRoman(result)
			}
		}
		
		return result.toString()
	} catch (e) {
		console.log(e.message)
	} finally {}
}
// calculate('1 + 2'); // вернется строка '3'
// calculate('VI / III'); // вернется строка 'II'
// calculate('VII / III'); // вернётся строка II'
// calculate('I + II'); // вернется строка 'III'
// calculate('I - II'); // вернётся строка '' (пустая строка) т.к. в римской системе нет отрицательных чисел
// calculate('I + 1'); // вернётся исключение (ошибка) throws Error т.к. используются одновременно разные системы счисления
// calculate('I'); // вернётся исключение throws Error т.к. строка не является математической операцией
// calculate('1 + 1 + 1'); // вернётся исключение throws Error т.к. формат математической операции не удовлетворяет заданию - два операнда и один оператор (+, -, /, *)


console.log(calculate('1 + 2'))
console.log(calculate('VI / III'))
console.log(calculate('VII / III'))
console.log(calculate('I + II'))
console.log(calculate('I - II'))
console.log(calculate('I + 1'))
console.log(calculate('I'))
console.log(calculate('1 + 1 + 1'))

console.log(calculate('0 + 1'))

function fn(string) {
	return new Function(`return ${string}`)()
}
// console.log(fn('2 + 2'))

