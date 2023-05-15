const array = [7,1,3,2,5,4,21]
// array.sort((a, b) => a - b);
function sortFunc(arr) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[j] < arr[i]) {
				let min = arr[j];
				arr[j] = arr[i];
				arr[i] = min;
			}
		}
	}
}
sortFunc(array);
console.log(array)


