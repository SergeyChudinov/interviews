function findNb(m) {
	let n = 1
	while (m > 0) {
		let volume = n * n * n;
		m -= volume;
		if (m > 0) n++;
	}
	return m === 0 ? n : -1;
}

function findNb(m) {
	const obj = {
		n: 0,
		isThereANumber: false
	};
	function recursion(m) {
		if (m > 0) {
			obj.n++;
			let volume = obj.n * obj.n * obj.n;
			recursion(m - volume);
		} else if (m === 0) {
			obj.isThereANumber = true;
		}
		return obj;
	}
	return recursion(m).isThereANumber ? obj.n : -1;
}

console.log(findNb(4183059834009)); // 2022
console.log(findNb(24723578342962)); // -1
console.log(findNb(135440716410000)); // 4824
console.log(findNb(40539911473216)); // 3568