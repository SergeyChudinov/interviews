function hello() {
  console.log("Hello", this);
}
const person = {
  name: "Vladilen",
  age: this,
  sayHello: hello,
  sayHelloWindow: hello.bind(this), // this window
  alert: function () {
    console.log(this.name);
  },
};
console.log(person);
person.alert();
person.sayHelloWindow();

/*
создать метод для данной функции
*/
function muliBy(arr, n) {
  return arr.map(function (i) {
    return i * n;
  });
}
const array = [1, 2, 3, 4, 5];
console.log(muliBy(array, 5));

Array.prototype.muliBy = function (callback) {
  const length = this.length;
  let result = [];
  for (let i = 0; i < length; i++) {
    if (this[i]) {
      result.push(callback.call(this, this[i]));
    }
  }
  return result;
};
console.log(array.muliBy((num) => Math.pow(num, 2)));
console.log(array);

// Прозрачное кеширование
function slow(x) {
  // здесь могут быть ресурсоёмкие вычисления
  console.log(`Called with ${x}`);
  return x;
}
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {    // если кеш содержит такой x,
      return cache.get(x); // читаем из него результат
    }
    let result = func(x); // иначе, вызываем функцию
    cache.set(x, result); // и кешируем (запоминаем) результат
    return result;
  };
}
slow = cachingDecorator(slow);
console.log( slow(1) ); // slow(1) кешируем
console.log( "Again: " + slow(1) ); // возвращаем из кеша
console.log( slow(2) ); // slow(2) кешируем
console.log("Again: " + slow(2)); // возвращаем из кеша

// Прозрачное кеширование и Декораторы
// сделаем worker.slow кеширующим
let worker = {
  someMethod() {
    return 1;
  },
  slow(x) {
    // здесь может быть страшно тяжёлая задача для процессора
    console.log("Called with " + x);
    return x * this.someMethod(); // (*)
  },
};
function cachingDecorator(func) {
  let cache = new Map();
  return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    console.log(this); // ???
    let result = func.call(this, x); // (**)
    cache.set(x, result);
    return result;
  };
}
// let func = worker.slow; // теряем this , т.к не вызываем!
// console.log(func(3));
console.log(worker.slow(1)); // оригинальный метод работает
worker.slow = cachingDecorator(worker.slow); // теперь сделаем его кеширующим
console.log(worker.slow(2));

/*
Как же кешировать метод с несколькими аргументами worker.slow?
1. Использовать вложенные коллекции: cache.set(min) будет Map, которая хранит пару (max, result). Тогда получить result мы сможем, вызвав cache.get(min).get(max).
*/
let worker2 = {
  someMethod() {
    return 2;
  },
  slow(min, max) {
    return (min + max) * this.someMethod(); // здесь может быть тяжёлая задача
  },
};
function cachingDecorator2(func) {
  let cache = new Map();
  return function (min, max) {
    if (cache.has(min) && cache.get(min).has(max)) {
      console.log(cache, min, max);
      return cache.get(min).get(max);
    } else if (cache.has(min)) {
      let result = func.call(this, min, max);
      cache.set(min, new Map([...cache.get(min), [max, result]]));
      console.log(cache, min, max);
      return result;
    }
    let result = func.call(this, min, max); // (**)
    cache.set(min, new Map([[max, result]]));
    console.log(cache, min, max);
    return result;
  };
}
console.log(worker2.slow(1, 3)); // оригинальный метод работает
worker2.slow = cachingDecorator2(worker2.slow); // теперь сделаем его кеширующим
console.log(worker2.slow(2, 4));
console.log(worker2.slow(2, 5));
console.log(worker2.slow(2, 6));
console.log(worker2.slow(3, 10));


/*
2. Соединить два значения в одно. В нашем конкретном случае мы можем просто использовать строку "min,max" как ключ к Map. Для гибкости, мы можем позволить передавать хеширующую функцию в декоратор, которая знает, как сделать одно значение из многих.
*/
let worker3 = {
  someMethod() {
    return 2;
  },
  slow(min, max) {
    console.log(`Called with ${min},${max}`);
    return (min + max) * this.someMethod();
  },
};
function cachingDecorator3(func, hash) {
  let cache = new Map();
  return function () {
    console.log(arguments);
    let key = hash(arguments); // (*)
    if (cache.has(key)) {
      return cache.get(key);
    }
    let result = func.call(this, ...arguments); // (**)
    cache.set(key, result);
    return result;
  };
}
function hash(args) {
  return args[0] + "," + args[1];
}
/*
оптимизация функции hash
можем попобовать склеить методом .join => return args.join() или => arguments.join()
join  не сработает , т.к arguments- это псевдомассив и у него нет метода join
Но есть выход => [].join.call(arguments) 
*/
function hash2() {
  console.log([].join.call(...arguments));
  return [].join.call(arguments); // 1,2
}
worker3.slow = cachingDecorator3(worker3.slow, hash2);
console.log(worker3.slow(3, 5)); // работает
console.log("Again " + worker3.slow(3, 5)); // аналогично (из кеша)

