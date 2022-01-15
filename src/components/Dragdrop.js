import Methods from "./Methods";
import storageManager from "./Storage";

let dragStartIndex;

const addDragEvent = (item) => {
    item.addEventListener('dragstart', () =>  dragStart(item));  
    item.addEventListener('dragover', dragOver);  
    item.addEventListener('drop', () => dragDrop(item));  
    item.addEventListener('dragenter', () => dragEnter(item)); 
    item.addEventListener('dragleave', () => dragLeave(item));  
};

const dragStart = (item) => {
    dragStartIndex = +item.closest('li').getAttribute('data-index');
}

const dragOver = (e) => {
    e.preventDefault();
}

const dragDrop = (item) => {
    const dragEndIndex = +item.getAttribute('data-index');
    item.classList.remove("markActive");
    swapItems(dragStartIndex, dragEndIndex);
}

const dragEnter = (item) => {
  item.classList.add('markActive');
}

const dragLeave = (item) => {
    item.classList.remove('markActive');
}

const swapItems = (from , to) => {
    
    const listContainer = document.querySelector('.list');
    let toDoList = storageManager.getData();
    const itemOne = toDoList[from - 1];
    const itemTwo = toDoList[to - 1];
   
    toDoList[from - 1] = itemTwo;
    toDoList[from - 1].index = from;
    toDoList[to - 1] = itemOne;
    toDoList[to - 1].index = to;
   
    storageManager.storeData(toDoList);
    Methods.uIRefreshInstance(listContainer);
}

export { addDragEvent };