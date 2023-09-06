console.log(Number.MAX_SAFE_INTEGER) // 9007199254740991
const bigInt = 123123761354128764621873621876312873612783618n;
const sameBigint = BigInt(123123761354128764621873621876312873612783618);
console.log(typeof (bigInt));
console.log(typeof (sameBigint));

// console.log(Math.round(5n)); // ошибка
console.log(5n / 2n)// 2n округленный результат
console.log( 2n > 1n ); // true
console.log( 2n > 1 ); // true
console.log( 1 == 1n ); // true
console.log( 1 === 1n ); // false

let bigint = 1n;
let number = 2;
// конвертируем number в bigint
console.log(bigint + BigInt(number)); // 3n
// конвертируем `bigint` в number
console.log(Number(bigint) + number); // 3 (вместо Number нельзя +)