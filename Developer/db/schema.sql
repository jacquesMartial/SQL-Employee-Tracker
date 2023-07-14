DROP DATABASE IF EXISTS departments_db;
CREATE DATABASE departments_db;
USE departments_db;

CREATE TABLE departments (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR (50) NOT NULL
);

CREATE TABLE roles ( 
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    department_id INT NOT NULL,
    salary DECIMAL NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
);

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles (id),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee (id)
);