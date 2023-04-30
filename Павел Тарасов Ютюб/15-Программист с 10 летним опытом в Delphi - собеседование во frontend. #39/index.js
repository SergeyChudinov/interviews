// 07:05 - Какая разница между innerHTML и insertAdjacentHTML?
const div = document.querySelector('div');
console.log(div.innerText); // Hello
console.log(div.textContent); // Hello World
console.log(div.innerHTML); // Hello <span style="display: none;">World</span>
div.insertAdjacentHTML('afterbegin', '<span>Привет1</span>');

const span = document.createElement('span');
span.innerHTML = 'Привет2';
div.append(span)
/*insertAdjacentHTML работает быстрее, так как не переписывает елементы, а добовляет!
*/
// 10:41 - Что будет при выполнении кода?
// function option(i) {
// 	i++
// }
// for (let i = 0; i < 100; option(i)) {
// 	if (i === 9) {
// 		console.log(i);
// 		break;
// 	}
// 	console.log(i)
// }
function option(i) {
	i.i++
}
for (let i = {i: 0}; i.i < 100; option(i)) {
	if (i.i === 9) {
		console.log(i.i);
		break;
	}
	console.log(i.i)
}
// 16:37 - Тупые вопросы по js
console.log([] == ''); // оба приведуться к 0
console.log(Boolean([]) == Boolean(''));

console.log({} + []); // '[object Object]'
console.log([] + {}); // '[object Object]'

// 24:15 - Задача подсмотренная у А.В. Савватеева (https://jsfiddle.net/mockinterview/he...)
/*
У программиста есть 25 вариантов кода, однако протестировать на одинаковых 
данных этот код не получится, входящие данные всегда разные. За один раз мы 
можем запустить только 5 вариантов кода одновременно с одними и теми же 
входящими параметрами, при этом, мы поймем какой вариант отработал первым, 
вторым, третьим, четвертым и пятым.
Какое минимальное количество запусков нам нужно сделать, чтобы определить топ-3 
самых быстрых вариантов кода?
Необходимо реализовать алгоритм для нахождения топ-3 быстрейших вариантов, 
нужно будет вывести порядковые номера вариантов кода.
*/
const testSpeed = (() => {
  // const codeVariants = Array.from(
  //   {length: 25},
  //   (_, i) => ({number: i + 1, value: Math.floor(Math.random() * 1001)})
  // ).reduce((acc, o) => (acc[o.number] = o.value, acc), {});
  const codeVariants = {
    1: 25,   2: 2,   3: 3,   4: 4,   5: 5,
    6: 6,   7: 7,   8: 8,   9: 9,   10: 10,
    11: 11, 12: 12, 13: 13, 14: 14, 15: 15,
    16: 16, 17: 17, 18: 18, 19: 19, 20: 20,
    21: 21, 22: 22, 23: 23, 24: 24, 25: 1,
  };

  let cache = [];
  console.group('Code speeds');
  console.log(codeVariants);
  console.groupEnd();

  return arr => {
    let first;
    if (arr.length === 6) {
      first = arr[0];
      arr.shift();
    }
    if (arr.length !== 5 || arr.some(v => !Number.isInteger(v))) {
      throw TypeError('Array must contain 5 integers.');
    }
    if (new Set(arr).size !== arr.length) {
      throw TypeError('Array must contain different integers.');
    }
    if (arr.some(v => v > 25 || v < 1)) {
      throw TypeError('Array must contain integers in range [1, 25].');
    }
    const newArr = arr
      .map(number => ({number, value: codeVariants[number]}))
      .sort((a, b) => a.value - b.value)
      .map(o => o.number);
    if (newArr.length === cache.length && Array.isArray(cache[0])) {
      cache.sort((a, b) => codeVariants[a[0]] - codeVariants[b[0]])
      for (let i = 0; i < 5; i++) {
        if (i < 3) {
          for (let j = 3; j < 5; j++) {
            cache[i].pop();
          }
        } else {
          cache.pop();
        }
      }
      cache = cache[0].concat(cache[1].slice(0, 2), cache[2].slice(0, 1));
      return cache;
    }
    if (first) {
      return [first, ...newArr.slice(0, 2)]
    }
    cache.push(newArr);
    return newArr;
  };
})();
// const arr1 = testSpeed([1,2,3,4,5]) // [1, 2, 3, 4, 5]
// console.log(arr1)
// const arr2 = testSpeed([6,7,8,9,10]) // [6, 7, 8, 9, 10]
// console.log(arr2)
// const arr3 = testSpeed([11,12,13,14,15]) // [11, 12, 13, 14, 15]
// console.log(arr3)
// const arr4 = testSpeed([16,17,18,19,20]) // [16, 17, 18, 19, 20]
// console.log(arr4)
// const arr5 = testSpeed([21,22,23,24,25]) // [21, 22, 23, 24, 25]
// console.log(arr5)
// const arr6 = testSpeed([1,2,3,4,5]) // [1, 2, 3, 6, 7, 11]
// console.log(arr6)
// const arr7 = testSpeed([25, 21, 22, 2, 3, 6]) // [1, 2, 3]
// console.log(arr7)

