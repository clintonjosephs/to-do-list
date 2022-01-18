import StorageManager from './Storage.js';
import Methods from './Methods.js';
import Todolist from './Todolist.js';

const markCompleted = (checkbox, id, listContainer) => {
  const { checked } = checkbox;
  const toDoList = StorageManager.getData();
  toDoList[id - 1].completed = checked;
  StorageManager.storeData(toDoList);
  Methods.uIRefreshInstance(listContainer);
};

const clearCompleted = (listContainer) => {
  Todolist.remove([], true);
  Methods.uIRefreshInstance(listContainer);
};

export { markCompleted, clearCompleted };