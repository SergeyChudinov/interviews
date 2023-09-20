/*
Как было сказано в главе, здесь присутствует "скрытый try..catch" вокруг кода функции. Поэтому обрабатываются все синхронные ошибки.
В данном примере ошибка генерируется не по ходу выполнения кода, а позже. Поэтому промис не может обработать её.
*/
new Promise(function (resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(console.log);

setTimeout(() => {
  console.log(1);
}, 2000);
