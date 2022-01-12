import storageManager from './Storage.js';
import Methods from './Methods.js';

export default class Completed {
  static markCompleted(checkbox, id, listContainer) {
    const { checked } = checkbox;
    const toDoList = storageManager.getData();
    toDoList[id - 1].completed = checked;
    storageManager.storeData(toDoList);
    Methods.uIRefreshInstance(listContainer);
  }

  static clearCompleted(listContainer) {
    let toDoList = storageManager.getData();
    toDoList = toDoList.filter((todo) => todo.completed !== true);
    storageManager.storeData(toDoList);
    Methods.uIRefreshInstance(listContainer);
  }
}
