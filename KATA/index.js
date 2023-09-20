// // Функция для получения данных о репозиториях через API GitHub
// async function getRepositories(query) {
//   const response = await fetch(
//     `https://api.github.com/search/repositories?q=${query}`
//   );
//   const data = await response.json();
//   return data.items;
// }

// // Функция для создания элемента списка репозиториев
// function createRepositoryElement(repository) {
//   const repositoryElement = document.createElement("li");
//   repositoryElement.textContent = `${repository.name} - ${repository.owner.login} - ${repository.stargazers_count} stars`;
//   return repositoryElement;
// }

// // Функция для обновления списка автодополнений
// async function updateAutocompleteList(inputValue) {
//   const autocompleteList = document.getElementById("autocomplete-list");
//   autocompleteList.innerHTML = "";

//   if (inputValue === "") {
//     return;
//   }

//   const repositories = await getRepositories(inputValue);
//   repositories.slice(0, 5).forEach((repository) => {
//     const repositoryElement = createRepositoryElement(repository);
//     repositoryElement.addEventListener("click", () => {
//       addRepository(repository);
//       input.value = "";
//     });
//     autocompleteList.appendChild(repositoryElement);
//   });
// }

// // Функция для добавления репозитория в список
// function addRepository(repository) {
//   const repositoryList = document.getElementById("repository-list");
//   const repositoryElement = createRepositoryElement(repository);
//   const deleteButton = document.createElement("button");
//   deleteButton.textContent = "Delete";
//   deleteButton.addEventListener("click", () => {
//     repositoryList.removeChild(repositoryElement);
//   });
//   repositoryElement.appendChild(deleteButton);
//   repositoryList.appendChild(repositoryElement);
// }

// // Функция debounce для задержки отправки запросов на сервер
// function debounce(func, delay) {
//   let timeoutId;
//   return function (...args) {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(() => {
//       func.apply(null, args);
//     }, delay);
//   };
// }

// // Получение элементов DOM
// const input = document.getElementById("input");

// // Обработчик события ввода для обновления списка автодополнений
// const updateAutocompleteListDebounced = debounce(updateAutocompleteList, 300);
// input.addEventListener("input", () => {
//   updateAutocompleteListDebounced(input.value);
// });

// Получение ссылок на элементы DOM
const input = document.querySelector('#input');
const autocompleteList = document.querySelector('#autocomplete-list');
const repositoryList = document.querySelector('#repository-list');
// Функция для обработки изменения значения в поле ввода
function handleInputChange() {
  const searchQuery = input.value;
  // Очистка списка автодополнений
  autocompleteList.innerHTML = '';
  // Проверка, что поле ввода не пустое
  if (searchQuery.trim() !== '') {
    // Запрос к API GitHub для получения репозиториев
    fetch(`https://api.github.com/search/repositories?q=${searchQuery}`)
      .then(response => response.json())
      .then(data => {
        const repositories = data.items.slice(0, 5); // Получение первых 5 репозиториев
        // Создание элементов списка автодополнений
        repositories.forEach(repository => {
          const listItem = document.createElement('li');
          listItem.textContent = repository.full_name;
          // Обработчик клика на элемент списка автодополнений
          listItem.addEventListener('click', () => {
            // Добавление репозитория в список
            addRepository(repository);
            // Очистка поля ввода
            input.value = '';
          });
          autocompleteList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}
// Функция для добавления репозитория в список
function addRepository(repository) {
  const listItem = document.createElement('li');
  const repositoryName = document.createElement('span');
  const repositoryOwner = document.createElement('span');
  const starCount = document.createElement('span');
  const deleteButton = document.createElement('button');
  repositoryName.textContent = repository.name;
  repositoryOwner.textContent = repository.owner.login;
  starCount.textContent = repository.stargazers_count;
  deleteButton.textContent = 'Удалить';
  // Обработчик клика на кнопку удаления
  deleteButton.addEventListener('click', () => {
    listItem.remove();
  });
  listItem.appendChild(repositoryName);
  listItem.appendChild(repositoryOwner);
  listItem.appendChild(starCount);
  listItem.appendChild(deleteButton);
  repositoryList.appendChild(listItem);
}
// Обработчик изменения значения в поле ввода с задержкой
let timeoutId;
function debounce(func, delay) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(func, delay);
}
input.addEventListener('input', () => {
  debounce(handleInputChange, 300);
});