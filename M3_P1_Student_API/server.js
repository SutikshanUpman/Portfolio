const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'm3_students'
});

app.get('/students', async (req, res) => {
  const department = req.query.department;
  const [students] = department
    ? await db.execute('SELECT * FROM students WHERE department = ? ORDER BY id', [department])
    : await db.execute('SELECT * FROM students ORDER BY id');
  res.json(students);
});

app.param('id', (req, res, next, id) => {
  if (!/^\d+$/.test(id) || Number(id) < 1 || !Number.isSafeInteger(Number(id))) {
    return res.status(400).json({ error: 'Invalid student ID' });
  }
  next();
});

app.get('/students/:id', async (req, res) => {
  const [students] = await db.execute('SELECT * FROM students WHERE id = ?', [req.params.id]);
  if (!students.length) return res.status(404).json({ error: 'Student not found' });
  res.json(students[0]);
});

function validateStudent(req, res, next) {
  const { name, email, department, semester, cgpa } = req.body || {};
  if (typeof name !== 'string' || !name.trim() || name.trim().length > 100 ||
      typeof email !== 'string' || email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof department !== 'string' || !department.trim() || department.trim().length > 50 ||
      !Number.isInteger(semester) || semester < 1 || semester > 8 ||
      typeof cgpa !== 'number' || !Number.isFinite(cgpa) || cgpa < 0 || cgpa > 10) {
    return res.status(400).json({ error: 'Provide name, valid email, department, semester (1-8), and CGPA (0-10)' });
  }
  next();
}

app.post('/students', validateStudent, async (req, res) => {
  const { name, email, department, semester, cgpa } = req.body;
  const [result] = await db.execute(
    'INSERT INTO students (name, email, department, semester, cgpa) VALUES (?, ?, ?, ?, ?)',
    [name.trim(), email.toLowerCase(), department.trim(), semester, cgpa]
  );
  res.status(201).json({ id: result.insertId, message: 'Student added' });
});

app.put('/students/:id', validateStudent, async (req, res) => {
  const { name, email, department, semester, cgpa } = req.body;
  const [result] = await db.execute(
    'UPDATE students SET name = ?, email = ?, department = ?, semester = ?, cgpa = ? WHERE id = ?',
    [name.trim(), email.toLowerCase(), department.trim(), semester, cgpa, req.params.id]
  );
  if (!result.affectedRows) return res.status(404).json({ error: 'Student not found' });
  res.json({ message: 'Student updated' });
});

app.delete('/students/:id', async (req, res) => {
  const [result] = await db.execute('DELETE FROM students WHERE id = ?', [req.params.id]);
  if (!result.affectedRows) return res.status(404).json({ error: 'Student not found' });
  res.json({ message: 'Student deleted' });
});

app.use((req, res) => res.status(404).json({ error: 'Endpoint not found' }));
app.use((err, req, res, next) => {
  if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Email already exists' });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON' });
  console.error(err.message);
  res.status(500).json({ error: 'Database or server error' });
});

app.listen(3000, () => console.log('Student API running at http://localhost:3000'));
