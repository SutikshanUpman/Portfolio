# TPDS Module 3 and Module 4 practicals

Sutikshan Upman

## Requirements

Use Node.js 22 or later, MySQL 8, and Microsoft SQL Server. Docker is needed for the container practical. Each Node application has its own package-lock.json. Run commands inside the named application folder.

## M3 Practical 1 ? Student Management API

1. Run `M3_P1_Student_API/database.sql` in MySQL.
2. Open the `M3_P1_Student_API` folder in a terminal.
3. Run `npm ci`.
4. Copy `.env.example` to `.env` and enter your MySQL connection details.
5. Run `npm start`. The API uses port 3000.
6. Import `Postman.json` into Postman and run the collection in order.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | /students | List students |
| GET | /students/:id | View one student |
| GET | /students?department=CSE | Search by department |
| POST | /students | Add a student |
| PUT | /students/:id | Update all student fields |
| DELETE | /students/:id | Delete a student |

POST and PUT accept the following JSON.

```json
{"name":"Asha","email":"asha@example.com","department":"CSE","semester":5,"cgpa":8.7}
```

The student ID is generated automatically. All five input fields are required. Email is unique. Semester is 1?8 and CGPA is 0?10. Responses use 200, 201, 400, 404, 409, and 500 as appropriate.

## M3 Practical 2 ? Course Enrollment API

1. Run `M3_P2_Course_Enrollment/database.sql` in SQL Server Management Studio or sqlcmd. It creates the database, relationships, three sample students, and two courses.
2. Enable TCP/IP for your SQL Server instance and use its configured port.
3. Open `M3_P2_Course_Enrollment` in a terminal and run `npm ci`.
4. Copy `.env.example` to `.env` and enter your SQL Server login and port.
5. Run `npm start`. The default API port is 3001.
6. Import `Postman.json` into Postman. Run it in order against the initial sample data.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | /courses | Courses and remaining seats |
| POST | /enrollments | Enroll with studentId and courseId |
| DELETE | /enrollments/:id | Cancel by enrollment ID |
| GET | /students/:id/courses | View a student's enrolled courses |

Enrollment request body follows this format.

```json
{"studentId":1,"courseId":1}
```

The enrollment transaction locks the course row while checking duplicates and capacity and inserting the enrollment. Foreign keys and a unique student/course constraint maintain relationships. Course listings and student course listings use SQL joins. Cancellation makes the seat available again.

## M4 Practical 1 ? Portfolio and Git

The portfolio uses the supplied r?sum?, HTML, CSS, locally included Bootstrap 5, and JavaScript. It contains Home, About, Skills, Projects, and Contact sections. Open `M4_P1_Portfolio/index.html` in a browser, or serve it with a local HTTP server.

The local repository contains an initial commit, a `feature/contact` branch, a feature commit, and a merge into `main`. The output folder includes the actual Git transcript and a Git bundle preserving history.

Restore the repository from the supplied history bundle with the following command from the extracted M3_M4 folder.

```sh
git clone outputs/M4_P1_history.bundle restored-practicals
```

GitHub repository creation, a GitHub pull request, remote GitHub push/pull, and GitHub Pages deployment have status pending under the local-only delivery instruction. Local push, clone, and pull are demonstrated using a local bare repository.

## M4 Practical 2 ? Student Task Manager

1. Open `M4_P2_Task_Manager` in a terminal.
2. Run `npm ci` followed by `npm start`.
3. Open `http://localhost:3002`.
4. Add, view, edit, complete, and delete tasks through the page.

The API provides GET and POST `/tasks`, plus PUT and DELETE `/tasks/:id`. Data is saved to `data/tasks.json`. Synchronous file updates prevent overlapping requests from losing changes within the single Node process. Writes use a temporary file and rename.

Build and run the Docker application from its folder.

```sh
docker build -t student-tasks .
docker run -d --name student-tasks -p 3002:3000 -v student-tasks-data:/app/data student-tasks
```

Open `http://localhost:3002`. The named volume retains tasks across container replacement when reused. Stop the local Node server before mapping Docker to the same port.

For a Docker-compatible cloud service, deploy this folder using its Dockerfile, set PORT to the platform's assigned port, and attach persistent storage at `/app/data`. GitHub push and cloud deployment have status pending under the local-only instruction.

## Output results

Read `outputs/RESULTS.md` first. The text and JSON reports contain actual local results. SQL Server and Docker execution have status unverified because the local SQL Server service is unavailable and Docker's WSL virtualization backend cannot start.

Postman collections can also be executed with the Newman CLI.

```sh
npx newman@6.2.1 run M3_P1_Student_API/Postman.json
npx newman@6.2.1 run M3_P2_Course_Enrollment/Postman.json
```
