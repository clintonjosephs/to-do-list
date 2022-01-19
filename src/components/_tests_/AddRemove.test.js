/**
 * @jest-environment jsdom
 */

import StorageManager from '../Storage.js';
import Todolist from '../Todolist.js';
import UlManager from '../UpdateUI.js';
import domSample from './DomSample.js';

describe('Saving and Displaying li from localStorage', () => {
  test('Save a new task in localStorage', () => {
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
  });

  test('Display only one item added to list', () => {
    document.body.innerHTML = domSample();
    const data = StorageManager.getData();
    const todos = document.querySelector('.list');
    const manageUI = new UlManager(todos, data);
    manageUI.refreshUI();
    expect(todos.childElementCount).toBe(1);
  });

  test('Testing List item from DOM', () => {
    document.body.innerHTML = domSample();
    const data = StorageManager.getData();
    const todos = document.querySelector('.list');

    const manageUI = new UlManager(todos, data);
    manageUI.refreshUI();
    const task = document.querySelector('#task-1');

    expect(task.innerHTML).toBe(' Elevator pitch ');
  });
});

describe('Removing / Trashing task', () => {
  test('Remove from local storage', () => {
    Todolist.add('Go running');
    Todolist.add('Buy groceries');
    Todolist.add('Buy beverages');
    Todolist.add('Play music');
    Todolist.remove([1]);
    expect(StorageManager.getData().length).toBe(4);
    Todolist.remove([2]);
    expect(StorageManager.getData().length).toBe(3);
    Todolist.remove([3]);
    expect(StorageManager.getData().length).toBe(2);
  });
});
