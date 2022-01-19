/**
 * @jest-environment jsdom
 */

import StorageManager from '../Storage.js';
import Todolist from '../Todolist.js';
import UlManager from '../UpdateUI.js';
import { markCompleted, clearCompleted } from '../Completed.js';

describe('Clear all ', () => {
  test('Clear all test in the localStorage', () => {
    const listContainer = document.createElement('ul');

    Todolist.add('Elevator pitch');
    Todolist.add('Elevator pitch2');
    Todolist.add('Elevator pitch3');

    let data = StorageManager.getData();
    expect(data.length).toEqual(3);

    markCompleted({ checked: true }, 1, listContainer);
    clearCompleted(listContainer);
    data = StorageManager.getData();
    expect(data.length).toEqual(2);

    markCompleted({ checked: true }, 1, listContainer);
    markCompleted({ checked: true }, 2, listContainer);

    clearCompleted(listContainer);
    data = StorageManager.getData();
    expect(data.length).toEqual(0);
  });

  test('Clear all test in the DOM', () => {
    document.body.innerHTML = '<div>'
      + '<input type="text" class="input-task" placeholder="add task to your list ..."></div>'
      + '<button type="button" id="add" class="fa-input"><i class="fas fa-level-down-alt fa-rotate-90"></i></button>'
      + '<ul class="list" id="taskList">'
      + '</ul>'
      + '</li>';

    Todolist.add('Elevator pitch');
    Todolist.add('Elevator pitch2');
    Todolist.add('Elevator pitch3');

    let data = StorageManager.getData();
    const todos = document.querySelector('.list');

    const manageUI = new UlManager(todos, data);
    manageUI.refreshUI();

    markCompleted({ checked: true }, 1, todos);
    clearCompleted(todos);
    data = StorageManager.getData();
    expect(data.length).toEqual(2);
    expect(todos.childElementCount).toBe(2);
  });
});
