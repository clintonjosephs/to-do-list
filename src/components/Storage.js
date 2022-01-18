export default class StorageManager {
  static storeData = (todoList) => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }

  static getData = () => (localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : [])
}
