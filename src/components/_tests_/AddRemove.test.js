/**
 * @jest-environment jsdom
 */

import StorageManager from "../Storage.js";
import Todolist from "../Todolist.js";
import ulManager from "../UpdateUI.js"

describe("Saving and Displaying li from localStorage", () => {
  test("Save a new task in localStorage", () => {
    Todolist.add("Clinton");
    const data = StorageManager.getData();
    const result = [
      {
        completed: false,
        description: "Clinton",
        index: 1,
      },
    ];
    expect(data).toEqual(result);
  });

  test("Display only one item added to list", () => {
    document.body.innerHTML =
      `<div>` +
      `<input type="text" class="input-task" placeholder="add task to your list ..."></div>` +
      `<button type="button" id="add" class="fa-input"><i class="fas fa-level-down-alt fa-rotate-90"></i></button>` +
      `<ul class="list" id="taskList">` +
      `</ul>` +
      `</li>`;
      const data = StorageManager.getData();
      const todos = document.querySelector(".list");
      const manageUI = new ulManager(todos, data);
      manageUI.refreshUI();
      expect(todos.childElementCount).toBe(1);
  });
});

describe("Removing / Trashing task", () => {
  test("Remove from local storage", () => {
    Todolist.add("Go running");
    Todolist.add("Buy groceries");
    Todolist.add("Buy beverages");
    Todolist.add("Play music");
    Todolist.remove([1]);
    expect(StorageManager.getData().length).toBe(4);
    Todolist.remove([2]);
    expect(StorageManager.getData().length).toBe(3);
    Todolist.remove([3]);
    expect(StorageManager.getData().length).toBe(2);
  });

});
