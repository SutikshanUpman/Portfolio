const express = require('express');
const sql = require('mssql');

const app = express();
app.use(express.json());
let pool;

app.get('/courses', async (req, res) => {
  const result = await pool.request().query(`
    SELECT c.course_id, c.course_name, c.capacity,
           c.capacity - COUNT(e.enrollment_id) AS remaining_seats
    FROM Courses c LEFT JOIN Enrollments e ON c.course_id = e.course_id
    GROUP BY c.course_id, c.course_name, c.capacity
    ORDER BY c.course_id`);
  res.json(result.recordset);
});

app.post('/enrollments', async (req, res) => {
  const { studentId, courseId } = req.body || {};
  if (!Number.isInteger(studentId) || studentId < 1 || studentId > 2147483647 ||
      !Number.isInteger(courseId) || courseId < 1 || courseId > 2147483647) {
    return res.status(400).json({ error: 'Provide valid studentId and courseId' });
  }

  const transaction = new sql.Transaction(pool);
  await transaction.begin();
  try {
    // Lock the course until commit so concurrent requests cannot take the same last seat.
    const request = new sql.Request(transaction);
    request.input('studentId', sql.Int, studentId);
    request.input('courseId', sql.Int, courseId);
    const course = await request.query(
      'SELECT capacity FROM Courses WITH (UPDLOCK, HOLDLOCK) WHERE course_id = @courseId'
    );
    const student = await request.query('SELECT student_id FROM Students WHERE student_id = @studentId');
    if (!course.recordset.length || !student.recordset.length) {
      await transaction.rollback();
      return res.status(404).json({ error: 'Student or course not found' });
    }
    const duplicate = await request.query(
      'SELECT enrollment_id FROM Enrollments WHERE student_id = @studentId AND course_id = @courseId'
    );
    if (duplicate.recordset.length) {
      await transaction.rollback();
      return res.status(409).json({ error: 'Already enrolled' });
    }
    const seats = await request.query('SELECT COUNT(*) AS used_seats FROM Enrollments WHERE course_id = @courseId');
    if (seats.recordset[0].used_seats >= course.recordset[0].capacity) {
      await transaction.rollback();
      return res.status(409).json({ error: 'Course is full' });
    }
    const result = await request.query(`
      INSERT INTO Enrollments (student_id, course_id)
      OUTPUT INSERTED.enrollment_id
      VALUES (@studentId, @courseId)`);
    await transaction.commit();
    res.status(201).json({ enrollmentId: result.recordset[0].enrollment_id, message: 'Enrolled successfully' });
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
});

app.delete('/enrollments/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1 || id > 2147483647) return res.status(400).json({ error: 'Invalid enrollment ID' });
  const result = await pool.request().input('id', sql.Int, id)
    .query('DELETE FROM Enrollments WHERE enrollment_id = @id');
  if (!result.rowsAffected[0]) return res.status(404).json({ error: 'Enrollment not found' });
  res.json({ message: 'Enrollment cancelled' });
});

app.get('/students/:id/courses', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1 || id > 2147483647) return res.status(400).json({ error: 'Invalid student ID' });
  const request = pool.request().input('id', sql.Int, id);
  const student = await request.query('SELECT student_id FROM Students WHERE student_id = @id');
  if (!student.recordset.length) return res.status(404).json({ error: 'Student not found' });
  const result = await request.query(`
    SELECT e.enrollment_id, c.course_id, c.course_name
    FROM Enrollments e JOIN Courses c ON e.course_id = c.course_id
    WHERE e.student_id = @id ORDER BY c.course_id`);
  res.json(result.recordset);
});

app.use((req, res) => res.status(404).json({ error: 'Endpoint not found' }));
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON' });
  console.error(err.message);
  res.status(500).json({ error: 'Database or server error' });
});

async function start() {
  pool = await sql.connect({
    server: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 1433),
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'm3_courses',
    options: {
      encrypt: process.env.DB_ENCRYPT !== 'false',
      trustServerCertificate: process.env.DB_TRUST_CERT === 'true'
    }
  });
  app.listen(process.env.PORT || 3001, () => console.log('Course API running on port ' + (process.env.PORT || 3001)));
}
start().catch(err => { console.error(err.message); process.exitCode = 1; });
