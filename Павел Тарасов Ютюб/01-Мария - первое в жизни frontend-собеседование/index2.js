let numbers = [];
for (i = 2; i <= 1000; i++){
    numbers.push(i)
}
// console.log('Array: ',numbers) // 2,3,4,5,6,7,8,9,10

function primeNumber(array){
    let primeArray = [];

    for (let index = 0; index < array.length; index++) {
        let number = array[index];
        let i = 2;
        while (number % i != 0){
                i = i + 1
        }
        if(i === number){
            primeArray.push(number)
        }
    }

    return primeArray;
}
let result = primeNumber(numbers)
// console.log(result)
console.log(result.length)
let lengthResult = result.length
while (lengthResult > 100){
  result.pop()
  lengthResult = lengthResult -1
}
console.log(result.length)
console.log(result)