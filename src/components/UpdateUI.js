import addDragEvent from './Dragdrop.js';
import StorageManager from './Storage.js';

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
      li.innerHTML = UpdateUI.buildListItem(
        todo.index,
        todo.description,
        todo.completed,
      );
      addDragEvent(li);
    } else {
      li.innerHTML = '<span class= "item">Nothing on the list!</span>';
    }

    return li;
  };

  refreshUI = () => {
    this.todoList = StorageManager.getData();
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

  static buildListItem(index, description, completed) {
    let checked = 'checked';
    let transformText = 'completed';
    if (!completed) {
      checked = '';
      transformText = '';
    }
    return `<input type="checkbox" id="${index}" class="task-box" ${checked}>
    <span id="task-${index}" contenteditable='false' class= "task-description ${transformText}" data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false"> ${description} </span>
    <button class="remove"> <i class="fa fa-grip-lines" aria-hidden="true"></i><i id ="trash-${index}" class="trash fa fa-trash" aria-hidden="true"></i> </button>`;
  }
}
