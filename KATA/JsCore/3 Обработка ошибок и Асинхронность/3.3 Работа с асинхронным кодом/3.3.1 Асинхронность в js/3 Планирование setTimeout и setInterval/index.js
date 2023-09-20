// let timerId = setTimeout(() => alert("ничего не происходит"), 1000);
// console.log(timerId); // идентификатор таймера
// clearTimeout(timerId);
// console.log(timerId); // тот же идентификатор (не принимает значение null после отмены)

let start = Date.now();
let times = [];
setTimeout(function run() {
  times.push(Date.now() - start); // запоминаем задержку от предыдущего вызова

  if (start + 100 < Date.now()) console.log(times); // показываем задержку через 100 мс
  else setTimeout(run); // если нужно ещё запланировать
});
// пример вывода:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100

/*
Напишите функцию printNumbers(from, to), которая выводит число каждую секунду, начиная от from и заканчивая to.
*/
function printNumbers(from, to) {
  let current = from;
  let timerId = setInterval(function () {
    console.log(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}
// использование:
// printNumbers(5, 10);

function printNumbers2(from, to) {
  let current = from;
  setTimeout(function go() {
    console.log(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}
// использование:
// printNumbers2(5, 10);

/*
Заметим, что в обоих решениях есть начальная задержка перед первым выводом. Она составляет одну секунду (1000мс). Если мы хотим, чтобы функция запускалась сразу же, то надо добавить такой запуск вручную на отдельной строке, вот так:
*/
function printNumbers3(from, to) {
  let current = from;
  function go() {
    console.log(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }
  go();
  let timerId = setInterval(go, 1000);
}
printNumbers3(5, 10);