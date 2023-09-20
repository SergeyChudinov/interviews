fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => {
    // console.log(response.json())
    return response.json();
  })
  .then(posts => console.log(posts))
  .catch(err => console.log(err));
// fetch => promise
// response => Response {} с методами + .json()
// response.json() => promise

function getPost(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => response.json())
      .then(post => resolve(post))
      .catch(err => reject(err));
  })
}
getPost(1)
  .then(post => console.log(post));

function getPost2(id) {
  const [userType, userId] = id.split('-')
  // если тут будет код с ошибкой , то она не отловиться!
  return fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`).then(
    (response) => response.json()
  );
}
getPost2('user-2') // 2 ошибка не отловиться!
  .then((post) => console.log(post))
  .catch(err => console.log(err));

function getPost3(id) { // Выход
  return Promise.resolve().then(() => {
    const [userType, userId] = id.split("-");
    return fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`).then(
      (response) => response.json()
    );
  })
}
getPost3("user-3")
  .then((post) => console.log(post))
  .catch((err) => console.log(err));

const postData = async (url, data) => {
  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: data,
  });
  // return await res.text();
  return await res.json();
};

// Например, получим JSON-объект с последними коммитами из репозитория на GitHub:
async function fnFetch() {
  let url =
    "https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits";
  let response = await fetch(url);
  let commits = await response.json(); // читаем ответ в формате JSON
  console.log(commits[0].author.login);
}
fnFetch();
// То же самое без await, с использованием промисов:
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => console.log(commits[0].author.login));
// Для получения ответа в виде текста используем await response.text() вместо .json():
async function fnFetch2() {
  let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');
  let text = await response.text(); // прочитать тело ответа как текст
  console.log(text.slice(0, 80) + "...");
}
fnFetch2();
// В качестве примера работы с бинарными данными, давайте запросим и выведем на экран логотип спецификации «fetch» (см. главу Blob, чтобы узнать про операции с Blob):
async function fnFetch3() {
  let response = await fetch("/article/fetch/logo-fetch.svg");
  let blob = await response.blob(); // скачиваем как Blob-объект
  // создаём <img>
  let img = document.createElement("img");
  img.style = "position:fixed;top:10px;left:10px;width:100px";
  document.body.append(img);
  // выводим на экран
  img.src = URL.createObjectURL(blob);
  console.log(img.src);
  setTimeout(() => {
    // прячем через три секунды
    img.remove();
    URL.revokeObjectURL(img.src);
  }, 3000);
}
fnFetch3();

// Отправка изображения
canvasElem.onmousemove = function (e) {
  let ctx = canvasElem.getContext("2d");
  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
};
async function submit() {
  let blob = await new Promise((resolve) =>
    canvasElem.toBlob(resolve, "image/png")
  );
  let response = await fetch("/article/fetch/post/image", {
    method: "POST",
    body: blob,
  });
  // сервер ответит подтверждением и размером изображения
  let result = await response.json();
  console.log(result.message);
}
/*
Заметим, что здесь нам не нужно вручную устанавливать заголовок Content-Type, потому что объект Blob имеет встроенный тип (image/png, заданный в toBlob). При отправке объектов Blob он автоматически становится значением Content-Type.
*/

//Функция submit() может быть переписана без async/await, например, так:
function submit2() {
  canvasElem.toBlob(function (blob) {
    fetch("/article/fetch/post/image", {
      method: "POST",
      body: blob,
    })
      .then((response) => response.json())
      .then((result) => console.log(JSON.stringify(result, null, 2)));
  }, "image/png");
}

/*
Получите данные о пользователях GitHub
Создайте асинхронную функцию getUsers(names), которая получает на вход массив логинов пользователей GitHub, запрашивает у GitHub информацию о них и возвращает массив объектов-пользователей.
Информация о пользователе GitHub с логином USERNAME доступна по ссылке: https://api.github.com/users/USERNAME.
В песочнице есть тестовый пример.
Важные детали:
На каждого пользователя должен приходиться один запрос fetch.
Запросы не должны ожидать завершения друг друга. Надо, чтобы данные приходили как можно быстрее.
Если какой-то запрос завершается ошибкой или оказалось, что данных о запрашиваемом пользователе нет, то функция должна возвращать null в массиве результатов.
*/
/*
Решение
Чтобы получить сведения о пользователе, нам нужно вызвать fetch('https://api.github.com/users/USERNAME').
Если ответ приходит cо статусом 200, то вызываем метод .json(), чтобы прочитать JS-объект.
А если запрос завершается ошибкой или код статуса в ответе отличен от 200, то мы просто возвращаем null в массиве результатов.
*/
async function getUsers(names) {
  let jobs = [];
  for (let name of names) {
    let job = fetch(`https://api.github.com/users/${name}`).then(
      (successResponse) => {
        if (successResponse.status != 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },
      (failResponse) => {
        return null;
      }
    );
    jobs.push(job);
  }
  let results = await Promise.all(jobs);
  return results;
}
/*
Пожалуйста, обратите внимание: вызов .then прикреплён к fetch, чтобы, когда ответ получен, сразу начинать считывание данных с помощью .json(), не дожидаясь завершения других запросов.
Если бы мы использовали await Promise.all(names.map(name => fetch(...))) и вызывали бы .json() на результатах запросов, то пришлось бы ждать, пока завершатся все из них. Вызывая .json() сразу после каждого fetch, мы добились того, что считывание присланных по каждому запросу данных происходит независимо от других запросов.
Это пример того, как относительно низкоуровневое Promise API может быть полезным, даже если мы в основном используем async/await в коде.
*/
let users = getUsers([
  "iliakan",
  "remy",
  "no.such.users",
  "SergeyChudinov",
]).then((data) => console.log(data));

