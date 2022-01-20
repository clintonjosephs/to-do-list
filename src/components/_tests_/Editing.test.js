/**
 * @jest-environment jsdom
 */

import StorageManager from '../Storage.js';
import Todolist from '../Todolist.js';
import UlManager from '../UpdateUI.js';
import Methods from '../Methods.js';
import domSample from './DomSample.js';

describe('Editing a task', () => {
  test('Editting a new task in localStorage And Update the description', () => {
    Todolist.add('Elevator pitch');
    let data = StorageManager.getData();
    const result = [
      {
        completed: false,
        description: 'Elevator pitch',
        index: 1,
      },
    ];
    expect(data).toEqual(result);
    const newSpan = document.createElement('span');
    newSpan.textContent = 'Test';
    Methods.editTaskDescription(newSpan, 1);

    data = StorageManager.getData();

    const result2 = [
      {
        completed: false,
        description: 'Test',
        index: 1,
      },
    ];
    expect(data).toEqual(result2);
  });

  test('Editing a new task in localStorage And Update the description in DOM', () => {
    document.body.innerHTML = domSample();

    Todolist.add('Elevator pitch');

    UlManager.refreshUI();

    const newSpan = document.querySelector('#task-1');
    newSpan.textContent = 'Buy groceries';
    Methods.editTaskDescription(newSpan, 1);

    const task = document.body.querySelector('#task-1');
    expect(task.innerHTML).toBe('Buy groceries');
  });
});
