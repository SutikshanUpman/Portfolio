CREATE DATABASE m3_courses;
GO
USE m3_courses;
GO

CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE Courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    capacity INT NOT NULL CHECK (capacity > 0)
);

CREATE TABLE Enrollments (
    enrollment_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL REFERENCES Students(student_id),
    course_id INT NOT NULL REFERENCES Courses(course_id),
    UNIQUE (student_id, course_id)
);

INSERT INTO Students VALUES
(1, 'Asha', 'asha@example.com'),
(2, 'Ravi', 'ravi@example.com'),
(3, 'Neha', 'neha@example.com');

INSERT INTO Courses VALUES
(1, 'Web Development', 2),
(2, 'Database Management', 1);
