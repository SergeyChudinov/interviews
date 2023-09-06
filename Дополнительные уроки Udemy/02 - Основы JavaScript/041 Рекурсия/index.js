let students = {
	js: [
		{
			name: 'Ser',
			progress: 100
		},
		{
			name: 'Alex',
			progress: 60
		}
	],
	html: {
		basic: [
			{
				name: 'Peter',
				progress: 20
			},
			{
				name: 'Ann',
				progress: 18
			}
		],
		pro: [
			{
				name: 'Sam',
				progress: 10
			}
		]
	}
}
function getSumProgress(obj) {
	let sum = 0;
	for (let i in obj) {
		const val = obj[i];
		if (Array.isArray(val) && typeof val[0] === 'object') {
			val.forEach(o => {
				sum += o.progress;
			});
		} else if (typeof val === 'object') {
			sum += getSumProgress(val);
		}
	}
	return sum;
}
console.log(getSumProgress(students));

function getSumProgress2(obj) {
	let sum = 0;
	let students = 0;
	function recursion(obj) {
		Object.values(obj).forEach(val => {
			if (Array.isArray(val)) {
				val.forEach(o => {
					sum += o.progress;
					students++
				});
			} else {
				recursion(val);
			}
		})
	}
	recursion(obj)
	return sum / students;
}
console.log(getSumProgress2(students));

function getTotalProgressByRecurcion(data) {
	if (Array.isArray(data)) {
		let total = 0;
		for (let i = 0; i < data.length; i++) {
			total += data[i].progress
		}
		return [total, data.length];
	} else {
		let total = [0, 0]; // [160, 2]
		for (let subData of Object.values(data)) {
			let subDataArr = getTotalProgressByRecurcion(subData);
			total[0] += subDataArr[0];
			total[1] += subDataArr[1];
		}
		return total;
	}
}
const result = getTotalProgressByRecurcion(students);
console.log(result[0] / result[1]);