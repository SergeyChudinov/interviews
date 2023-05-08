// 03:48 - Как работает цикл for, порядок действий
// for (4; 3; 2) {
//   1
// }
// 4-3-1-2-3-1-2-3

// 08:53 - Как можно значение превратить в число? Как работают разные способы?
console.log(parseInt('5asd')); // 5
console.log(parseInt('asd5')); // NaN
console.log(parseInt('0x1'));  // 0 -не верно => 1
console.log(parseInt('0'));    // 0
console.log(parseInt(' 0xF', 16)); //15

console.log(Number(5n)); // 5
// console.log(+5n)         // ошибка 
// 23:50 - Задача 1 (https://jsfiddle.net/mockinterview/gq...)
/*
Прислал Dariel. Задача с реального собеседования.
В функцию sumNumbers передается массив, содержащий все подряд (любые
типы данных). Необходимо реализовать функцию так, чтобы она вернула
среднее арифметическое всех элементов, которые могут быть нативно
представлены в javascript в виде числа, т.е. мы считаем значение, если
при прверащении в число, значение не является NaN.
*/
function sumNumbers(arr) {
  let average = 0;
  arr.forEach(num => {
    +!!num && average++;
  });
  return average / arr.length;
}
console.log(sumNumbers([
  1,
  "9",
  NaN,
  9.5,
  true,
  "WebInterview",
  Symbol("5"),
  null,
  5n, // В jsfiddle bigint нормально не работает
  undefined,
  {a: 5},
  () => 100,
])); // 4.25
// 01:05:52 - Задача 2 (https://jsfiddle.net/mockinterview/we...)
/*
Прислал Владислав Аткишкин
На вход нам приходит url товара из магазина.
Все URL-адреса имеют одинаковый формат, сначала это домен exampleshop.com,
затем у нас есть название продукта, разделенное тире (-), после чего есть буква
p, указывающая начало идентификатора продукта, после которого следует
фактический идентификатор (без ограничения по длине) и, наконец, 8-значное
представление даты добавления товара, за которым следует .html.
Необходимо получить идентификатор продукта (см. примеры).
*/
function getProductId(url) {
  return (url.match(/\d+\-\d{8}\.html/ig)[0]).replace(/\-\d{8}\.html/, '');
}

console.log(getProductId('exampleshop.com/fancy-coffee-cup-p-90764-12052019.html')); // 90764
console.log(getProductId('exampleshop.com/c-3-p-0-p-654-11112011.html')); // 654
// 01:15:12 - Подписывайтесь на канал в телеграмм (https://t.me/BudniFronta)
// 01:16:09 - Вопросы из чата