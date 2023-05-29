const arr = [5,4,3,2,1]; //3

function absentNumber(array) {
	const length = array.length;

	if (length === 0) {
		return 1;
	}

	const sumArray = array.reduce((acc, num) => acc + num);

	const fullSum = (length + 1) * (length + 2) / 2;

	return fullSum - sumArray;
}
console.log(absentNumber(arr));