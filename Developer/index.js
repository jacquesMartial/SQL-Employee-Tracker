// Include packages needed for this application
const inquirer = require(`inquirer`);
const mysql = require("mysql2");
const fs = require(`fs`);

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "Junior2007#",
    database: "departments_db",
  },
  console.log(`Connected to the departments_db database.`)
);
const questions = [
  {
    type: "list",
    name: "options",
    message: "what would you like to do?",
    choices: [
      "view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee role",
      "exit",
    ],
  },
];

// Create a function to initialize app
async function init() {
  const answers = await inquirer.prompt(questions);
  // creating a function to accept the user answers and give response'
  if (answers.options === "view all departments") {
    viewAllDepartments();
  } else if (answers.options == "view all roles") {
    viewAllRoles();
  } else if (answers.options == "view all employees") {
    viewAllEmployees();
  } else if (answers.options == "add a department") {
    addDepartment();
  } else if (answers.options == "add a role") {
    addRole();
  } else if (answers.options == "add an employee") {
    addEmployee();
  } else if (answers.options == "update an employee role") {
    updateEmployeeRole();
  } else {
    db.end();
  }
}
// Function call to initialize app
init();

function viewAllDepartments() {
  db.query("SELECT * FROM departments", (err, data) => {
    console.table(data);
  });
  init();
}
function viewAllRoles() {
  db.query("SELECT * FROM roles", (err, data) => {
    console.table(data);
  });
  init();
}
function viewAllEmployees() {
  db.query("SELECT * FROM employee", (err, data) => {
    console.table(data);
  });
  init();
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the new department you want to add?",
      },
    ])
    .then((answer) => {
      db.query("INSERT INTO roles SET ?", {
        department_name: answer.departmentName,
      });
      addDepartment();
      viewAllDepartments();
      init();
    });
}
function addRole() {
  db.query("SELECT * FROM departments;", (err, data) => {
    const departmentChoices = data.map(({ id, department_name }) => ({
      name: department_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "roleTitle",
          message: "enter the role title",
        },
        {
          type: "input",
          name: "salaryAmount",
          message: "enter the salary amount",
        },
        {
          type: "list",
          name: "departmentName",
          message: "What is the new department you want to add?",
          choices: departmentChoices,
        },
      ])
      .then((answer) => {
        db.query(
          "INSERT INTO roles SET ?",
          {
            title: answer.roleTitle,
            salary: answer.salaryAmount,
            department_id: answer.departmentName,
          },
          (err, res) => {
            if (err) throw err;
            console.log("role added!");
            init();
          }
        );
      });
  });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "enter employee first name",
      },
      {
        type: "input",
        name: "lastName",
        message: "enter employee last name",
      },
      {
        type: "input",
        name: "roleTitle",
        message: "enter the role title",
      },
      {
        type: "input",
        name: "managerID",
        message: "enter the manager's name",
      },
    ])
    .then((answer) => {
      db.query("INSERT INTO employee SET ?", {
        first_name: answer.firstName,
        last_name: answer.lastName,
        title: answer.roleTitle,
        manager_id: answer.manager_id,
      });
      addEmployee();
      viewAllEmployees();
      init();
    });
}
async function updateEmployeeRole() {
  const [allEmployees] = await db.promise().query("SELECT * FROM employee");
  const employeeChoices = allEmployees.map(({ first_name, last_name, id }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));
  const [allRoles] = await db.promise().query("SELECT * FROM roles");
  const roleChoices = allRoles.map(({ title, id }) => ({
    name: title,
    value: id,
  }));
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee_id",
        message: "select an employee to add a role",
        choices: employeeChoices,
      },
      {
        type: "list",
        name: "role_id",
        message: "select role for employee",

        choices: roleChoices,
      },
    ])
    .then((answer) => {
      db.query(
        "UPDATE employee SET role_id = ? WHERE id = ? ",
        [answer.role_id, answer.employee_id],
        (err, res) => {
          if (err) throw err;
          console.log("employee role updated!");
          init();
        }
      );
    });
}
