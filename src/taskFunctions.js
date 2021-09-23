import chkboxStatus from './chkbox.js';

class Task {
  constructor(i, c = false, d) {
    this.index = i;
    this.completed = c;
    this.description = d;
  }
}

let taskList = [];

const saveStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(taskList));
};

const loadStorage = (ul) => {
  taskList = JSON.parse(localStorage.tasks)
  taskList.forEach((task) => {
    addLi(ul, task.completed, task.description);
  });
}

const addLi = (ul, completed, description) => {
  const item = document.createElement('li');
  const cBox = document.createElement('input');
  cBox.type = 'checkbox';
  cBox.id = (taskList.length-1);
  cBox.checked = completed;
  const label = document.createElement('label');
  label.contentEditable = true;
  label.innerText = description;
  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-ellipsis-v');
  cBox.addEventListener('change', () => {
    if (chkboxStatus(cBox)) {
      taskList[parseInt(cBox.id, 10)].completed = true;
    } else {
      taskList[parseInt(cBox.id, 10)].completed = false;
    }
    saveStorage();
  });
  item.append(cBox, label, icon);
  ul.prepend(item);
};

const addElement = (ul, completed, description) => {
  taskList.push(new Task(taskList.length, completed, description));
  addLi(ul, completed, description);
  saveStorage();
}

const removeElement = () => {
  console.log('remove element');
}

export { saveStorage, loadStorage, addLi, addElement, removeElement };