const list = document.getElementById('tasks');
const message = document.getElementById('message');
const titleInput = document.getElementById('title');

async function request(url, method = 'GET', body) {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error);
  return result;
}

async function loadTasks() {
  const tasks = await request('/tasks');
  list.replaceChildren();
  document.getElementById('empty').hidden = tasks.length > 0;
  for (const task of tasks) {
    const item = document.createElement('li');
    item.className = 'list-group-item d-flex align-items-center gap-3';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input mt-0';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', `Mark ${task.title} complete`);
    checkbox.onchange = () => changeTask(task.id, { completed: checkbox.checked });
    const title = document.createElement('span');
    title.className = 'task-title flex-grow-1' + (task.completed ? ' task-done' : '');
    title.textContent = task.title;
    const actions = document.createElement('div');
    actions.className = 'task-actions d-flex gap-2';
    const edit = document.createElement('button');
    edit.type = 'button';
    edit.className = 'btn btn-sm btn-outline-primary';
    edit.textContent = 'Edit';
    edit.onclick = () => {
      const updatedTitle = prompt('Task title', task.title);
      if (updatedTitle !== null) changeTask(task.id, { title: updatedTitle });
    };
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'btn btn-sm btn-outline-danger';
    remove.textContent = 'Delete';
    remove.onclick = async () => {
      try {
        await request('/tasks/' + task.id, 'DELETE');
        await loadTasks();
        message.textContent = 'Task deleted.';
      } catch (error) { message.textContent = error.message; }
    };
    actions.append(edit, remove);
    item.append(checkbox, title, actions);
    list.append(item);
  }
}

async function changeTask(id, changes) {
  try {
    await request('/tasks/' + id, 'PUT', changes);
    await loadTasks();
    message.textContent = 'Task updated.';
  } catch (error) {
    message.textContent = error.message;
    await loadTasks().catch(error => { message.textContent = error.message; });
  }
}

document.getElementById('task-form').onsubmit = async event => {
  event.preventDefault();
  try {
    await request('/tasks', 'POST', { title: titleInput.value });
    titleInput.value = '';
    await loadTasks();
    message.textContent = 'Task added.';
  } catch (error) { message.textContent = error.message; }
};
loadTasks().catch(error => { message.textContent = error.message; });
