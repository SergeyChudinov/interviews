// 1
const link = document.querySelector('a')
const nextClick = new Promise(resolve => {
  link.addEventListener('click', resolve, {once: true})
})
nextClick.then(event => {
  event.preventDefault()
  console.log("preventDefault");
})
// link.click()

// 2
const button = document.querySelector("button");
button.addEventListener('click', () => {
  Promise.resolve().then(() => console.log('Microtask 1'));
  console.log('Listener 1')
})
button.addEventListener("click", () => {
  Promise.resolve().then(() => console.log("Microtask 2"));
  console.log("Listener 2");
});
// button.click()

const firstPromise = new Promise(function (resolve) {
  return resolve("first");
});
const secondPromise = new Promise(function (resolve) {
  resolve("second");
});
const doAllThings = firstPromise.then(function () {
  return secondPromise;
});
doAllThings.then(function (result) {
  console.log(result); // This logs: "second"
});

// Просто рандомные асинхронные функции, работающие со значением
async function thingOne() {}
async function thingTwo(value) { }
async function thingThree(value) {}
async function doManyThings() {
 var result = await thingOne();
 var resultTwo = await thingTwo(result);
 var finalResult = await thingThree(resultTwo);
 return finalResult;
}
// Вызовите doManyThings()
/*
Итак, теперь doManyThings() это тоже асинхронная функция, как нам ожидать её? Да никак. Не с нашим новым синтаксисом. У нас есть три варианта:
1. Дайте оставшемуся коду выполниться и не ждать завершения, как нам и нужно во многих случаях.
2. Запустите её внутри ещё одной асинхронной функции, обернутой в блок try/catch.
3. Или используйте как промис.
*/
// Вариант 1:
doManyThings();
// Вариант 2:
(async function() {
  try {
    await doManyThings();
  } catch (err) {
    console.error(err);
  }
})();
// Вариант 3:
doManyThings().then((result) => {
  // Делаем штуки, которым нужно подождать нашей функции
}).catch((err) => {
  throw err;
});

// Более глубокое понимание
function main() {
  console.log('A')  
  setTimeout(function exec() {
    console.log('B')
  }, 0)  
  runWhileLoopForNSeconds(3)  
  console.log('C')
}
main()
function runWhileLoopForNSeconds(sec) {
  let start = Date.now(),  
  now = start  
  while (now - start < sec * 1000) {  
    now = Date.now()
  }
}