/**
 * @jest-environment jsdom
 */

import { swapItems } from '../Dragdrop.js';
import StorageManager from '../Storage.js';
import Todolist from '../Todolist.js';
import UlManager from '../UpdateUI.js';
import domSample from './DomSample.js';

describe('Drag and Drop Testing', () => {
  test('Add completed tasks and monitor DOM', () => {
    document.body.innerHTML = domSample();

    // run add operation with completed as parameter
    Todolist.add('Elevator pitch', true);
    Todolist.add('Study React', true);
    Todolist.add('Eat alot of fruits');
    Todolist.add('Eat launch 12:40');
    Todolist.add('Meeting with Jihane 1:20pm utc +1');
    Todolist.add('Daily standup 5:00pm utc +1');

    const data = StorageManager.getData();
    const todos = document.querySelector('.list');
    const manageUI = new UlManager(todos, data);
    manageUI.refreshUI();
    expect(todos.childElementCount).toBe(6);
  });

  test('Drag item in 5th to item 1st position', () => {
    const listItem1 = document.querySelector('#list-1');
    const listItem5 = document.querySelector('#list-5');
    const initialList5Value = listItem5.children[1].innerHTML;
    const initialList1Value = listItem1.children[1].innerHTML;
    swapItems(5, 1);
    expect(listItem1.children[1].innerHTML).toBe(initialList5Value);
    expect(listItem5.children[1].innerHTML).toBe(initialList1Value);
  });

  test('Drag item in 6th to item 3rd position', () => {
    const listItem3 = document.querySelector('#list-3');
    const listItem6 = document.querySelector('#list-6');
    const initialList3Value = listItem3.children[1].innerHTML;
    const initialList6Value = listItem6.children[1].innerHTML;
    swapItems(6, 3);
    expect(listItem3.children[1].innerHTML).toBe(initialList6Value);
    expect(listItem6.children[1].innerHTML).toBe(initialList3Value);
  });
});