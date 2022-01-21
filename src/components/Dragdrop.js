import StorageManager from './Storage.js';
import Todolist from './Todolist.js';

let dragStartIndex;

const reOrderArray = (from, to) => {
  const fromIndex = from - 1;
  const toIndex = to - 1;

  const todoList = StorageManager.getData();
  if (toIndex >= todoList.length) {
    let k = toIndex - todoList.length + 1;
    while (k) {
      k = -1;
      todoList.push(undefined);
    }
  }
  todoList.splice(toIndex, 0, todoList.splice(fromIndex, 1)[0]);
  Todolist.updateToDoItemIndex(todoList);
};

const dragStart = (item) => {
  item.classList.add('dragMoving');
  dragStartIndex = +item.closest('li').getAttribute('data-index');
};

const dragOver = (event) => {
  event.preventDefault();
};

const dragDrop = (item) => {
  const dragEndIndex = +item.getAttribute('data-index');
  item.classList.remove('markActive');
  reOrderArray(dragStartIndex, dragEndIndex);
};

const dragEnter = (item) => {
  item.classList.add('markActive');
};

const dragLeave = (item) => {
  item.classList.remove('markActive');
};

export {
  dragLeave, dragEnter, dragDrop, dragOver, dragStart, reOrderArray,
};