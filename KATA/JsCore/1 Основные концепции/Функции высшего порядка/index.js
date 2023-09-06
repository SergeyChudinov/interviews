// 1
const strArray = ["JavaScript", "Python", "PHP", "Java", "C"];
function mapForEach(arr, fn) {
  const newArray = [];
  for (let i = 0; i < arr.length; i++) {
    newArray.push(fn(arr[i]));
  }
  return newArray;
}
const lenArray = mapForEach(strArray, function (item) {
  return item.length;
});
// выводит [ 10, 6, 3, 4, 1 ]
console.log(lenArray);

// 2
function questions(job) {
	const jobDictinary = {
		developer: 'что такое JS',
		teacher: 'какой предмет вы ведете',
	}

	return function(name) {
		return `${name}, ${jobDictinary[job]}?`
	}
}
const developerQuestion = questions("developer");
console.log(developerQuestion('Sergey'))
const teacherrQuestion = questions("teacher");
console.log(teacherrQuestion("Sergey"));

// 3
/*
Задача реализовать функцию partition которая принимает на вход массив и коллбэк функцию, а возвращает массив в котором два массива.
Если callback вернёт true то element с которым была вызвана функция должен попасть в массив trueArray
Если callback вернёт false то element с которым была вызвана функция должен попасть в массив falseArray
Функция должна правильно отрабатывать если callback возвращает приводимые к true false значения:
*/
const array = [1,2,3,4,5,6]
const numbers = [0, 1, 2, {}, false, "", "0"];
function partition(array, callback) {
  const matrix = [[], []];
  for (let i = 0; i < array.length; i++) {
		if (!callback) {
			if (array[i]) matrix[0].push(array[i]);
			else matrix[1].push(array[i]);
		} else {
			if (callback(array[i])) matrix[0].push(array[i]);
			else matrix[1].push(array[i]);
		}
  }
  return matrix;
}
function callback1(num) {
	return num > 3
}
function callback2(num) {
  return num;
}
console.log(partition(array, callback1));
console.log(partition(numbers, callback2));
console.log(partition(numbers));