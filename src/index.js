import _ from 'lodash';
import './style.css';
import UpdateUI from './UpdateUI.js';
import Todolist from './todolist.js';
import storageManager from './Storage.js';

const listText = document.querySelector('.input-task');
const addListBtn = document.querySelector('#add');
const listContainer = document.querySelector('.list');
const localStorage = storageManager.getData();

const ulManager = new UpdateUI(listContainer, localStorage);
const addList = new Todolist(localStorage);

function addToList() {
  if (listText.value !== "") {
    addList.add(listText.value);
    ulManager.refreshUI();
    listText.value = "";
  }
}
addListBtn.addEventListener('click', addToList);
window.onresize = ulManager.refreshUI();
