// Применение делегирования: действия в разметке
class Menu {
  constructor(elem) {
    console.log(this)
    elem.onclick = this.onClick.bind(this); // (*)
  }
  save() {
    alert('сохраняю');
  }
  load() {
    alert('загружаю');
  }
  search() {
    alert('ищу');
  }
  onClick(event) {
    let action = event.target.dataset.action;
    if (action) {
      this[action]();
    }
  }
}
const menu = document.querySelector('#menu')
new Menu(menu);

// Приём проектирования «поведение»
document.addEventListener("click", function (event) {
  if (event.target.dataset.counter != undefined) {
    // если есть атрибут...
    event.target.value++;
  }
});

// Поведение: «Переключатель» (Toggler)
document.addEventListener("click", function (event) {
  let id = event.target.dataset.toggleId;
  if (!id) return;
  let elem = document.getElementById(id);
  elem.hidden = !elem.hidden;
});
/*
Ещё раз подчеркнём, что мы сделали. Теперь для того, чтобы добавить скрытие-раскрытие любому элементу, даже не надо знать JavaScript, можно просто написать атрибут data-toggle-id.
Это бывает очень удобно – не нужно писать JavaScript-код для каждого элемента, который должен так себя вести. Просто используем поведение. Обработчики на уровне документа сделают это возможным для элемента в любом месте страницы.
*/