import StorageManager from './Storage.js';
import Todolist from './Todolist.js';
import UpdateUI from './UpdateUI.js';

const markCompleted = (checkbox, id) => {
  const { checked } = checkbox;
  const toDoList = StorageManager.getData();
  toDoList[id - 1].completed = checked;
  StorageManager.storeData(toDoList);
  UpdateUI.refreshUI();
};

const clearCompleted = () => {
  Todolist.remove([], true);
  UpdateUI.refreshUI();
};

export { markCompleted, clearCompleted };