// let arr;
// let i = 1;
// for (j = 1; j <= 7; j++) {
//   if (j < 6) {
//     arr = testSpeed([i,i+1,i+2,i+3,i+4]);
//     i += 5;
//   } else {
//     arr = testSpeed([...arr]);
//     if (j === 7) {
//     }
//   }
// }
// console.log(arr)

//2 вариант
const testSpeed2 = (() => {
  // const codeVariants = Array.from(
  //   {length: 25},
  //   (_, i) => ({number: i + 1, value: Math.floor(Math.random() * 1001)})
  // ).reduce((acc, o) => (acc[o.number] = o.value, acc), {});

  const codeVariants = {
    1: 25,   2: 2,   3: 3,   4: 4,   5: 5,
    6: 6,   7: 7,   8: 8,   9: 9,   10: 10,
    11: 11, 12: 12, 13: 13, 14: 14, 15: 15,
    16: 16, 17: 17, 18: 18, 19: 19, 20: 20,
    21: 21, 22: 22, 23: 23, 24: 24, 25: 1,
  };

  console.group('Code speeds');
  console.log(codeVariants);
  console.groupEnd();
  return arr => {
    if (arr.length !== 5 || arr.some(v => !Number.isInteger(v))) {
      throw TypeError('Array must contain 5 integers.');
    }
    if (new Set(arr).size !== arr.length) {
      throw TypeError('Array must contain different integers.');
    }
    if (arr.some(v => v > 25 || v < 1)) {
      throw TypeError('Array must contain integers in range [1, 25].');
    }
    return arr
      .map(number => ({number, value: codeVariants[number]}))
      .sort((a, b) => a.value - b.value)
      .map(o => o.number);
  };
})();
// let cache = [];
// let first;
// for (i = 0; i < 5; i++) {
//   const res = testSpeed2([i*5+1,i*5+2,i*5+3,i*5+4,i*5+5]);
//   cache.push(res);
// }
// let sliceRes = testSpeed2([cache[0][0],cache[1][0],cache[2][0],cache[3][0],cache[4][0]]).slice(0, 3); // [25, 2, 6]
// console.log('cache', cache);
// console.log('sliceRes', sliceRes) 
// const obj = {} // {2: 0, 6: 1, 25: 4}
// sliceRes.forEach((el, i) => {
//   for (let j = 0; j < cache.length; j++) {
//     if (cache[j].includes(el)) {
//       obj[el] = j;
//     }
//   }
// })
// console.log(obj)
// const arr = [...cache[obj[sliceRes[0]]].slice(1, 3), ...cache[obj[sliceRes[1]]].slice(0, 2), ...cache[obj[sliceRes[2]]].slice(0, 1)] // [21, 22, 2, 3, 6]
// console.log(arr)
// res = testSpeed2([...arr]);
// const result = [cache[obj[sliceRes[0]]][0], ...res.slice(0, 2)]
// console.log(result) //[25, 2, 3]

