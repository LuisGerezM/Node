CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE employees(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT(5) DEFAULT NULL,
    PRIMARY KEY (id)
)

DESC employees;

INSERT INTO employees VALUES
    (1, 'Joe', 1000),
    (2, 'luis', 2000),
    (3, 'fer', 3000),
    (4, 'mili', 4000),
    (5, 'Jose', 5000);

SELECT * FROM employees;
SELECT * FROM employees WHERE id = 100;

DELETE FROM employees;

DELETE FROM employees WHERE id = num_id;




