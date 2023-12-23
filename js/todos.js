const table = document.querySelector(".todos__table");
const tableBody = table.querySelector(".table__body");
const loader = document.createElement("div");
loader.classList.add("loading-spinner");
table.append(loader);
const todos = fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => response.json())
  .then((data) => {
    const localStorageData = JSON.parse(localStorage.getItem("todos")) || {};
    Object.keys(localStorageData).forEach((key) => {
      data.push(localStorageData[key]);
    });
    if (table) {
      table.removeChild(loader);
      data
        .filter((todo) => todo.completed)
        .forEach((todo) => {
          if (tableBody) {
            tableBody.innerHTML += `
              <tr class="table__row">
                <td class="table__cell table__data">${todo.userId}</td>
                <td class="table__cell table__data">${todo.title}</td>
                <td class="table__cell table__data">${todo.completed}</td>
              </tr>
          `;
          }
        });
    }
  })
  .catch((e) => {
    console.error(e);
    const main = document.querySelector(".main");
    main.innerHTML = `<div class="error">Error! ${e}</div>`;
  });

const form = document.forms.addTodo;
form.addEventListener("submit", onSubmit);
function onSubmit(event) {
  event.preventDefault();
  const userIdInput = form.elements.userId;
  const titleInput = form.elements.title;
  const completenessInput = form.elements.completeness;
  if (tableBody) {
    const todo = {
      id: Math.floor(Math.random() * 100 + 10),
      userId: userIdInput.value,
      title: titleInput.value,
      isCompleted: completenessInput.checked,
    };
    tableBody.innerHTML += `
      <tr class="table__row">
        <td class="table__cell table__data">${todo.userId}</td>
        <td class="table__cell table__data">${todo.title}</td>
        <td class="table__cell table__data">${todo.isCompleted}</td>
      </tr>
    `;
    const localStorageData = JSON.parse(localStorage.getItem("todos")) || {};
    localStorageData[todo.id] = todo;
    localStorage.setItem("todos", JSON.stringify(localStorageData));
  }
}
