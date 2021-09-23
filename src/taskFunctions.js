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

const addLi = (ul, index, completed, description) => {
  const item = document.createElement('li');
  const cBox = document.createElement('input');
  cBox.type = 'checkbox';
  cBox.id = index;
  cBox.checked = completed;
  cBox.addEventListener('change', () => {
    if (chkboxStatus(cBox)) {
      taskList[parseInt(cBox.id, 10)].completed = true;
    } else {
      taskList[parseInt(cBox.id, 10)].completed = false;
    }
    saveStorage();
  });
  const label = document.createElement('label');
  label.contentEditable = true;
  label.innerText = description;
  label.addEventListener('focus', () => {
    label.parentNode.style.backgroundColor = 'lightyellow';
    label.parentNode.childNodes[2].style.pointerEvents = 'initial';
    label.parentNode.childNodes[2].childNodes[0].style.display = 'none';
    label.parentNode.childNodes[2].childNodes[2].style.display = 'initial';
  });
  label.addEventListener('focusout', (e) => {
    label.parentNode.style.backgroundColor = 'initial';
    label.parentNode.childNodes[2].childNodes[0].style.display = 'initial';
    label.parentNode.childNodes[2].childNodes[2].style.display = 'none';
    taskList[parseInt(cBox.id, 10)].description = e.composedPath()[0].innerText;
    saveStorage();
    setTimeout(() => {
      label.parentNode.childNodes[2].style.pointerEvents = 'none';
    }, 500);
  });
  const elBtn = document.createElement('button');
  elBtn.className = 'element-button';
  elBtn.addEventListener('click', (e) => {
    // eslint-disable-next-line no-use-before-define
    removeElement(ul, e.currentTarget.parentNode.childNodes[0].id);
    e.target.closest('li').remove();
  }, false);
  const icon = document.createElement('i');
  icon.className = 'fas fa-ellipsis-v';
  const icon2 = document.createElement('i');
  icon2.className = 'fas fa-trash';
  elBtn.append(icon, icon2);
  item.append(cBox, label, elBtn);
  ul.prepend(item);
};

const refresh = (ul) => {
  while (ul.hasChildNodes()) ul.removeChild(ul.firstChild);
  for (let i = 0; i < taskList.length; i += 1) taskList[i].index = i;
  taskList.forEach((task) => {
    addLi(ul, task.index, task.completed, task.description);
  });
  saveStorage();
};

const removeElement = (ul, index) => {
  taskList = taskList.filter((e) => e.index !== parseInt(index, 10));
  refresh(ul);
};

const removeCompleted = (ul) => {
  taskList = taskList.filter((e) => e.completed !== true);
  refresh(ul);
};

const loadStorage = (ul) => {
  taskList = JSON.parse(localStorage.tasks);
  taskList.forEach((task) => {
    addLi(ul, task.index, task.completed, task.description);
  });
};

const addElement = (ul, completed, description) => {
  taskList.push(new Task(taskList.length, completed, description));
  addLi(ul, (taskList.length - 1), completed, description);
  saveStorage();
};

export {
  loadStorage, addElement, removeCompleted,
};
