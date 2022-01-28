import { todos, searchObject } from "./index";

const todoEl = document.querySelector("#todo");

// getsave todos.
const getSaveTodos = () => {
  const JSONTodo = localStorage.getItem("todo");
  try {
    return JSONTodo ? JSON.parse(JSONTodo) : [];
  } catch (e) {
    return [];
  }
};

//save todos
const saveTodos = (todos) => {
  localStorage.setItem("todo", JSON.stringify(todos));
};

//remove item (todo)
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((item) => item.id === id);

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
  }
};

//toggle checkbox
const toggleCheckBox = (id) => {
  const todoItem = todos.find((item) => item.id === id);

  if (todoItem) {
    todoItem.completed = !todoItem.completed;
  }
};

//genarate todos DOM
const generateTodos = (item) => {
  const wrapper = document.createElement("label");
  const containerEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const p = document.createElement("span");
  const removebutton = document.createElement("button");

  //Setup todo checkbox.
  checkbox.setAttribute("type", "checkbox");
  containerEl.appendChild(checkbox);
  //check checkbox
  checkbox.checked = item.completed; //( note ) here u attached between the completed value & the checkbox itself.

  //eventlistener to checkbox
  checkbox.addEventListener("click", () => {
    toggleCheckBox(item.id);
    saveTodos(todos);
    renderTodos(todos, searchObject);
  });

  //Setup todo text.
  p.textContent = item.title;
  containerEl.appendChild(p);
  wrapper.appendChild(containerEl);

  //Setup todo remove button.
  removebutton.textContent = "remove";
  removebutton.classList.add("button", "button--text");
  wrapper.appendChild(removebutton);

  //eventlistener to removebutton
  removebutton.addEventListener("click", () => {
    removeTodo(item.id);
    saveTodos(todos);
    renderTodos(todos, searchObject);
  });

  //setup container
  wrapper.classList.add("list-item");
  containerEl.classList.add("list-item__container");

  return wrapper;
};

//generate summary DOM
const generateSummary = (filterSearch) => {
  const find = filterSearch.filter((item) => !item.completed);
  const plural = find.length === 1 ? "" : "s";

  const addMessage = document.createElement("h2");
  addMessage.textContent = `You have ${find.length} todo${plural} left `;
  addMessage.classList.add("list-title");
  todoEl.appendChild(addMessage);

  if (filterSearch.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("empty-message");
    emptyMessage.textContent = "No to-dos to show";
    emptyMessage.classList.add("list-title");
    todoEl.appendChild(emptyMessage);
  }
};

// render todos
const renderTodos = (todos, { searchText, checkBox }) => {
  //here
  let filterSearch = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (checkBox) {
    filterSearch = filterSearch.filter((filterdTodo) => !filterdTodo.completed);
  }

  //clear div data
  todoEl.innerHTML = "";

  generateSummary(filterSearch);
  filterSearch.forEach((item) => {
    const wrapper = generateTodos(item);
    todoEl.appendChild(wrapper);
  });
};

export {
  removeTodo,
  renderTodos,
  generateSummary,
  generateTodos,
  saveTodos,
  getSaveTodos,
  toggleCheckBox,
};
