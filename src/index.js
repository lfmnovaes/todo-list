//import _ from 'lodash';
import taskList from './tasks.js';
import './style.css';

function component() {
  const tasks = document.getElementById('list');
  const task = document.createElement('li');
  const btn = document.createElement('button');

  //task.innerHTML = _.join(['Hello', 'webpack'], ' ');
  task.classList.add('hello');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = console.log(taskList);

  task.appendChild(btn);

  return task;
}

document.body.appendChild(component());
