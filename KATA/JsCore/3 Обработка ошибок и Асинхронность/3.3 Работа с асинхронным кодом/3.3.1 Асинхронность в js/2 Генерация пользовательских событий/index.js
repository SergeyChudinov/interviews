/*
Пример всплытия
Мы можем создать всплывающее событие с именем "hello" и поймать его на document.
Всё, что нужно сделать – это установить флаг bubbles в true:
*/
// ловим на document...
document.addEventListener("hello", function(event) { // (1)
	console.log("Привет от " + event.target.tagName); // Привет от H1
});
// ...запуск события на элементе!
let event = new Event("hello", {bubbles: true}); // (2)
let elem = document.querySelector("#elem");
elem.dispatchEvent(event);
// обработчик на document сработает и выведет сообщение.

/*
Пользовательские события
*/
// дополнительная информация приходит в обработчик вместе с событием
let elem2 = document.querySelector("#elem2");
elem2.addEventListener("hello", function(event) {
	console.log(event.detail.name);
});
elem2.dispatchEvent(new CustomEvent("hello", {
	detail: { name: "Вася" }
}));

//event.preventDefault()
// hide() будет вызван при щелчке на кнопке
let rabbit = document.querySelector("#rabbit");
function hide() {
	let event = new CustomEvent("hide", {
		cancelable: true // без этого флага preventDefault не сработает
	});
	if (!rabbit.dispatchEvent(event)) {
		alert('Действие отменено обработчиком');
	} else {
		rabbit.hidden = true;
	}
}
rabbit.addEventListener('hide', function(event) {
	if (confirm("Вызвать preventDefault?")) {
		event.preventDefault();
	}
});

// Вложенные события обрабатываются синхронно
let menu = document.querySelector("#menu");
menu.onclick = function () {
	console.log(1);
	// alert("вложенное событие")
	menu.dispatchEvent(
		new CustomEvent("menu-open", {
			bubbles: true,
		})
	);
	console.log(2);
};
document.addEventListener("menu-open", () => console.log("вложенное событие"));

/*
Если нам это не подходит, то мы можем либо поместить dispatchEvent (или любой другой код, инициирующий события) в конец обработчика onclick, либо, если это неудобно, можно обернуть генерацию события в setTimeout с нулевой задержкой:
*/
let menu2 = document.querySelector("#menu2");
menu2.onclick = function () {
	console.log(1);
	// alert(2)
	setTimeout(() =>
		menu2.dispatchEvent(
			new CustomEvent("menu-open2", {
				bubbles: true,
			})
		)
	);
	console.log(2);
};
document.addEventListener("menu-open2", () => console.log("вложенное событие"));