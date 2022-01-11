export default class storageManager {
  static storeData(todoList) {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }

  static getData() {
    return localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : [];
  }
  
}
