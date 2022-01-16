import storageManager from './Storage.js';

export default class Todolist {
  static add = (description, completed = false) => {
    const todoList = storageManager.getData();
    const index = todoList.length + 1;
    todoList.push({
      description,
      completed,
      index,
    });
    storageManager.storeData(todoList);
  };

  static remove = (itemsToDelete, clear = false) => {
    let todoList = storageManager.getData();
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
    let i = 0;
    const { length } = todoList;
    for (i; i < length; i += 1) {
      todoList[i].index = i + 1;
    }
    storageManager.storeData(todoList);
  };
}
