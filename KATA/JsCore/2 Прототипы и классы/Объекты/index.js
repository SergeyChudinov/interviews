/*
Invert
Напишите функцию, которая создает объект, состоящий из инвертированных ключей и значений объекта.
Если объект содержит повторяющиеся значения, последующие значения перезаписывают присвоения свойств предыдущих значений.
*/
function invert(obj) {
  const newObj = {};
  for (const arr of Object.entries(obj)) {
    newObj[arr[1]] = arr[0];
  }
  return newObj;
}
console.log(invert({ a: 1, b: 2, c: 3 })); // { 1: a, 2: b, 3: c }

function invert2(obj) {
  return Object.entries(obj).reduce((acc, arr) => {
    acc[arr[1]] = arr[0];
    return acc;
  }, {});
}
console.log(invert2({ a: 1, b: 2, c: 3 })); // { 1: a, 2: b, 3: c }
console.clear()

/* !!!!!!!!!
DeepEqual
Напишите функцию, которая проверяет на равенство два объекта, учитывая их вложенность.
Два объекта считаются равными, если у них все свойства одинаковы. В случае, если одно из свойств - само объект, мы сравниваем на равенство эти объекты по тому же алгоритму. Пример:
*/
const firstObject = {
  a: {
    b: {
      c: 1,
      d: "string",
      e: {
        num: 1,
      },
    },
  },
};
const secondObject = {
  a: {
    b: {
      e: {
        num: 1,
      },
      d: "string",
      c: 1,
    },
  },
};
function deepEqual(obj1, obj2) {
  if (typeof obj1 !== "object" || typeof obj2 !== "object") return obj1 === obj2;
  if ((obj1 === null && obj2 !== null) || (obj1 !== null && obj2 === null)) return false;
  if ((obj1 === null && obj2 === null)) return true
    
  function recursion(obj) {
    const object = {}
    for (let i in Object.fromEntries(
      Object.entries(obj).sort((a, b) => {
        if (a[0] > b[0]) return 1;
        else return -1;
      })
    )) {
      if (typeof obj[i] === "object" && obj[i] !== null) {
        object[i] = recursion(obj[i]);
      } else {
        object[i] = obj[i];
      }
    }
    return object;
  }

  return JSON.stringify(recursion(obj1)) === JSON.stringify(recursion(obj2));
}
console.log(deepEqual(firstObject, secondObject)); // true
console.log(deepEqual({ a: 1, b: 3 }, { b: 2, a: 1 })); // false
console.log(deepEqual(1, 2)); // false
console.log(deepEqual(true, false)); // false
console.log(deepEqual({ name: "Misha", order: { price: 20 } }, {"name":"Misha","order":{"price":20},"extraField":null})); // false

/*
Sum
Реализуйте функцию sum, которая принимает неограниченное количество чисел в качестве аргументов и возвращает их сумму. Вызов функции без аргументов должен вернуть 0. В случае, если аргумент не является числом и не может быть приведен к таковому, нужно проигнорировать его. Если его можно привести к числу, то приведите его и прибавьте, как и обычное число.
*/
const sum = (...arr) => {
  if (!arr) return 0
  return arr.reduce((acc, el) => {
    if (typeof +el === "number" && !isNaN(+el)) acc += +el;
    return acc
  }, 0);
};
console.log(
    sum(1, 2, 3, 4, 5, 6),
); // 21
console.log(
    sum(-10, 15, 100),
); // 105
console.log(
    sum(),
); // 0
console.log(
    sum(1, 'fqwfqwf', {}, [], 3, 4, 2, true, false),
); // 11. Прим: true было приведено к 1 (см. преобразование типов в js)

/*
Merge
Реализуйте функцию merge, которая будет принимать неограниченное количество объектов в качестве аргументов и возвращать новый объект, который должен содержать все поля со всех объектов. Если ключи в объектах повторяются, то каждый последующий объект при совпадении ключей должен иметь больший приоритет над предыдущим. Порядок полей в результирующем объекте не важен.
*/
const merge = (...args) => {
  return Object.assign({}, ...args)
};
console.log(
  merge(
    {
      name: "John",
      age: 22,
    },
    {
      surname: "Klein",
      age: 20,
      profession: "student",
    },
    {
      profession: "frontend developer",
      country: "USA",
    }
  )
);

// ...spred и ...rest
let str = "Привет";
console.log([...str]); // ['П', 'р', 'и', 'в', 'е', 'т']
console.log(Array.from(str));  // ['П', 'р', 'и', 'в', 'е', 'т']

// Деструктуризация
let guest = "Jane";
let admin = "Pete";
// Давайте поменяем местами значения: сделаем guest = "Pete", а admin = "Jane"
[guest, admin] = [admin, guest];
console.log(`${guest} ${admin}`); // Pete Jane (успешно заменено!)

/*
Максимальная зарплата
важность: 5
У нас есть объект salaries с зарплатами:
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
Создайте функцию topSalary(salaries), которая возвращает имя самого высокооплачиваемого сотрудника.
Если объект salaries пустой, то нужно вернуть null.
Если несколько высокооплачиваемых сотрудников, можно вернуть любого из них.
P.S. Используйте Object.entries и деструктурирование, чтобы перебрать пары ключ/значение.
*/
let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};
function topSalary(salaries) {
  let [maxName, maxSalaries] = [null, 0]
  for (let [name, salarie] of Object.entries(salaries)) {
    salarie > maxSalaries && ([maxName, maxSalaries] = [name, salarie]);
  }
  return maxName;
}
console.log(topSalary(salaries));

