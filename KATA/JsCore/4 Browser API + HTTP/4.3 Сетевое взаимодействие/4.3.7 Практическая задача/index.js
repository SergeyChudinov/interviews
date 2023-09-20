/*
Практическая задача
Испробуем на практике взаимодействие с DOM и применим fetch для получения настоящих данных о репозиториях GitHub.
Описание функционала
Ссылка на эскизный макет приложения
Реализуйте приложение на чистом JavaScript без использования сторонних библиотек, которое будет работать с общедоступным API GitHub и представлять собой список репозиториев.
Итоговое решение должно состоять из двух элементов, расположенных на странице - поля ввода с автодополнением (автокомплита) и списка репозиториев:
Автокомплит должен запрашивать данные о репозиториях через API GitHub, каждый раз, когда пользователь обновляет значение поля ввода и выводить их в выпадающем меню прямо под собой. В выпадающем меню должно быть перечислено 5 названий первых репозиториев, полученных с помощью запроса поиска репозиториев по ключевым словам API GitHub с введенным пользователем в поле ввода поисковым запросом. При клике на любой из репозиториев соответствующий репозиторий должен быть представлен в списке добавленных репозиториев, расположенном ниже.
Список репозиториев отображает добавленные с помощью автокомплита репозитории. Для каждого добавленного в список репозитория должно быть отображено его название, его владелец и количество звезд на этом репозитории. Кроме того, возле каждого пункта списка добавленных репозиториев должна быть кнопка удаления, которая, соответственно, удаляет репозиторий из списка.
Чтобы обеспечить хороший опыт работы с приложением для пользователей, необходимо сделать следующие улучшения для автокомплита:
Если поля ввода пустое, то список автодополнений не отображается
При вводе символов в поле ввода запросы не должны отправляться сразу в целях избежания лишних запросов на сервер. Используйте знания, полученные при решении задачи debounce, для решения этой проблемы
Когда пользователь добавляет репозиторий путем клика на его название в списке автокомплита, поле ввода должно очищаться.
Результат должен быть представлен в виде ссылки на git репозиторий.
*/

const container = document.querySelector("#container");
const input = document.querySelector('input')
const autocompleteList = document.querySelector("#autocomplete-list");
const repositoryList = document.querySelector("#repository-list");
let autocompleteRepos = [];
let repositoryRepos = [];

repositoryList.addEventListener('click', (e) => {
  if (e.target.closest("span")) {
    const el = document.getElementById(
      `${e.target.closest("span").parentElement.id}`
    );
    el.remove();
  }
})

function repoListTemplate(repo) {
  repositoryRepos.push(repo.id);
  const list = document.createElement("li");
  list.innerHTML = `
    <ul class='repoList' id='${repo.id}'>
      <li>${repo.name}</li>
      <li>${repo.owner.login}</li>
      <li>${repo.stargazers_count}</li>
      <span><img src="circle-xmark-solid.svg" alt="img"></span>
    </ul>
  `;
  repositoryList.append(list);
  input.value = "";
  renderList([]);
}

autocompleteList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const repo = autocompleteRepos.find((el) => el.name === e.target.innerText);
    if (!repositoryRepos.includes(repo.id)) {
      repoListTemplate(repo);
    }
  }
})

function listTemplate({name}) {
  const list = `
    <li>${name}</li>
  `;
  return list;
}
function renderList(res) {
  let fragment = '';
  if (!res) {
    autocompleteList.innerHTML = "";
    return
  }
  for (let i = 0; i < 5; i++) {
    if (res[i]) {
      autocompleteRepos.push(res[i]);
      const card = listTemplate(res[i]);
      fragment += card;
    }
  }
  autocompleteList.innerHTML = fragment;
}
const debounce = (fn, debounceTime) => {
  let timeoutId;
  return function (value) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.call(this, value);
    }, debounceTime);
  };
};
function fn(value) {
  getUsers(value).then((data) => {
    renderList(data); 
  });
}
input.addEventListener("input", (e) => {
  const value = e.target.value;
  repos = []
  debouncedFn(value);
});
const debouncedFn = debounce(fn, 500);
async function getUsers(name) {
  let repos = fetch(`https://api.github.com/users/${name}/repos`).then(
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
  return repos;
}

