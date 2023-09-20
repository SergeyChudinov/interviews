console.log(1);
Promise.resolve().then(() => console.log(2));
setTimeout(() => {
  console.log(3);
  Promise.resolve().then(() => console.log(4));
});
Promise.resolve().then(() => {
  Promise.resolve().then(() => {
    console.log(5);
  });
  console.log(6);
});
console.log(7); // 1,7,2,6,5,3,4

console.log(1);
setTimeout(() => console.log(2));
Promise.resolve().then(() => console.log(3));
Promise.resolve().then(() => setTimeout(() => console.log(4)));
Promise.resolve().then(() => console.log(5));
setTimeout(() => console.log(6));
console.log(7); // 1,7,3,5,2,6,4

setTimeout(function timeout() {
  console.log("Таймаут");
}, 0);
let p = new Promise(function (resolve, reject) {
  console.log("Создание промиса");
  resolve();
});
p.then(function () {
  console.log("Обработка промиса");
});
console.log("Конец скрипта");

let i = 0;
let start = Date.now();
function count() {
  // делаем часть тяжёлой работы (*)
  do {
    i++;
  } while (i % 1e6 != 0);
  if (i == 1e8) {
    console.log("Done count in " + (Date.now() - start) + "ms");
  } else {
    setTimeout(count); // планируем новый вызов (**)
  }
}
// count();

let i2 = 0;
let start2 = Date.now();
function count2() {
  // перенесём планирование очередного вызова в начало
  if (i2 < 1e6 - 1e3) {
    setTimeout(count2); // запланировать новый вызов
  }
  do {
    i2++;
  } while (i2 % 1e5 != 0);
  if (i2 == 1e6) {
    console.log("Done count2 in " + (Date.now() - start2) + "ms");
  }
}
// count2();

// Пример 2: индикация прогресса
const progress = document.querySelector("#progress");
function count3() {
	for (let i = 0; i < 1e3; i++) {
		progress.innerHTML = i;
	}
}
// count3();

const progress4 = document.querySelector("#progress4");
let i4 = 0;
function count4() {
	// сделать часть крупной задачи (*)
	do {
		i4++;
		progress4.innerHTML = i4;
	} while (i4 % 1e4 != 0);
	if (i4 < 1e5) {
		setTimeout(count4);
	}
}
// count4();

/*
Если мы хотим запустить функцию асинхронно (после текущего кода), но до отображения изменений и до новых событий, то можем запланировать это через queueMicrotask.
*/
const progress5 = document.querySelector("#progress5");
let i5 = 0;
function count5() {
	// делаем часть крупной задачи (*)
	do {
		i5++;
		progress5.innerHTML = i5;
	} while (i5 % 1e3 != 0);
	if (i5 < 1e5) {
		queueMicrotask(count5);
	}
}
count5();