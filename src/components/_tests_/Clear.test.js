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
    document.body.innerHTML = domSample();

    Todolist.add('Elevator pitch', true);
    Todolist.add('Meet up with standup team 5:00pm utc+1');
    Todolist.add('Remember to eat launch');

    let data = StorageManager.getData();
    expect(data.length).toEqual(3);
    clearCompleted();

    data = StorageManager.getData();
    expect(data.length).toEqual(2);

    markCompleted({ checked: true }, 1);
    markCompleted({ checked: true }, 2);

    clearCompleted();
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

    UlManager.refreshUI();

    markCompleted({ checked: true }, 1, todos);
    clearCompleted(todos);
    data = StorageManager.getData();
    expect(data.length).toEqual(2);
    expect(todos.childElementCount).toBe(2);
  });
});
