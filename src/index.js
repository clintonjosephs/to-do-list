import _ from 'lodash';
import './style.css';
import UpdateUI from './UpdateUI.js';
import Todolist from './Todolist.js';
import storageManager from './Storage.js';

const listText = document.querySelector('.input-task');
const addListBtn = document.querySelector('#add');
const listContainer = document.querySelector('.list');
const localStorage = storageManager.getData();

const ulManager = new UpdateUI(listContainer, localStorage);
const addList = new Todolist(localStorage);

function component() {
  const element = document.createElement('div');
  // Lodash, now imported by this script
  element.innerHTML = _;
  return element;
}
document.body.appendChild(component());

function addToList() {
  if (listText.value !== '') {
    addList.add(listText.value);
    ulManager.refreshUI();
    listText.value = '';
  }
}
addListBtn.addEventListener('click', addToList);
window.onresize = ulManager.refreshUI();
