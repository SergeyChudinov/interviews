// Promise.all
// Promise.all([
//   new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
//   new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
//   new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
// ]).then(console.log); // когда все промисы выполнятся, результат будет 1,2,3
// // каждый промис даёт элемент массива

/*
Часто применяемый трюк – пропустить массив данных через map-функцию, которая для каждого элемента создаст задачу-промис, и затем обернуть получившийся массив в Promise.all.
*/
let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://api.github.com/users/jeresig",
];
// Преобразуем каждый URL в промис, возвращённый fetch
let requests = urls.map((url) => fetch(url));
// Promise.all будет ожидать выполнения всех промисов
Promise.all(requests).then((responses) =>
  responses.forEach((response) =>
    console.log(`${response.url}: ${response.status}`)
  )
);

/*
А вот пример побольше, с получением информации о пользователях GitHub по их логинам из массива (мы могли бы получать массив товаров по их идентификаторам, логика та же):
*/
let names = ["iliakan", "remy", "jeresig"];
let requests2 = names.map((name) =>
  fetch(`https://api.github.com/users/${name}`)
);
// Promise.all(requests2)
//   .then((responses) => {
//     // все промисы успешно завершены
//     for (let response of responses) {
//       console.log(`${response.url}: ${response.status}`); // покажет 200 для каждой ссылки
//     }

//     return responses;
//   })
//   // преобразовать массив ответов response в response.json(),
//   // чтобы прочитать содержимое каждого
//   .then((responses) => Promise.all(responses.map((r) => r.json())))
//   // все JSON-ответы обработаны, users - массив с результатами
//   .then((users) => users.forEach((user) => console.log(user.name)));

// Promise.allSettled
/*
Например, мы хотели бы загрузить информацию о множестве пользователей. Даже если в каком-то запросе ошибка, нас всё равно интересуют остальные.
*/
let urls2 = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://no-such-url",
];
Promise.allSettled(urls2.map((url) => fetch(url))).then((results) => {
  // (*)
  results.forEach((result, num) => {
    console.log(results)
    if (result.status == "fulfilled") {
      console.log(`${urls[num]}: ${result.value.status}`);
    }
    if (result.status == "rejected") {
      console.log(`${urls[num]}: ${result.reason}`);
    }
  });
});
/*
Полифил
Если браузер не поддерживает Promise.allSettled, для него легко сделать полифил:
*/
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
      status: 'fulfilled',
      value: value
    }), error => ({
      status: 'rejected',
      reason: error
    }))));
  };
}