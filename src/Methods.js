import storageManager from './Storage.js';
import Todolist from './Todolist.js';
import UpdateUI from './UpdateUI.js';

export default class Methods {
  constructor(itemsToDelete = [], toogle = false) {
    this.itemsToDelete = itemsToDelete;
    this.toogle = toogle;
  }

  markListForChanges(li, id, listContainer) {
    const taskDescription = li.children[1];
    const elipsis = li.children[2].children[0];
    const deleteIcon = li.children[2].children[1];
    const index = this.itemsToDelete.indexOf(id);

    if (index !== -1) {
      this.toogle = !this.toogle;
      this.itemsToDelete.splice(index, 1);
    } else {
      this.toogle = true;
      this.itemsToDelete.push(id);
    }

    if (this.toogle) {
      li.classList.add('markDelete');
      elipsis.classList.add('trash');
      deleteIcon.classList.remove('trash');
      taskDescription.contentEditable = true;
    } else {
      li.classList.remove('markDelete');
      elipsis.classList.remove('trash');
      deleteIcon.classList.add('trash');
      taskDescription.contentEditable = false;
      Methods.editTaskDescription(taskDescription, id);
    }
    this.addListenerForRemove(deleteIcon, listContainer);
    this.toogle = true;
  }

  addListenerForRemove(deleteBtn, listContainer) {
    deleteBtn.addEventListener('click', () => {
      Todolist.remove(this.itemsToDelete);
      this.itemsToDelete.length = 0;
      Methods.uIRefreshInstance(listContainer);
    });
  }

  static editTaskDescription(span, id) {
    const toDoList = storageManager.getData();
    toDoList[id - 1].description = span.textContent;
    storageManager.storeData(toDoList);
  }

  static uIRefreshInstance(listContainer) {
    const ulManager = new UpdateUI(listContainer, storageManager.getData());
    ulManager.refreshUI();
  }
}