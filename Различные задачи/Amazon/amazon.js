const array = [
	[1, 4, 7, 11,15,16],
	[2, 5, 8, 12,19,22],
	[3, 6, 9 ,16,22,24],
	[10,13,14,17,24,27],
	[18,21,23,26,30,36]
]
const k = 14;
function isHavingNumber2(arr, k) {
	let row = 0;
	let column = arr[0].length - 1;
	while (row < array.length && column >= 0) {
		console.log(arr[row][column])
		if (arr[row][column] === k) {
			return true;
		} else if (arr[row][column] > k) {
			column--;
		} else {
			row++;
		}
	}
	return false
}
console.log(isHavingNumber2(array, k));