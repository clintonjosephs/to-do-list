import StorageManager from './Storage.js';

export default class Todolist {
  static add = (description, completed = false) => {
    const todoList = StorageManager.getData();
    const index = todoList.length + 1;
    todoList.push({
      description,
      completed,
      index,
    });
    StorageManager.storeData(todoList);
  };

  static remove = (itemsToDelete, clear = false) => {
    let todoList = StorageManager.getData();
    if (!clear) {
      itemsToDelete.forEach((index) => {
        todoList = todoList.filter((todo) => todo.index !== Number(index));
      });
    } else {
      todoList = todoList.filter((todo) => todo.completed !== true);
    }

    Todolist.updateToDoItemIndex(todoList);
  };

  static updateToDoItemIndex = (todoList) => {
    todoList.forEach((todo, index) => {
      todo.index = index + 1;
    });
    StorageManager.storeData(todoList);
  };
}
