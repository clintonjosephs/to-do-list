/**
 * @jest-environment jsdom
 */

import { markCompleted } from '../Completed.js';
import StorageManager from '../Storage.js';
import Todolist from '../Todolist.js';
import UlManager from '../UpdateUI.js';
import domSample from './DomSample.js';

describe('updating item\'s "completed" status', () => {
  test('Add items to localstorage and update DOM', () => {
    document.body.innerHTML = domSample();

    // run add operation
    Todolist.add('Elevator pitch');
    Todolist.add('Study React');
    Todolist.add('Eat alot of fruits');

    const data = StorageManager.getData();
    const todos = document.querySelector('.list');
    const manageUI = new UlManager(todos, data);
    manageUI.refreshUI();
    expect(todos.childElementCount).toBe(3);
  });

  test('Mark and unmark completed status', () => {
    const allCheckBoxes = document.querySelectorAll('.task-box');
    const todos = document.querySelector('.list');
    allCheckBoxes.forEach((checkbox) => {
      checkbox.addEventListener('click', (event) => {
        const checkbox = event.target;
        const { id } = event.target;
        markCompleted(checkbox, id, todos);
      });
    });

    const checkBox1 = document.querySelector('.box-1');
    const checkBox2 = document.querySelector('.box-2');
    const checkBox3 = document.querySelector('.box-3');

    checkBox1.click();
    expect(StorageManager.getData()[0].completed).toBe(true);
    expect(checkBox1.checked).toBe(true);

    checkBox2.click();
    expect(StorageManager.getData()[1].completed).toBe(true);
    expect(checkBox2.checked).toBe(true);

    checkBox3.click();
    expect(StorageManager.getData()[2].completed).toBe(true);
    expect(checkBox3.checked).toBe(true);

    checkBox1.click();
    expect(StorageManager.getData()[0].completed).toBe(false);
    expect(checkBox1.checked).toBe(false);
  });
});