/*
Languages Statistic
Реализуйте функцию getLanguagesStatistic, которая поможет IT журналу подвести итоги 2019 года по популярности использования языков программирования. На входе функция получает массив отзывов пользователей. Необходимо вернуть объект в формате { languageName: count, anotherLanguageName: anotherCount, ... }, где languageName - название языка в строке, а count - число отзывов, которые оставили программисты, использующие этот язык. При этом следует учитывать только те отзывы пользователей, которые были оставлены в 2019 году. Год отзыва хранится в поле year, язык - в поле language.
*/
const data = [
  { firstName: 'Noah', lastName: 'M.', country: 'Switzerland', continent: 'Europe', age: 19, language: 'C', year: 2019 },
  { firstName: 'Anna', lastName: 'R.', country: 'Liechtenstein', continent: 'Europe', age: 52, language: 'JavaScript', year: 2019 },
  { firstName: 'Piter', lastName: 'G.', country: 'Sweden', continent: 'Europe', age: 30, language: 'JavaScript', year: 2019 },
  { firstName: 'Ramon', lastName: 'R.', country: 'Paraguay', continent: 'Americas', age: 29, language: 'Ruby', year: 2014 },
  { firstName: 'George', lastName: 'B.', country: 'England', continent: 'Europe', age: 81, language: 'C', year: 2016 },
];
const getLanguagesStatistic = (feedbacks) => {
  return feedbacks.reduce((acc, { language, year }) => {
    if (year === 2019) {
      acc[language] ? acc[language]++ : acc[language] = 1
    }
    return acc
  }, {});
};
const result = getLanguagesStatistic(data);
console.log(result)

/*
Напишите функцию aclean(arr), которая возвращает массив слов, очищенный от анаграмм.
*/
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
function aclean(arr) {
  let map = new Map();
  for (let word of arr) {
    let sorted = word.toLowerCase().split("").sort().join("");
    map.set(sorted, word);
  }
  return Array.from(map.values());
}
console.log(aclean(arr));

// Без Map
function aclean2(arr) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }
  return Object.values(obj);
}
console.log(aclean2(arr));
console.clear()

/*
getArraysCounts
Реализуйте функцию getArraysCounts, которая принимает массив в качестве аргумента. Функция должна вернуть Map, в котором ключи - все уникальные элементы в массиве, а значения - количество этих элементов в массиве.
*/
const getArraysCounts = (arr) => {
  return arr.reduce((acc, key) => {
    if (acc.has(key)) {
      acc.set(key, acc.get(key) + 1);
    } 
    else {
      acc.set(key, 1)
    }
    return acc
  }, new Map())
};
const obj = { name: 123 };
const data_new = [1, 1, 1, 2, 2, 2, 2, true, true, obj, obj, { name: 123 }];
const counts = getArraysCounts(data_new); // экземпляр Map
console.log(counts.get(1)); // 3
console.log(counts.get(2)); // 4
console.log(counts.get(true)); // 2
console.log(counts.get(obj)); // 2
console.clear();

/*
Unique
Реализуйте функцию unique, которая принимает массив в качестве аргумента и возвращает новый массив, в котором содержатся только уникальные значения из исходного массива. Исходный массив не должен изменяться.
Порядок элементов должен сохраняться.
Используйте Set для реализации этой функции.
*/
const unique = (arr) => {
  return [...new Set(arr)]
};
const data1 = [1, 2, 3, 3, 4, 4];
console.log(unique(data1)); // [1, 2, 3, 4]
const obj_new = { name: 'John' };
const data2 = [obj_new, obj_new, obj_new, { name: "John" }];
const result2 = unique(data2);
console.log(result2); // [{ name: 'John' }, { name: 'John' }]
console.log(result2[0] === obj_new); // true
console.log(result2[1] === obj_new); // false
console.clear();

/*
getDaysBetweenDates
Реализуйте функцию getDaysBetweenDates которая принимает на вход две даты и возвращает количество полных дней между ними.
Функция должна корректно работать с объектом Date
Функция должна корректно рабоать со значениями в миллисекундах
Если входные параметры - невалидные даты, то функция вовращает NaN:
Если аргументов меньше 2-х, то функция должна пробросить исключение TypeError
*/
function getDaysBetweenDates (a, b) {
    let firstDay = new Date(a);
    let secondDay = new Date(b);
    if (arguments.length < 2) {
        throw new TypeError("TypeError");
    } else {
        let day = 1000 * 60 * 60 * 24;
        let time = secondDay.getTime() - firstDay.getTime();
        let days = 0;
        days = Math.trunc(time / day);
        if (days === -0) days = 0

    return days;
}
};
console.log(getDaysBetweenDates('1-1-2020', '1-2-2020')); // -> 1
console.log(getDaysBetweenDates(new Date(2011, 6, 2, 6, 0), new Date(2012, 6, 2, 18, 0))); // -> 366
console.log(getDaysBetweenDates(1409796000000, 1409925600000)); // -> 1
console.log(getDaysBetweenDates('1-1-2020', 'дата')); // -> NaN
// console.log(getDaysBetweenDates(null)); // -> TypeError
