/**
 * @jest-environment jsdom
 */

import { reOrderArray } from '../Dragdrop.js';
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

    const todos = document.querySelector('.list');
    UlManager.refreshUI();
    expect(todos.childElementCount).toBe(6);
  });

  test('Drag item in 5th to item 1st position', () => {
    const listItem5 = document.querySelector('#list-5');
    const initialList5Value = listItem5.children[1].innerHTML;
    reOrderArray(5, 1);
    const data = StorageManager.getData();
    expect(data[0].description).toBe(initialList5Value.trim());
  });

  test('Drag item in 6th to item 3rd position', () => {
    const listItem6 = document.querySelector('#list-6');
    const initialList6Value = listItem6.children[1].innerHTML;
    reOrderArray(6, 3);
    const data = StorageManager.getData();
    expect(data[2].description).toBe(initialList6Value.trim());
  });
});