import {
  dragLeave,
  dragEnter,
  dragDrop,
  dragOver,
  dragStart,
} from './Dragdrop.js';
import StorageManager from './Storage.js';

export default class UpdateUI {
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
      li.addEventListener('dragstart', () => dragStart(li));
      li.addEventListener('dragover', dragOver);
      li.addEventListener('drop', () => { dragDrop(li); UpdateUI.refreshUI(); });
      li.addEventListener('dragenter', () => dragEnter(li));
      li.addEventListener('dragleave', () => dragLeave(li));
    } else {
      li.innerHTML = '<span class= "item">Nothing on the list!</span>';
    }

    return li;
  };

  static refreshUI = () => {
    const listContainer = document.querySelector('.list');
    this.todoList = StorageManager.getData();
    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }

    if (this.todoList.length > 0) {
      this.todoList.forEach((todo) => {
        listContainer.appendChild(UpdateUI.createListDisplay(todo));
      });
    } else {
      listContainer.appendChild(UpdateUI.createListDisplay({}, true));
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
