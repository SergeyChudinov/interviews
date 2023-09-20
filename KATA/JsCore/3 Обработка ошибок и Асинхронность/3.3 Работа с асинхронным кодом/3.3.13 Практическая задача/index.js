/*
Throttle
Реализуйте функции throttle.
Примечание: из-за особенностей тестирования реализация new Date() изменена так, что изначальная текущая дата (new Date() или Date.now()) будет равна нулю и будут вручную увеличиваться в тестах. Учтите это, если будете использовать дату в реализации функций.
Примечание: функции, полученные из throttle, должны передавать полученные аргументы и контекст вызова в оригинальную функцию
Примечание: функция throttle может быть реализована без использования таймеров
Функция должна принимать функцию и время задержки, а возвращать модифицированную функцию. Возвращенная функция должна следовать следующим правилам:
Функция throttle должна вызывать функцию и запускать таймер, равный времени задержки, в течение которого функция не может быть вызвана заново. Throttle необходим для того, чтобы обеспечить возможность вызова функции не чаще, чем указанное время задержки. Если время задержки равно 500 мс, то при вызове функции, возвращенной из throttle, каждые 100 мс 10 раз подряд функция будет вызвана лишь три раза:
первый вызов функции на 0мс (первая попытка вызова функции после 0 мс задержки),
второй на 500 мс (пятая попытка вызова функции после 500 мс задержки)
и третий на 1000 мс (десятая попытка вызова функции после 1000 мс задержки).
*/
const throttle = (fn, throttleTime) => {
  let isCooldown = false;
  return function () {
    if (isCooldown) return;
    fn.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => (isCooldown = false), throttleTime);
  };
};
let counter = 0;
const fn = () => {
  counter++;
};
const throttledFn = throttle(fn, 500); // функция может быть вызвана не чаще, чем раз в 500 мс
const intervalId = setInterval(throttledFn, 100);
// setTimeout(() => clearInterval(intervalId), 1000); // удаляем интервал через 10 вызовов
// console.log(counter); // 3
// setTimeout(() => console.log(counter), 3000)

/*
Debounce
Реализуйте функции debounce.
Примечание: функции, полученные из debounce, должны передавать полученные аргументы и контекст вызова в оригинальную функцию
Функция должна принимать функцию и время задержки, а возвращать модифицированную функцию. Возвращенная функция должна следовать следующим правилам:
Функция debounce должна запускать таймер, равный времени задержки, и игнорировать вызовы функции в течение времени задержки, а так же начинать отсчет задержки заново каждый раз, когда функция была вызвана. Как только пройдет время задержки с момента последнего вызова функции, дебаунс должен вызвать последнюю вызванную функцию. Debounce нужен для того, чтобы "собрать" многократные вызовы одной и той же функции в течение короткого промежутка времени и вызвать ее только единожды после окончания вызовов. При вызове функции, возвращенной из debounce (переданная в debounce задержка равна 200 мс), 100 раз подряд с задержкой в меньше, чем 200 мс, функция будет вызвана лишь единожды спустя 200 мс после последнего (сотого) вызова.
Пример debounce:
let counter = 0;
const fn = () => {
  counter++;
};
const debouncedFn = debounce(fn, 200);
debouncedFn(); // первый вызов
setTimeout(debouncedFn, 100); // вызов через 100 мс после последнего вызова
// первый вызов был заблокирован, второй ожидает окончания таймера
setTimeout(debouncedFn, 200); // вызов через 100 мс после последнего вызова
// второй вызов был заблокирован, третий ожидает окончания таймера
setTimeout(debouncedFn, 300); // ...
setTimeout(debouncedFn, 400); // после этого вызова не следует других вызовов
// только этот вызов сработает, т.к. после него прошло 200 мс и других вызовов не было
console.log(counter); // 1
*/
const debounce = (fn, debounceTime) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, debounceTime);
  };
};
let counter2 = 0;
const fn2 = () => {
  counter2++;
};
const debouncedFn = debounce(fn2, 200);
debouncedFn(); // первый вызов
setTimeout(debouncedFn, 100); // вызов через 100 мс после последнего вызова
// первый вызов был заблокирован, второй ожидает окончания таймера
setTimeout(debouncedFn, 200); // вызов через 100 мс после последнего вызова
// второй вызов был заблокирован, третий ожидает окончания таймера
setTimeout(debouncedFn, 300); // ...
setTimeout(debouncedFn, 400); // после этого вызова не следует других вызовов
// только этот вызов сработает, т.к. после него прошло 200 мс и других вызовов не было
setTimeout(() => console.log(counter2), 2000); // 1