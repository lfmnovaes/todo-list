import taskList from './tasks.js';
import './style.css';

let populateList = () => {
  taskList.forEach((task) => {
    console.log(task);
  });
}

window.onload = () => {
  const list = document.getElementById('list');
  const item = document.createElement('li');
  const label = document.createElement('p');
  //const update = document.createElement('button');

  item.classList.add('item');
  label.innerHTML = "Today's To Do";
  list.appendChild(label);
  list.appendChild(item);

  const form = document.createElement('form');
  const input = document.createElement('input');
  input.placeholder = 'Add to your list ...';
  form.appendChild(input);
  list.appendChild(form);

  populateList();
};
