import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import taskList from './tasks.js';

library.add(fas);
dom.watch();

const boxList = document.getElementById('box-list');

const populateList = () => {
  const list = document.createElement('ul');
  list.classList.add('item-list');
  taskList.forEach((task) => {
    const item = document.createElement('li');
    const cBox = document.createElement('input');
    cBox.type = 'checkbox';
    const label = document.createElement('label');
    label.innerText = task.description;
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-ellipsis-v');

    item.appendChild(cBox);
    item.appendChild(label);
    item.appendChild(icon);
    list.appendChild(item);
  });
  return list;
};

window.onload = () => {
  const top = document.createElement('div');
  const title = document.createElement('h2');
  const refresh = document.createElement('i');

  top.classList.add('top');
  title.innerHTML = "Today's To Do";
  refresh.classList.add('fas', 'fa-sync-alt');
  top.appendChild(title);
  top.appendChild(refresh);
  boxList.appendChild(top);
  const form = document.createElement('form');
  const input = document.createElement('input');
  const arrow = document.createElement('i');
  input.type = 'text';
  input.placeholder = 'Add to your list ...';
  arrow.classList.add('fas', 'fa-level-down-alt');
  form.appendChild(input);
  form.appendChild(arrow);
  boxList.appendChild(form);

  boxList.appendChild(populateList());

  const bottom = document.createElement('div');
  bottom.classList.add('bottom');
  const clearBtn = document.createElement('button');
  clearBtn.classList.add('clear-btn');
  clearBtn.innerText = 'Clear all completed';
  bottom.appendChild(clearBtn);
  boxList.appendChild(bottom);
};
