/**
 * @jest-environment jsdom
 */

import { clearCompleted } from '../Completed.js';
import StorageManager from '../Storage.js';
import Todolist from '../Todolist.js';
import UlManager from '../UpdateUI.js';
import domSample from './DomSample.js';

describe('Test clearing completed tasks from DOM', () => {
  test('Add completed tasks and monitor DOM', () => {
    document.body.innerHTML = domSample();

    // run add operation with completed as parameter
    Todolist.add('Elevator pitch', true);
    Todolist.add('Study React', true);
    Todolist.add('Eat alot of fruits');

    const data = StorageManager.getData();
    const todos = document.querySelector('.list');
    const manageUI = new UlManager(todos, data);
    manageUI.refreshUI();
    expect(todos.childElementCount).toBe(3);
  });

  test('Remove completed elements from DOM', () => {
    const todos = document.querySelector('.list');
    const childrenCount = todos.childElementCount;
    clearCompleted(todos);
    expect(todos.childElementCount).toBeLessThan(childrenCount);
    expect(todos.childElementCount).toBe(1);
  });
});