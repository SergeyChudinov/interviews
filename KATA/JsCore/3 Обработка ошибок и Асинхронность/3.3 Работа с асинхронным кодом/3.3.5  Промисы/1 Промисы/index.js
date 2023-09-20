/*
Анимация круга с помощью колбэка
В задаче Анимированный круг показывается анимированный растущий круг.
Теперь предположим, что нам нужен не просто круг, а чтобы в нём было ещё и сообщение. Сообщение должно появиться после завершения анимации (круг полностью вырос), в противном случае это будет выглядеть некрасиво.
В решении задачи функция showCircle(cx, cy, radius) рисует окружность, но не даёт возможности отследить, когда она будет готова.
В аргументы добавьте колбэк: showCircle(cx, cy, radius, callback) который будет вызываться по завершении анимации. Колбэк в качестве аргумента должен получить круг <div>.
Вот пример:
showCircle(150, 150, 100, div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
*/
function go() {
	showCircle(150, 150, 100, (div) => {
		div.classList.add("message-ball");
		div.append("Привет, мир!");
	});
}

function showCircle(cx, cy, radius, callback) {
	let div = document.createElement("div");
	div.style.width = 0;
	div.style.height = 0;
	div.style.left = cx + "px";
	div.style.top = cy + "px";
	div.className = "circle";
	document.body.append(div);

	setTimeout(() => {
		div.style.width = radius * 2 + "px";
		div.style.height = radius * 2 + "px";

		div.addEventListener("transitionend", function handler() {
			div.removeEventListener("transitionend", handler);
			callback(div);
		});
	}, 0);
}

/*
Анимация круга с помощью промиса
*/
function go2() {
	showCircle2(150, 150, 100).then((div2) => {
		div2.classList.add("message-ball");
		div2.append("Hello, world!");
	});
}

function showCircle2(cx, cy, radius) {
	let div2 = document.createElement("div");
	div2.style.width = 0;
	div2.style.height = 0;
	div2.style.left = cx + "px";
	div2.style.top = cy + "px";
	div2.className = "circle";
	document.body.append(div2);

	return new Promise((resolve) => {
		setTimeout(() => {
			div2.style.width = radius * 2 + "px";
			div2.style.height = radius * 2 + "px";

			div2.addEventListener("transitionend", function handler() {
				div2.removeEventListener("transitionend", handler);
				resolve(div2);
			});
		}, 0);
	});
}


let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});
// resolve запустит первую функцию, переданную в .then
promise.then(
  (result) => alert(result), // выведет "done!" через одну секунду
  (error) => alert(error) // не будет запущена
);

let promise2 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});
// reject запустит вторую функцию, переданную в .then
promise2.then(
  (result) => alert(result), // не будет запущена
  (error) => alert(error) // выведет "Error: Whoops!" спустя одну секунду
);

