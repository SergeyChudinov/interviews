// 1
function defer(f, ms) {
  return function() {
    console.log(this)
    setTimeout(() => f.apply(this, arguments), ms)
  };
}
function sayHi(who) {
  console.log(this);
  console.log("Hello, " + who);
}
let sayHiDeferred = defer(sayHi, 1000);
sayHiDeferred("John"); // выводит "Hello, John" через 2 секунды

// То же самое без стрелочной функции выглядело бы так:
function defer2(f, ms) {
  return function (...args) {
    let ctx = this;
    setTimeout(function () {
      return f.apply(ctx, args);
    }, ms);
  };
}
let sayHiDeferred2 = defer2(sayHi, 2000);
sayHiDeferred2("John"); // выводит "Hello, John" через 2 секунды