


INSERT INTO departments (department_name)
VALUES ("sales"),
("legal"),
("engineering"),
("finance"),

INSERT INTO roles (title,department_id,salary)
VALUES ("sales lead",1,150000),
("sales person",1,120000),
("legal team lead",2,120000),
("lawyer",2,115000),
("software engineer",3,75000),
("lead engineer",3,95000),
("account manager",4,100000),
("accountant",4,55000),


INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("henri","boulgesh",1,NULL),
("travis","scott",7,NULL),
("madona","star",4,NULL),
("yvan","bossman",2,NULL);

