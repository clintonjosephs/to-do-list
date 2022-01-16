import addDragEvent from './Dragdrop.js';
import storageManager from './Storage.js';

export default class UpdateUI {
  constructor(listElement, listObj) {
    this.showToDoElement = listElement;
    this.todoList = listObj;
  }

  static createListDisplay = (todo, empty = false) => {
    const li = document.createElement('li');
    li.classList.add('item');
    li.draggable = true;
    li.setAttribute('data-index', todo.index);
    li.id = `list-${todo.index}`;
    if (!empty) {
      if (!todo.completed) {
        li.innerHTML = `<input type="checkbox" id="${todo.index}" class="task-box">
        <span id="task-${todo.index}" contenteditable='false' class= "task-description" data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false"> ${todo.description} </span>
        <button class="remove"> <i class="fa fa-grip-lines" aria-hidden="true"></i><i id ="trash-${todo.index}" class="trash fa fa-trash" aria-hidden="true"></i> </button>`;
      } else {
        li.innerHTML = `<input type="checkbox" id="${todo.index}" class="task-box" checked>
        <span id="task-${todo.index}" contenteditable='false' class= "task-description completed" data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false"> ${todo.description} </span>
        <button class="remove"> <i class="fa fa-grip-lines" aria-hidden="true"></i><i id ="trash-${todo.index}" class="trash fa fa-trash" aria-hidden="true"></i> </button>`;
      }
      addDragEvent(li);
    } else {
      li.innerHTML = '<span class= "item">Nothing on the list!</span>';
    }

    return li;
  };

  refreshUI = () => {
    this.todoList = storageManager.getData();
    while (this.showToDoElement.firstChild) {
      this.showToDoElement.removeChild(this.showToDoElement.firstChild);
    }

    if (this.todoList.length > 0) {
      this.todoList.forEach((todo) => {
        this.showToDoElement.appendChild(UpdateUI.createListDisplay(todo));
      });
    } else {
      this.showToDoElement.appendChild(UpdateUI.createListDisplay({}, true));
    }
  };
}
