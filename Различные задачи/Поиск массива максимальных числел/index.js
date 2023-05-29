const arr = [90,77,1,3,5,7,2,4,6,8];

function findMaxValueArr(arr, amount) {
	const maxValueArr = [];

	function recursion(arr, amount) {
		const maxNum = Math.max(...arr);
		maxValueArr.push(maxNum);
		if (amount > 1) {
			arr = arr.filter(el => el !== maxNum);
			recursion(arr, amount - 1);
		}
	}
	recursion(arr, amount)

	return maxValueArr;
}
console.log(findMaxValueArr(arr, 5));