import storageManager from './Storage.js';
import Todolist from './Todolist.js';
import UpdateUI from './UpdateUI.js';

export default class Methods {
  constructor(itemsToDelete = [], toogle = false) {
    this.itemsToDelete = itemsToDelete;
    this.toogle = toogle;
    this.Listlength = storageManager.getData().length;
  }

  markListForChanges = (li, id, listContainer) => {
    /* line 13 - 17 is for cases where a user selects items for delete */
    /* and goes ahead to add to the list */

    const storedDataLength = storageManager.getData().length;
    if (this.Listlength < storedDataLength) {
      this.itemsToDelete.length = 0;
    }

    const taskDescription = li.children[1];
    Methods.taskKeyDown(taskDescription, id, listContainer);
    const elipsis = li.lastChild.children[0];
    const deleteIcon = li.lastChild.children[1];
    const index = this.itemsToDelete.indexOf(id);

    if (index !== -1) {
      this.toogle = !this.toogle;
      this.itemsToDelete.splice(index, 1);
    } else {
      this.toogle = true;
      this.itemsToDelete.push(id);
      this.Listlength = storageManager.getData().length;
    }

    if (this.toogle) {
      li.classList.add('markActive');
      elipsis.classList.add('trash');
      deleteIcon.classList.remove('trash');
      taskDescription.contentEditable = true;
      taskDescription.classList.add('task-description-border');

      // the following code is used to set cursor to the end of the span tag on edit
      const range = document.createRange();
      range.selectNodeContents(taskDescription);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      li.classList.remove('markActive');
      elipsis.classList.remove('trash');
      deleteIcon.classList.add('trash');
      taskDescription.contentEditable = false;
      taskDescription.classList.remove('task-description-border');
      Methods.editTaskDescription(taskDescription, id);
    }
    this.addListenerForRemove(deleteIcon, listContainer);
    this.toogle = true;
  }

  addListenerForRemove = (deleteBtn, listContainer) => {
    deleteBtn.addEventListener('click', () => {
      Todolist.remove(this.itemsToDelete);
      this.itemsToDelete.length = 0;
      Methods.uIRefreshInstance(listContainer);
    });
  }

  static editTaskDescription = (span, id) => {
    const taskDescription = span.textContent;
    const toDoList = storageManager.getData();
    if (taskDescription !== '') {
      toDoList[id - 1].description = span.textContent;
      storageManager.storeData(toDoList);
    } else {
      span.textContent = toDoList[id - 1].description;
    }
  }

  static uIRefreshInstance = (listContainer) => {
    const ulManager = new UpdateUI(listContainer, storageManager.getData());
    ulManager.refreshUI();
  }

  static taskKeyDown(span, id, listContainer) {
    span.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        Methods.editTaskDescription(span, id);
        Methods.uIRefreshInstance(listContainer);
      }
    });
  }
}