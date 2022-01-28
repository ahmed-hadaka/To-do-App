import { v4 as uuidv4 } from "uuid";
import { renderTodos, saveTodos, getSaveTodos } from "./todo-functions";

let todos = getSaveTodos();

// contributing array
const searchObject = {
  searchText: "",
  checkBox: false,
};

//initial call function
renderTodos(todos, searchObject);

// input search with filter
document.querySelector("#input-search").addEventListener("input", (e) => {
  searchObject.searchText = e.target.value;
  renderTodos(todos, searchObject);
});

//add todos form---------------------------------------------------

document.querySelector("#form").addEventListener("submit", (e) => {
  const text = e.target.elements.todoTitle.value.trim();
  e.preventDefault();
  if (text.length > 0) {
    todos.push({
      id: uuidv4(),
      title: text,
      completed: false,
    });
    saveTodos(todos);
    e.target.elements.todoTitle.value = "";
    renderTodos(todos, searchObject);
  }
});

// hidecompleted check box----------------------------------------------------------------------

document.querySelector("#check-box").addEventListener("change", (e) => {
  searchObject.checkBox = e.target.checked;
  renderTodos(todos, searchObject);
});

export { todos, searchObject };
