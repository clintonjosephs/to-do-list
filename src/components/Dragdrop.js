import storageManager from './Storage.js';

let dragStartIndex;

const swapItems = (from, to) => {
  const fromIndex = from - 1;
  const toIndex = to - 1;

  const listContainer = document.querySelector('.list');

  const toDoList = storageManager.getData();
  const itemOne = toDoList[fromIndex];
  const itemTwo = toDoList[toIndex];

  toDoList[fromIndex] = itemTwo;
  toDoList[fromIndex].index = from;
  toDoList[toIndex] = itemOne;
  toDoList[toIndex].index = to;

  const liFrom = listContainer.children[fromIndex].innerHTML;
  const liTo = listContainer.children[toIndex].innerHTML;

  listContainer.children[fromIndex].innerHTML = liTo;
  listContainer.children[fromIndex].id = from;
  listContainer.children[fromIndex].setAttribute('data-index', from);
  listContainer.children[fromIndex].children[0].id = from;
  listContainer.children[fromIndex].children[1].id = `task-${from}`;
  listContainer.children[fromIndex].children[2].children[1].id = `trash-${from}`;

  listContainer.children[toIndex].innerHTML = liFrom;
  listContainer.children[toIndex].id = to;
  listContainer.children[toIndex].setAttribute('data-index', to);
  listContainer.children[toIndex].children[0].id = to;
  listContainer.children[toIndex].children[1].id = `task-${to}`;
  listContainer.children[toIndex].children[2].children[1].id = `trash-${to}`;

  storageManager.storeData(toDoList);
};

const dragStart = (item) => {
  dragStartIndex = +item.closest('li').getAttribute('data-index');
};

const dragOver = (e) => {
  e.preventDefault();
};

const dragDrop = (item) => {
  const dragEndIndex = +item.getAttribute('data-index');
  item.classList.remove('markActive');
  swapItems(dragStartIndex, dragEndIndex);
};

const dragEnter = (item) => {
  item.classList.add('markActive');
};

const dragLeave = (item) => {
  item.classList.remove('markActive');
};

const addDragEvent = (item) => {
  item.addEventListener('dragstart', () => dragStart(item));
  item.addEventListener('dragover', dragOver);
  item.addEventListener('drop', () => dragDrop(item));
  item.addEventListener('dragenter', () => dragEnter(item));
  item.addEventListener('dragleave', () => dragLeave(item));
};

export default addDragEvent;