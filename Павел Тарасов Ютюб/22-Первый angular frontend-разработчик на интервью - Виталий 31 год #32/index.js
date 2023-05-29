// 04:14 - Деструктуризация - что это и как применяется
const arr = [1,2,3,4,5];
[, a,, b] = arr;
console.log(a, b);

const third = 5;
const obj = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5
}
const {third: param, fifth} = obj;
console.log(param, fifth);

function func({third: param, fifth} = {}) {
    return param;
}
console.log(func(obj));
// 16:49 - Рубрика "тупой вопрос по JavaScript"
console.log([] == ![])// true?
// false-примитив, а []-обьект, значит {} его нужно преобразовать в примитив, тоесть в троку'' , затем при сранении строки и бул знач, JS переведет их в числа! 
// [] == ![] => [] == false => '' == false => 0 == 0;
// 22:17 - Задачка про шарик
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/var
function p() {
  function p() {
    var p = function() {
        console.log('шарик находиться');
        console.log(p);
        p = 'под колпачкем 3';
    }; 
    return p;
  } 
  p = p();
  p();
  p = 'под колпачкем 2';
}
p();
var p = 'под колпачкем 1';

// 30:37 - Задача про анаграммы с реального собеседования (https://jsfiddle.net/mockinterview/mb...)
/*
Прислал Валерий, задача с реального собеседования.
Напишите функцию, которая найдет все наборы анаграмм в строке.
Анаграммы - слова, составленные из одного и того же набора букв, например
рост, сорт, трос.
Функция должна вернуть массив, в котором содержатся массивы, содержащие слова 
анаграммы. Если для слова не нашлось анаграммы, значит это слово включать в 
результат не нужно.
*/
function getAnagrams(string) {
    const matrix = [];
    const stringArr = string.split(' ');
    for (let i = 0; i < stringArr.length; i++) {
        const array = [];
        for (let j = i + 1; j < stringArr.length; j++) {
            if (stringArr[i].split('').sort().join('') === stringArr[j].split('').sort().join('') && stringArr[i] !== '') {
                if (!array.includes(stringArr[i])) array.push(stringArr[i]);
                array.push(stringArr[j]) && (stringArr[j] = '');
            };
        }
        array.length > 0 && matrix.push(array);
    }
    return matrix;
}
const str = 'ывва адрес карп кума мир мука парк рим среда стук рост сорт трос рост';
// [
//  ["адрес", "среда"],
//  ["карп", "парк"],
//  ["кума", "мука"],
//  ["мир", "рим"],
//  ["рост", "сорт", "трос"]
// ];
console.log(getAnagrams(str));
// 2 вариант
function getAnagrams2(string) {
    const words = string.split(' ');
    const obj = {};
    for (let word of words) {
        let newWord = word.split('').sort().join('')
        if (newWord in obj) {
            obj[newWord].push(word);
        } else {
            obj[newWord] = [word];
        }
    }
    return Object.values(obj).filter(arr => arr.length > 1);
}
console.log(getAnagrams2(str));
// 3 вариант
function getAnagrams3(string) {
    const words = string.split(' ');
    const map = new Map();
    for (let word of words) {
        let newWord = word.split('').sort().join('')
        if (map.has(newWord)) {
            map.get(newWord).push(word);
            // map.set(newWord, [...map.get(newWord), word]);
        } else {
            map.set(newWord, [word])
        }
    }
    return Array.from(map.values()).filter(arr => arr.length > 1);
    return Object.values(Object.fromEntries(map)).filter(arr => arr.length > 1);
}
console.log(getAnagrams3(str));
// 01:00:50 - Задача про сложение числа (https://jsfiddle.net/mockinterview/c6...)
/*
Необходимо реализовать функцию getDigitsSum, которая будет складывать 
все цифры в числе, пока не останется лишь одна какая-то цифра. 
Необходимо сделать два варианта решения, первый вариант решения не 
должен использовать рекурсию, второй вариант должен быть рекурсивным.
Примеры:
5  ==>  5
57  ==>  5 + 7 = 12  
    ==>  1 + 2 = 3  
    ==>  3
87653  ==>  8 + 7 + 6 + 5 + 3 = 29  
       ==>  2 + 9 = 11  
       ==>  1 + 1 = 2  
       ==>  2
*/
// Вариант без рекурсии
function digitsSum(value) {
    while (value > 9) {
        value = value.toString().split('').reduce((acc, str) => acc + +str, 0);
    }
    return value;
}
// Вариант с рекурсией
function digitsSumRec(value) {
    if (value < 10) return value;
    return digitsSumRec(value.toString().split('').reduce((acc, str) => acc + +str, 0));
}
console.log(digitsSum(5)); // 5
console.log(digitsSumRec(5)); // 5
console.log(digitsSum(57)); // 3
console.log(digitsSumRec(57)); // 3
console.log(digitsSum(876512)); // 2
console.log(digitsSumRec(876512)); // 2
// 01:21:37 - Вопрос про использование RxJS
// 01:23:58 - Вопрос про поиск работы
// 01:25:26 - Вопрос про TypeScript
// 01:32:03 - Вопросы про собеседования