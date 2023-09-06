/*
	События мыши
*click	onClick	* Практически все HTML-элементы	Одинарный щелчок (нажата и отпущена кнопка мыши)
*dblclick	onDblClick	* Практически все HTML-элементы	Двойной щелчок
*contextmenu	onContextmenu	* Практически все HTML-элементы	Щелчок правой кнопкой мыши на элементе
*selectstart	onselectstart	* Практически все HTML-элементы	Начало выделения контента. Изменение выделения скриптом.
*mousewheel	onMousewheel	* Практически все HTML-элементы	Нажата кнопка мыши в пределах текущего элемента
*mousemove	onMouseMove	* Практически все HTML-элементы	Перемещение курсора мыши в пределах текущего элемента
*mouseout	onMouseOut	* Практически все HTML-элементы	Курсор мыши выведен за пределы текущего элемента
*mouseover	onMouseOver	* Практически все HTML-элементы	Курсор мыши наведен на текущий элемент
*mouseup	onMouseUp	* Практически все HTML-элементы	Отпущена кнопка мыши в пределах текущего элемента
*mousedown	onMouseDown	* Практически все HTML-элементы	Нажата кнопка мыши в пределах текущего элемента
	События клавиатуры
*keydown	onKeyDown	* Практически все HTML-элементы	Нажата клавиша на клавиатуре
*keypress	onKeyPress	* Практически все HTML-элементы	Нажата и отпущена клавиша на клавиатуре
*keyup	onKeyUp	* Практически все HTML-элементы	Отпущена клавиша на клавиатуре
	События элементов форм
*focus	onFocus	A, AREA, BUTTON, INPUT, LABEL, SELECT, TEXTAREA	Получение элементом фокуса (щелчок мышью на элементе или очередное нажатие клавиши табуляции)
*blur	onBlur	A, AREA, BUTTON, INPUT, LABEL, SELECT, TEXTAREA	Потеря текущим элементом фокуса, т.е. переход к другому элементу. Возникает при щелчке мышью вне элемента либо нажатии клавиши табуляции
*change	onChange	INPUT, SELECT, TEXTAREA	Изменение значений элементов формы. Возникает после потерей элементом фокуса, т.е. после события blur
*reset	onReset	FORM	Сброс данных формы ( щелчок по кнопке
<input type="reset"> )
*select	onSelect	INPUT, TEXTAREA	Выделение текста в текущем элементе
*submit	onSubmit	FORM	Отправка данных формы ( щелчок по кнопке
<input type="submit"> )
*abort	onAbort	IMG, input type="img"	Прерывание загрузки изображения
	События окна браузера
*load	onLoad	BODY, FRAMESET	Закончена загрузка документа
*unload	onUnload	BODY, FRAMESET	Попытка закрытия окна браузера и выгрузки документа
*error	onError	IMG, WINDOW	Возникновение ошибки выполнения сценария
*move	onMove	WINDOW	Перемещение окна
*resize	onResize	WINDOW	Изменение размеров окна
*scroll	onScroll	* Практически все HTML-элементы	Прокрутка окна или области
*/