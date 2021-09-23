import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import * as taskFunctions from './taskFunctions.js';

library.add(fas);
dom.watch();

const boxList = document.getElementById('box-list');
const ul = document.createElement('ul');
ul.classList.add('item-list');

const createBox = () => {
  const top = document.createElement('div');
  const title = document.createElement('h2');
  const refresh = document.createElement('i');

  top.classList.add('top');
  title.innerHTML = "Today's To Do";
  refresh.classList.add('fas', 'fa-sync-alt');
  top.append(title, refresh);
  boxList.appendChild(top);
  const form = document.createElement('form');
  const input = document.createElement('input');
  const arrow = document.createElement('i');
  input.type = 'text';
  input.placeholder = 'Add to your list ...';
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.value !== '') {
        taskFunctions.addElement(ul, false, input.value);
        input.value = '';
      }
    }
  });
  arrow.classList.add('fas', 'fa-level-down-alt');
  form.append(input, arrow);
  boxList.append(form, ul);
  const bottom = document.createElement('div');
  bottom.classList.add('bottom');
  const clearBtn = document.createElement('button');
  clearBtn.classList.add('clear-btn');
  clearBtn.innerText = 'Clear all completed';
  clearBtn.addEventListener('click', () => {
    taskFunctions.removeCompleted(ul);
  }, false);
  bottom.appendChild(clearBtn);
  boxList.appendChild(bottom);
};

window.onload = () => {
  createBox();
  if (localStorage.getItem('tasks') === null) {
    localStorage.setItem('tasks', JSON.stringify([]));
  } else {
    taskFunctions.loadStorage(ul);
  }
};
