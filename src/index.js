import _ from 'lodash';
import './style.css';
import UpdateUI from './UpdateUI.js';
import Todolist from './Todolist.js';
import storageManager from './Storage.js';
import Methods from './Methods.js';
import {markCompleted, clearCompleted} from './Completed.js';

const listText = document.querySelector('.input-task');
const addListBtn = document.querySelector('#add');
const listContainer = document.querySelector('.list');
const clearList = document.querySelector('.clear');
const localStorage = storageManager.getData();

const ulManager = new UpdateUI(listContainer, localStorage);
const Method = new Methods();

function component() {
  const element = document.createElement('div');
  element.innerHTML = _;
  return element;
}

function addToList() {
  if (listText.value !== '') {
    Todolist.add(listText.value);
    ulManager.refreshUI();
    listText.value = '';
  }
}

addListBtn.addEventListener('click', addToList);

listContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const listId = e.target.id.replace('list-', '');
    Method.markListForChanges(e.originalTarget, listId, listContainer);
  } else if (e.target.tagName === 'INPUT') {
    const checkbox = e.target;
    const { id } = e.target;
    markCompleted(checkbox, id, listContainer);
  }
});

clearList.addEventListener('click', () => {
  clearCompleted(listContainer);
});

document.body.appendChild(component());
window.onresize = ulManager.refreshUI();