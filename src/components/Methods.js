import StorageManager from './Storage.js';
import Todolist from './Todolist.js';
import UpdateUI from './UpdateUI.js';

export default class Methods {
  constructor(itemsToDelete = [], toogle = false) {
    this.itemsToDelete = itemsToDelete;
    this.toogle = toogle;
    this.listLength = StorageManager.getData().length;
  }

  markListForChanges = (li, id, listContainer) => {
    /* line 13 - 17 is for cases where a user selects items for delete */
    /* and goes ahead to add to the list */

    const storedDataLength = StorageManager.getData().length;
    const taskDescription = li.children[1];
    const elipsis = li.lastChild.children[0];
    const deleteIcon = li.lastChild.children[1];
    const index = this.itemsToDelete.indexOf(id);

    if (this.listLength < storedDataLength) {
      this.itemsToDelete.length = 0;
    }

    Methods.taskKeyDown(taskDescription, id, listContainer);

    if (index !== -1) {
      this.toogle = !this.toogle;
      this.itemsToDelete.splice(index, 1);
    } else {
      this.toogle = true;
      this.itemsToDelete.push(id);
      this.listLength = StorageManager.getData().length;
    }

    if (this.toogle) {
      const sel = window.getSelection();
      const range = document.createRange();

      li.classList.add('markActive');
      elipsis.classList.add('trash');
      deleteIcon.classList.remove('trash');
      taskDescription.contentEditable = true;
      taskDescription.classList.add('task-description-border');

      // the following code is used to set cursor to the end of the span tag on edit
      range.selectNodeContents(taskDescription);
      range.collapse(false);
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

  static editTaskDescription = (taskDescriptionSpan, id) => {
    const taskDescription = taskDescriptionSpan.textContent;
    const toDoList = StorageManager.getData();
    if (taskDescription !== '') {
      toDoList[id - 1].description = taskDescriptionSpan.textContent;
      StorageManager.storeData(toDoList);
    } else {
      taskDescriptionSpan.textContent = toDoList[id - 1].description;
    }
  }

  static uIRefreshInstance = (listContainer) => {
    const ulManager = new UpdateUI(listContainer, StorageManager.getData());
    ulManager.refreshUI();
  }

  static taskKeyDown(taskDescriptionSpan, id, listContainer) {
    taskDescriptionSpan.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        Methods.editTaskDescription(taskDescriptionSpan, id);
        Methods.uIRefreshInstance(listContainer);
      }
    });
  }
}