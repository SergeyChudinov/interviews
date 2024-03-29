/*
Перепишите, используя async/await
Перепишите один из примеров раздела Цепочка промисов, используя async/await вместо .then/catch:
*/
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
}
// loadJson("no-such-user.json").catch(console.log); // Error: 404

async function loadJson2(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new Error(response.status);
  }
}
// loadJson2("no-such-user.json").catch(console.log); 

/*
Перепишите, используя async/await
Ниже пример из раздела Цепочка промисов, перепишите его, используя async/await вместо .then/catch.
В функции demoGithubUser замените рекурсию на цикл: используя async/await, сделать это будет просто.
*/
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new HttpError(response);
    }
  });
}
// Запрашивать логин, пока github не вернёт существующего пользователя.
function demoGithubUser() {
  let name = prompt("Введите логин?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then((user) => {
      console.log(`Полное имя: ${user.name}.`);
      return user;
    })
    .catch((err) => {
      if (err instanceof HttpError && err.response.status == 404) {
        console.log("Такого пользователя не существует, пожалуйста, повторите ввод.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}
// demoGithubUser();

async function loadJson2(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

async function demoGithubUser2() { 
  let user
  while (!user) {
    let name = prompt("Введите логин?", "iliakan");

    try {
      user = await loadJson2(`https://api.github.com/users/${name}`);
      console.log(`Полное имя: ${user.name}.`);
      return user;
    } catch (err) {
      if (err instanceof HttpError && err.response.status == 404) {
        console.log(
          "Такого пользователя не существует, пожалуйста, повторите ввод."
        );
      } else {
        throw err;
      }
    }
  }
}
// demoGithubUser2().then(obj => console.log(obj))


/*
Вызовите async–функцию из "обычной"
Есть «обычная» функция. Как можно внутри неё получить результат выполнения async–функции?
*/
async function wait() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return 10;
}
function f() {
  // ...что здесь написать?
  // чтобы вызвать wait() и дождаться результата "10" от async–функции
  // не забывайте, здесь нельзя использовать "await"
  wait().then(result => console.log(result))
}
f();
