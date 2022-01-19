/**
 * @jest-environment jsdom
 */

import Methods from '../Methods.js';
import StorageManager from '../Storage.js';
import Todolist from '../Todolist.js';
import UlManager from '../UpdateUI.js';
import domSample from './DomSample.js';

describe('Editting task description', () => {
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

  test('Edit item in third list in index', () => {
    const newValue = 'Play Video Games';
    const thirdListDescriptionSpan = document.querySelector('#task-3');
    thirdListDescriptionSpan.textContent = newValue;
    Methods.editTaskDescription(thirdListDescriptionSpan, 3);
    const data = StorageManager.getData();
    expect(data[2].description).toBe('Play Video Games');
  });

  test('Edit item in first list in index', () => {
    const newValue = 'Appointment with the doctor';
    const thirdListDescriptionSpan = document.querySelector('#task-1');
    thirdListDescriptionSpan.textContent = newValue;
    Methods.editTaskDescription(thirdListDescriptionSpan, 1);
    const data = StorageManager.getData();
    expect(data[0].description).toBe('Appointment with the doctor');
    expect(thirdListDescriptionSpan.textContent).toBe('Appointment with the doctor');
  });
});