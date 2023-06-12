DROP DATABASE IF EXISTS departments_db;
CREATE DATABASE departments_db;
USE departments_db;

CREATE TABLE departements (
    departement_name VARCHAR (50) NOT NULL PRIMARY KEY,
);

CREATE TABLE roles ( 
    id INT NOT NULL AUTO_INCREMENT ,
    name VARCHAR NOT NULL PRIMARY KEY,
    departement_name VARCHAR(50),
    roles TEXT NOT NULL,
    FOREIGN KEY (departement_name)
    REFERENCES departements(name)
)