const express = require('express');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const app = express();
const dataDirectory = process.env.DATA_DIR || path.join(__dirname, 'data');
const dataFile = path.join(dataDirectory, 'tasks.json');
fs.mkdirSync(dataDirectory, { recursive: true });
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, '[]');

function readTasks() {
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

function saveTasks(tasks) {
  fs.writeFileSync(dataFile + '.tmp', JSON.stringify(tasks, null, 2));
  fs.renameSync(dataFile + '.tmp', dataFile);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/tasks', (req, res) => res.json(readTasks()));

app.post('/tasks', (req, res) => {
  const { title } = req.body || {};
  if (typeof title !== 'string' || !title.trim() || title.trim().length > 200) {
    return res.status(400).json({ error: 'Provide a task title of 1-200 characters' });
  }
  const tasks = readTasks();
  const task = { id: randomUUID(), title: title.trim(), completed: false };
  tasks.push(task);
  saveTasks(tasks);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const { title, completed } = req.body || {};
  if ((title === undefined && completed === undefined) ||
      (title !== undefined && (typeof title !== 'string' || !title.trim() || title.trim().length > 200)) ||
      (completed !== undefined && typeof completed !== 'boolean')) {
    return res.status(400).json({ error: 'Provide a valid title or boolean completed value' });
  }
  const tasks = readTasks();
  const task = tasks.find(task => task.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  if (title !== undefined) task.title = title.trim();
  if (completed !== undefined) task.completed = completed;
  saveTasks(tasks);
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex(task => task.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  tasks.splice(index, 1);
  saveTasks(tasks);
  res.json({ message: 'Task deleted' });
});

app.use((req, res) => res.status(404).json({ error: 'Endpoint not found' }));
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON' });
  console.error(err.message);
  res.status(500).json({ error: 'Unable to save or read tasks' });
});

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Task Manager running at http://localhost:${port}`));