// function hash2(...args) {
//   console.log([].join.call(arguments, " ")); // передали ' ' для разделителя
//   return [].join.call(arguments);
// }
// hash2(1, 2);


/*
Декоратор-шпион
Создайте декоратор spy(func), который должен возвращать обёртку, которая сохраняет все вызовы функции в своём свойстве calls.
*/
function work(a, b) {
  console.log(a + b); // произвольная функция или метод
}
function spy(fn) {
  function wrapper(...args) {
    wrapper.calls.push(args);
    // wrapper.calls.push(arguments);
    return fn.apply(this, args);
  }
  wrapper.calls = [];
  return wrapper;
}
work = spy(work);
work(1, 2); // 3
work(4, 5); // 9 [].join.call(args)
for (let args of work.calls) {
  console.log("call:" + args.join()); // "call:1,2", "call:4,5"
  // console.log("call:" + [].join.call(args));
}

/*
Задерживающий декоратор
Создайте декоратор delay(f, ms), который задерживает каждый вызов f на ms миллисекунд.
*/
function delay(func, ms) {
  return function () {
    setTimeout(() => func.apply(this, arguments), ms);
  };
}
// создаём обёртки
let f1000 = delay(console.log, 1000);
let f1500 = delay(console.log, 1500);
// f1000("test"); // показывает "test" после 1000 мс
// f1500("test"); // показывает "test" после 1500 мс

/*
Декоратор debounce
Результатом декоратора debounce(f, ms) должна быть обёртка, которая передаёт вызов f не более одного раза в ms миллисекунд. Другими словами, когда мы вызываем debounce, это гарантирует, что все остальные вызовы будут игнорироваться в течение ms.
На практике debounce полезен для функций, которые получают/обновляют данные, и мы знаем, что повторный вызов в течение короткого промежутка времени не даст ничего нового. Так что лучше не тратить на него ресурсы.
*/
function debounce2(func, ms) {
  let now = Date.now();
  let count = 0;
  return function () {
    if (count === 0 || Date.now() - now >= ms) {// прошло меньше секунды
      func.apply(this, arguments);
      now = Date.now();
      count = 1;
    }
  };
}

let f2 = debounce2(console.log, 1000);
// f2(1); // выполняется немедленно
// f2(2); // проигнорирован
// setTimeout(() => f2(3), 100); // проигнорирован (прошло только 100 мс)
// setTimeout(() => f2(4), 1100); // выполняется
// setTimeout(() => f2(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)

// решение learn.javascript
function debounce3(f, ms) {
  let isCooldown = false;
  return function () {
    if (isCooldown) return;
    f.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => (isCooldown = false), ms);
  };
}
let f3 = debounce3(console.log, 1000);
f3(1); // выполняется немедленно
f3(2); // проигнорирован
// setTimeout(() => f3(3), 100); // проигнорирован (прошло только 100 мс)
// setTimeout(() => f3(4), 1100); // выполняется
// setTimeout(() => f3(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)


/*
Тормозящий (throttling) декоратор
Создайте «тормозящий» декоратор throttle(f, ms), который возвращает обёртку, передавая вызов в f не более одного раза в ms миллисекунд. Те вызовы, которые попадают в период «торможения», игнорируются.
Отличие от debounce – если проигнорированный вызов является последним во время «задержки», то он выполняется в конце.
*/

function throttle4(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;
  function wrapper() {
    if (isThrottled) {   // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    func.apply(this, arguments); // (1)
    isThrottled = true;
    setTimeout(function () {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }
  return wrapper;
}
let f4 = throttle4(console.log, 1000);
// f4(1); // выполняется немедленно
// f4(2); // проигнорирован
// f4(3);
// setTimeout(() => f4(4), 100); // выполняется (прошло только 100 мс)
// setTimeout(() => f4(5), 1100); // проигнорирован
// setTimeout(() => f4(6), 1500); // выполняется

const obj = {
  a: 1,
  fn() {
    const arrowFn = () => console.log(this);
    arrowFn();
  },
};
obj.fn() // obj

const obj2 = {
  a: 1,
  fn1() {
    console.log(this);
    return {
      fn2: () => {
        console.log(this)
      }
    }
  }
}
// obj.fn1();  // this будет {}
obj2.fn1().fn2() // this будет {}


/*Ката тестовое
Prototypes Decorator
Необходимо добавить возможность логирования в функцию add класса Addition
Используя прототип класса Addition добавить декоратор к функции add, дающий возможность логировать ее вызов
При этом результат выполнения add должен быть как и в оригинале, но дополнительно при вызове выводить в консоль 'called'
Менять изначальную функцию, класс или созданный объект нельзя.
Код можно писать только в обозначенной зоне.
*/
class Addition {
  constructor(num) {
    this.num = num;
  }
  add(...nums) {
    const sum = (a, b) => a + b;
    return this.num + nums.reduce(sum);
  }
}
function decorator(func) {
  return function () {
    console.log("called");
    return func.apply(this, arguments);
  };
}
Addition.prototype.add = decorator(Addition.prototype.add);

const startedValue = new Addition(5);
const result = startedValue.add(3,5,6) //В консоль выводится "called"
console.log(result) //В консоль выводится 19