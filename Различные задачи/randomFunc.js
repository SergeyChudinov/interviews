const array1ore2 = [];
for (let i = 0; i < 1_000_000; i++) {
	array1ore2.push(Math.floor(Math.random() * 2 + 1))
}
console.log(array1ore2);
let repeatingNumber = 0;
let maxRepeatingNumber = 0;
let index;
let initialValue = array1ore2[0];
for (let i = 0; i < array1ore2.length; i++) {
	if (array1ore2[i] === initialValue) {
		repeatingNumber++;
			if (repeatingNumber > maxRepeatingNumber) {
				maxRepeatingNumber = repeatingNumber;
				index = i - maxRepeatingNumber + 1;
			}
	} else {
		initialValue = array1ore2[i];
		repeatingNumber = 1;
	}
}
console.log(maxRepeatingNumber, index);