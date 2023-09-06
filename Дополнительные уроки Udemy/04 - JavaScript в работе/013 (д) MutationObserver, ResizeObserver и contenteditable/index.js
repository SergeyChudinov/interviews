/*
Атрибут contenteditable
Сообщает, что элемент доступен для редактирования пользователем
— можно удалять текст и вводить новый. Также работают стандартные
команды вроде отмены, вставки текста из буфера и др.
*/

/*
MutationObserver: наблюдатель за изменениями
MutationObserver – это встроенный объект, наблюдающий за DOM-элементом и запускающий колбэк в случае изменений.
https://learn.javascript.ru/mutation-observer
*/
const box = document.querySelector('.box');
let observer = new MutationObserver(mutationRecords => {
	console.log(mutationRecords);
});
observer.observe(box, {
	childList: true
})

observer.disconnect()// остановим наблюдение!

/*
ResizeObserver- отслеж измен размеров элементов!
*/