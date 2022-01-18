import _ from 'lodash';
import './style.css';
import UpdateUI from './components/UpdateUI.js';
import Todolist from './components/Todolist.js';
import StorageManager from './components/Storage.js';
import Methods from './components/Methods.js';
import { markCompleted, clearCompleted } from './components/Completed.js';

const listText = document.querySelector('.input-task');
const addListBtn = document.querySelector('#add');
const listContainer = document.querySelector('.list');
const clearList = document.querySelector('.clear');
const localStorage = StorageManager.getData();

const ulManager = new UpdateUI(listContainer, localStorage);
const Method = new Methods();

const component = () => {
  const element = document.createElement('div');
  element.innerHTML = _;
  return element;
};

const addToList = () => {
  if (listText.value !== '') {
    Todolist.add(listText.value);
    ulManager.refreshUI();
    listText.value = '';
  }
};

const operationWhenEnterIsStriked = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    addToList();
  }
};

addListBtn.addEventListener('click', addToList);
listText.addEventListener('keyup', operationWhenEnterIsStriked);

listContainer.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    const listId = event.target.id.replace('list-', '');
    Method.markListForChanges(event.target, listId, listContainer);
  } else if (event.target.tagName === 'INPUT') {
    const checkbox = event.target;
    const { id } = event.target;
    markCompleted(checkbox, id, listContainer);
  }
});

clearList.addEventListener('click', () => {
  clearCompleted(listContainer);
});

document.body.appendChild(component());
window.onresize = ulManager.refreshUI();