/* 09: 02 - Что такое кроссбраузерность ?
Кроссбраузерность – это способность веб-ресурса отображаться одинаково хорошо во всех популярных 
браузерах без перебоев в функционировании и ошибок в верстке, с одинаково корректной читабельностью
контента. Это очень важный показатель как для поисковых систем, так и пользовательской аудитории
Расположение элементов.
1-Если сайт не адаптирован под конкретный браузер, его элементы могут съезжать за пределы экрана, 
накладываться друг на друга или не отображаться.
2-Текст.
Очень важный критерий, особенно для статейных ресурсов, которых сегодня становится все больше.
Текст не должен наслаиваться, съезжать или отображаться в виде нечитаемых символов.
3-Скорость загрузки.
Если сайт очень тяжелый, страницы грузятся медленно и зависают, то пользователь очень быстро 
покинет такой ресурс.
4-Адекватная работа всех кнопок, сайдбаров и других функционально активных элементов.
Если при нажатии на определенную кнопку команда не выполняется либо реализуется некорректно, то 
это означает, что у этого сайта могут быть проблемы с кроссбраузерностью.
5-Адаптивность под все устройства.
Ресурс одинаково хорошо должен отображаться и работать на всех гаджетах– компьютерах, планшетах,
смартфонах.В крайнем случае должны существовать специальные мобильные версии сайта.
-CrossBrowserTesting - с помощью специальных платных и бесплатных сервисов.
-caniuse.com.
-Bootstrap
-Вендорные префиксы - -moz для Mozilla Firefox; - webkit - border - radius для Safari
*/

/*09 : 55 - Что такое JSdoc ?   
JSDoc— генератор документации в HTML - формате из комментариев исходного кода на JavaScript.
Синтаксис JSDoc похож на синтаксис Javadoc, который используется для документирования Java кода,
но предназначен для работы с языком JavaScript, который является более динамичным, и поэтому
JSDoc не совместим с Javadoc.
Аля недо Typescript, тоесть описывает что делает функция и что принемает, возвращает!   
*/ 
/** 
тут пишем описание!
*/

/* 11 : 55 - Как определить была ли вызвана функция с помощью new ?
	Свойство new.target позволяет определить была ли функция или конструктор вызваны с помощью оператора
new.В конструкторах и функциях инстанциированных с помощью оператора new, new.target возвращает 
ссылку на конструктор или функцию.При обычном вызове функции new.target имеет значение undefined.
	При обычном вызове функции(в противоположность вызову в качестве конструктора), new.target
имеет значение undefined.Это позволяет определить была ли вызвана функция как конструктор через new или нет.*/
function Foo() {
	if (!new.target) throw "Foo() must be called with new";
	console.log("Foo instantiated with new");
}
// new Foo(); // выведет "Foo instantiated with new"
// Foo(); // ошибка "Foo() must be called with new"
/*new.target в конструкторе
В конструкторе класса, new.target ссылается на конструктор, который был непосредственно вызван new.
Это верно и для случая, когда new.target находится в конструкторе родительского класса, а тот в 
свою очередь вызывается из конструктора дочернего класса.*/
class A {
	constructor() {
		console.log(new.target.name);
	}
}
class B extends A {
	constructor() {
		super();
	}
}
// var a = new A(); // вернёт "A"
// var b = new B(); // вернёт "B"

/* 14 : 33 - Какие отличия SVG от canvas, когда что использовать ?
	Нужно нарисовать небольшую иконку ? Это, безусловно, территория SVG.Дело в том, что описание SVG -
изображения хранится в DOM, в результате SVG отлично подходит для того, чтобы нарисовать что - то
вроде значка на кнопке.Не стоит и говорить о том, что на SVG - изображения можно влиять средствами 
CSS, и, с помощью JavaScript, подключать к их элементам обработчики событий.
	Нужно создать интерактивную браузерную игру ? Тут, определённо, нужна технология canvas.Браузерная 
игра, наверняка, будет содержать множество движущихся элементов и сложных анимаций.Элементы игрового
мира будут взаимодействовать друг с другом, что означает определённые требования к производительности.
Для решения таких задач отлично подходит canvas.
SVG - хранит все изменения, что при анимации затратно, а canvas в конце все удаляет!*/

