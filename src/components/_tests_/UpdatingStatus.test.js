/**
 * @jest-environment jsdom
 */

import StorageManager from '../Storage.js';
import Todolist from '../Todolist.js';
import UlManager from '../UpdateUI.js';
import { markCompleted } from '../Completed.js';
import domSample from './DomSample.js';

describe('Updated status ', () => {
  test('Updated status in the localStorage', () => {
    Todolist.add('Elevator pitch');
    const data = StorageManager.getData();
    const result = [
      {
        completed: false,
        description: 'Elevator pitch',
        index: 1,
      },
    ];
    expect(data).toEqual(result);

    const listContainer = document.createElement('ul');
    markCompleted({ checked: true }, 1, listContainer);

    const data2 = StorageManager.getData();
    const result2 = [
      {
        completed: true,
        description: 'Elevator pitch',
        index: 1,
      },
    ];
    expect(data2).toEqual(result2);
  });

  test('Updated status in the DOM', () => {
    document.body.innerHTML = domSample();

    Todolist.add('Elevator pitch');

    const data = StorageManager.getData();
    const todos = document.querySelector('.list');

    const manageUI = new UlManager(todos, data);
    manageUI.refreshUI();
    const task = document.querySelector('#list-1 input');

    markCompleted({ checked: true }, 1, todos);
    expect(task.checked).toBe(true);
  });
});