//вариант ученика
const testSpeed3 = (() => {
  // const codeVariants = Array.from(
  //   {length: 25},
  //   (_, i) => ({number: i + 1, value: Math.floor(Math.random() * 1001)})
  // ).reduce((acc, o) => (acc[o.number] = o.value, acc), {});

  const codeVariants = {
    1: 25,   2: 2,   3: 3,   4: 4,   5: 5,
    6: 6,   7: 7,   8: 8,   9: 9,   10: 10,
    11: 11, 12: 12, 13: 13, 14: 14, 15: 15,
    16: 16, 17: 17, 18: 18, 19: 19, 20: 20,
    21: 21, 22: 22, 23: 23, 24: 24, 25: 1,
  };

  console.group('Code speeds');
  console.log(codeVariants);
  console.groupEnd();
  return arr => {
    if (arr.length !== 5 || arr.some(v => !Number.isInteger(v))) {
      throw TypeError('Array must contain 5 integers.');
    }
    if (new Set(arr).size !== arr.length) {
      throw TypeError('Array must contain different integers.');
    }
    if (arr.some(v => v > 25 || v < 1)) {
      throw TypeError('Array must contain integers in range [1, 25].');
    }
    return arr
      .map(number => ({number, value: codeVariants[number]}))
      .sort((a, b) => a.value - b.value)
      .map(o => o.number);
  };
})();
const fiveGroup = [];
for (let i = 0; i< 5; i++) {
  fiveGroup.push(testSpeed3([i*5+1,i*5+2,i*5+3,i*5+4,i*5+5]))
}
console.log('fiveGroup', fiveGroup);

const leaders = testSpeed3([
  fiveGroup[0][0],
  fiveGroup[1][0],
  fiveGroup[2][0],
  fiveGroup[3][0],
  fiveGroup[4][0],
]);
leaders.length = 3;
console.log('leaders', leaders);

let top3Droup = fiveGroup.filter(el => leaders.includes(el[0]));
console.log('top3Droup', top3Droup);

console.log(leaders.indexOf(2)) // 1
console.log(leaders.indexOf(6)) // 2
console.log(leaders.indexOf(25)) // 0

top3Droup = top3Droup.sort((a,b) => leaders.indexOf(a[0]) - leaders.indexOf(b[0]));
console.log('top3Droup', top3Droup);

const best3 = testSpeed3([
  top3Droup[0][1],
  top3Droup[0][2],
  top3Droup[1][0],
  top3Droup[1][1],
  top3Droup[2][0],
]);
console.log('best3', best3);

console.log(leaders[0], best3[0], best3[1]);

// 57:51 - Задача про счет (https://jsfiddle.net/mockinterview/kv...)
/*
Необходимо реализовать функцию Score, которая представляет из себя счет в 
соревнованиях 2-х игроков.
*/
function Score() {
	const goal = [];
  let firstScore = 0;
  let secondScore = 0;
  this.getHistory = function () {return goal};
  Object.defineProperty(this, 'firstPlayerScore', {
    set(val) {
      firstScore = val;
      goal.push({
        firstPlayerScore: firstScore,
        secondPlayerScore: secondScore
      })
    },
    get() {
      return firstScore;
    }
  })
  Object.defineProperty(this, 'secondPlayerScore', {
    set(val) {
      secondScore = val;
      goal.push({
        firstPlayerScore: firstScore,
        secondPlayerScore: secondScore
      })
    },
    get() {
      return secondScore;
    }
  })
}
const score = new Score();
score.firstPlayerScore = 1;
score.firstPlayerScore = 2;
score.secondPlayerScore = 1;
console.log(score.firstPlayerScore); // 2
console.log(score.secondPlayerScore); // 1
/*
[
  {firstPlayerScore: 1, secondPlayerScore: 0},
  {firstPlayerScore: 2, secondPlayerScore: 0},
  {firstPlayerScore: 2, secondPlayerScore: 1},
]
*/
console.log(score.getHistory());



// 01:12:13 - Для кого были эти задачи junior, middle?
// 01:13:37 - Что на Delphi пишиешь?
// 01:21:59 - Если б мог вернуть время, изучал бы веб или все же Delphi?
// 01:24:59 - Возьмешь к себе в ученики людей по Delphi?
// 01:26:36 - Каким видишь идеального ученика?
// 01:27:44 - Есть ли дефицит Delphi-разработчиков?
// 01:34:25 - Какой спрос на frontend-разработчиков? Как-то изменился?
// 01:37:36 - Стал ли тяжелее вход для разработчиков?
// 01:40:48 - Про нежелание компаний давать обратную связь.
// 01:45:15 - Нравится текущая работа?
// 01:48:47 - Нужен ли формат трансляции-посиделок? Отпишитесь в комментарии.
// 01:54:40 - Какие рекомендации junior-разработчику по устройству на работу?
// 01:55:36 - Решаешь задачки на codewars?
// 01:57:02 - Завершение