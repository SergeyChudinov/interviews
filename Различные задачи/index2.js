// 1- Остановка сложного процесса моя версия
const button = document.querySelector('button');
function foo() {
	console.log(1)
	const timeout = setTimeout(foo, 0);
	button.addEventListener('click', () => {
		clearTimeout(timeout);
		console.log('clearTimeout')
	})
}
foo();