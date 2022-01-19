/**
 * @jest-environment jsdom
 */

import StorageManager from '../Storage.js';
import Todolist from '../Todolist.js';
import UlManager from '../UpdateUI.js';
import { markCompleted, clearCompleted } from '../Completed.js';
import domSample from './DomSample.js';

describe('Clear all ', () => {
  test('Clear all completed tasks in the localStorage', () => {
    const listContainer = document.createElement('ul');

    Todolist.add('Elevator pitch', true);
    Todolist.add('Meet up with standup team 5:00pm utc+1');
    Todolist.add('Remember to eat launch');

    let data = StorageManager.getData();
    expect(data.length).toEqual(3);
    clearCompleted(listContainer);

    data = StorageManager.getData();
    expect(data.length).toEqual(2);

    markCompleted({ checked: true }, 1, listContainer);
    markCompleted({ checked: true }, 2, listContainer);

    clearCompleted(listContainer);
    data = StorageManager.getData();
    expect(data.length).toEqual(0);
  });

  test('Clear all task and testing in the DOM', () => {
    document.body.innerHTML = domSample();

    Todolist.add('Elevator pitch');
    Todolist.add('Meet up with standup team 5:00pm utc+1');
    Todolist.add('Remember to eat launch');

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
