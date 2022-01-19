/**
 * @jest-environment jsdom
 */

import StorageManager from '../Storage.js';
import Todolist from '../Todolist.js';
import UlManager from '../UpdateUI.js';
import Methods from '../Methods.js';

describe('Editing a task', () => {
  test('Editiong a new task in localStorage And Update the description', () => {
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

  test('Save a new task in localStorage And Update the description in DOM', () => {
    document.body.innerHTML = '<div>'
      + '<input type="text" class="input-task" placeholder="add task to your list ..."></div>'
      + '<button type="button" id="add" class="fa-input"><i class="fas fa-level-down-alt fa-rotate-90"></i></button>'
      + '<ul class="list" id="taskList">'
      + '</ul>'
      + '</li>';

    Todolist.add('Elevator pitch');

    const data = StorageManager.getData();
    const todos = document.querySelector('.list');

    const manageUI = new UlManager(todos, data);
    manageUI.refreshUI();

    const newSpan = document.querySelector('#task-1');
    newSpan.textContent = 'Test';
    Methods.editTaskDescription(newSpan, 1);

    const task = document.body.querySelector('#task-1');
    expect(task.innerHTML).toBe('Test');
  });
});
