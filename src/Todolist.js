import storageManager from './Storage.js';

export default class Todolist {
  constructor(listObj) {
    this.todoList = listObj;
  }

  add(description, completed = false) {
    const index = this.todoList.length + 1;
    this.todoList.push({
      description,
      completed,
      index,
    });
    storageManager.storeData(this.todoList);
  }

  remove(index) {
    this.todoList = this.todoList.filter((todo) => todo.index !== index);
    storageManager.storeData(this.todoList);
  }
}
