const btn = document.querySelector(".btn-get-posts");
const btnAddPost = document.querySelector(".btn-add-post");
const container = document.querySelector(".container");

function getPosts(cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.response);
    cb(response);
  });
  xhr.addEventListener("error", () => {
    console.log("error");
  });
  xhr.send();
}

function cardTemplate(post) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.body}</p>
        </div>
      `;
  return card;
}

function renderPosts(res) {
  const fragment = document.createDocumentFragment();
  res.forEach((post) => {
    const card = cardTemplate(post);
    fragment.appendChild(card);
  });
  container.append(fragment);
}

btn.addEventListener("click", (e) => {
  getPosts(renderPosts);
});

function createPost(body, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://jsonplaceholder.typicode.com/posts");
  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8',)
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.response);
    cb(response);
  });
  xhr.addEventListener("error", () => {
    console.log("error");
  });
  xhr.send(JSON.stringify(body));
}

btnAddPost.addEventListener("click", (e) => {
  const body = {
    title: "foo",
    body: "bar",
    userId: 1,
  };
  createPost(body, (response) => {
    const card = cardTemplate(response);
    console.log(card);
    container.prepend(card);
  });
});


// function renderPosts(res) {
//   const fragment = document.createDocumentFragment();
//   res.forEach((post) => {
//     const card = document.createElement("div");
//     card.classList.add("card");
//     const cardBody = document.createElement("div");
//     cardBody.classList.add("card-body");
//     const title = document.createElement("h5");
//     title.classList.add("card-title");
//     title.textContent = post.title;
//     const article = document.createElement("p");
//     article.classList.add("card-text");
//     article.textContent = post.body;
//     cardBody.appendChild(title);
//     cardBody.appendChild(article);
//     card.appendChild(cardBody);
//     fragment.appendChild(card);
//   });
//   container.appendChild(fragment);
// }
// btn.addEventListener('click', (e) => {
//   getPosts(renderPosts);
// })