// 21 : 23 - Вопрос про то, почему не сразу отобразятся изменения в коде ?
//JS сначало выполнит весь код а лишь потом будет рендер!
// task => microtsk => render => microtsk
// const container = document.querySelector('.container');
// const heading = document.querySelector('.heading');
// heading.textContent = 'New context';
// container.style.width = '800px';

let array = [];
function getArray() {
	for (let i = 100000; i >= 0; i--) {
		// array.unshift(i);
		array.push(i) // так будет
	}
}
// getArray();
// console.log(array)

/* 35 : 38 - Большое задание(https: //jsfiddle.net/mockinterview/yu...)
Задание:
Сверстать лэйаут так, чтоб класс wrapper был квадратом, содержащим:
|-------|-------|
|  red  |       |
|       |       |
|-------| blue  |
| green |       |
|       |       |
|-------|-------|
Дан код программиста, который уже начал выполнять работу, вам нужно ее
закончить. Ограничений нет, нужно просто выполнить задачу: 
Реализовать класс Panel, в который передается элемент. Элементами 
будут служить цветные квадраты и прямоугольники в классе wrapper. 
При клике на элемент, необходимо вывести количество кликов по данному 
элементу в класс counters. При достижении максимального числа кликов 
по элементу, которое прописано в data-clicks каждого элемента, 
необходимо отменить событие отслеживающее клики по элементу.
*/
const arr = [];
class Panel {
	constructor(element) {
		this.element = element;
		this.name = element.className;
		this.clicks = 0;
		this.dataClicks = +element.getAttribute('data-clicks');
	}
}
function main() {
  var elements = document.querySelector(".wrapper");
	const handler = (e) => {
		const elem = arr.find(el => el.name === e.target.className);
		const counter = document.querySelector(`.${elem.name}-counter`);
		counter.textContent = ++elem.clicks;
		if (elem.clicks === elem.dataClicks) {
			elem.element.removeEventListener('click', handler);
		}
	}
	for (const element of elements.children) {
		arr.push(new Panel(element));
		element.addEventListener('click', handler);
	}
}
// main();
// console.log(arr)

class Panel2 {
	constructor(element) {
		this.element = element;
		this.className = element.className;
		this.clicks = 0;
		this.dataClicks = +element.getAttribute('data-clicks');
		this.handler = this.callback.bind(this);
	}
	init() {
		this.element.addEventListener('click', this.handler);
	}
	callback() {
		const counter = document.querySelector(`.${this.className}-counter`);
		counter.textContent = ++this.clicks;
		if (this.clicks === this.dataClicks) {
			this.element.removeEventListener('click', this.handler);
		}
	}
}
function main2() {
	var elements = document.querySelector(".wrapper");
	[...elements.children].forEach(el => {
		var panel = new Panel2(el);
		panel.init();
	});
}
main2();

// 01: 50: 56 - Разбираемся с первой задачкой и event loop.

/*От меня. В чем разница императивного и декларативного подхода в javascript? Это процедурный и ООП стили?
	Декларативное программирование - это когда в коде описано что должно получиться, а императивное - когда
написано как это сделать.Т.е.в первом случае мы совершенно не интересуемся, каким именно образом машина 
сделает работу, какие инструкции в каком порядке выполнятся и так далее, мы просто объясняем ей, что 
хотим увидеть в результате.
	Примеры декларативных языков - html, css, sql, конфиг nginx.Ещё тут стоит 
упомянуть функциональные языки(lisp, haskell), программы на них тоже, как правило, являются 
описанием(декларацией) того "что должно получиться".Ну, короче говоря, мы говорим компьютеру: 
вот смотри, мне надо чтобы было так, а как ты это сделаешь, мне не интересно.Аналогия такая: у 
меня есть чертёж бани, я даю его бригаде строителей и уезжаю.Как именно они там будут таскать 
брёвна, пилить доски и прочее - я не в курсе.
	Программируя императивно, мы описываем конкретные шаги, действия и точный порядок, в котором их нужно
исполнять.Напрямую руководим процессом, непосредственно отдаём приказания.Примеров масса, большинство 
популярных языков императивны, в том числе и javascript.Ты пишешь: вот, сделай - ка переменную myVar, 
потом запиши туда число 5, повторяй это до тех пор, пока что - то не случится...и так далее.Возвращаясь
к примеру с баней, ты теперь - начальник бригады, именно говоришь какое бревно куда класть.*/