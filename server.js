// Import and require mysql2 and inquirer
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

db.connect((err) => {
  if (err) throw err;
  // initializes prompts once connection is made
  console.log("MySql Connected");
  init();
});

// function to start initial prompt
function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "toDo",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "View Employees By Manager",
          "Update Employee Managers",
          "View All Roles",
          "Update Employee Role",
          "Add Role",
          "View All Departments",
          "View Employees By Department",
          "Add Department",
          "Delete Departments, Roles, and Employees",
          "Quit",
        ],
      },
    ])
    .then((res) => {
      // console.log(res.toDo);
      switch (res.toDo) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "View Employees By Manager":
          viewEmployeesByManager();
          break;
        case "Update Employee Managers":
          updateEmployeeManagers();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View Employees By Department":
          viewEmployeesByDepartment();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Delete Departments, Roles, and Employees":
          deleteDepartmentsRolesEmployees();
          break;
        case "Quit":
          db.end();
          break;
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
}
// view all employees
function viewAllEmployees() {
  let query = `SELECT 
      employee.id, 
      employee.first_name, 
      employee.last_name, 
      role.title, 
      department.name AS department, 
      role.salary,
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  LEFT JOIN role 
  ON employee.role_id = role.id
  LEFT JOIN department 
  ON department.id = role.department_id
  LEFT JOIN employee manager
  ON manager.id = employee.manager_id`;

  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}

// add employee
function addEmployee() {
  db.query("SELECT * FROM employee;", (err, res) => {
    if (err) throw err;
    // console.log("data: ", res);
    const managerChoices = res.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    db.query("SELECT * FROM role;", (err, res) => {
      if (err) throw err;
      const roleChoices = res.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the employees first name?",
            name: "addEmployeeFirst",
          },
          {
            type: "input",
            message: "What is the employee's last name?",
            name: "addEmployeeLast",
          },
          {
            type: "list",
            message: "What is the employee's role?",
            name: "addEmployeeRole",
            /*  choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer", 
        ], */
            choices: roleChoices,
          },
          {
            type: "list",
            message: "Who is the employee's manager?",
            name: "addEmployeeManager",
            /*  choices: [
          "John Doe",
          "Mike Chan",
          "Ashley Rodriguez",
          "Kevin Tupik",
          "Kunal Singh",
          "Malia Brown",
          "Sarah Lourd",
          "Tom Allen",
        ], */
            choices: managerChoices,
          },
        ])
        .then(function (answer) {
          // console.log("Answers: ", answer)
          db.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
            [
              answer.addEmployeeFirst,
              answer.addEmployeeLast,
              answer.addEmployeeRole,
              answer.addEmployeeManager,
            ],
            function (err, res) {
              if (err) throw err;
              console.table(res);
              init();
            }
          );
        });
    }); // end of role query
  }); // end of employee query
}

// View employee by manager.
function viewEmployeesByManager() {
  db.query("SELECT * FROM employee;", (err, res) => {
    if (err) throw err;
    const managerChoices = res.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    inquirer
      .prompt({
        type: "list",
        message: "Select a manager",
        name: "viewByManager",
        /*  choices: [
        "John Doe",
        "Mike Chan",
        "Ashley Rodriguez",
        "Kevin Tupik",
        "Kunal Singh",
        "Malia Brown",
        "Sarah Lourd",
        "Tom Allen",
      ], */
        choices: managerChoices,
      })
      .then(function (answer) {
        db.query(
          "Select id, first_name, last_name FROM employee where manager_id = ?;",
          [answer.viewByManager],
          function (err, res) {
            if (err) throw err;
            console.table(res);
            init();
          }
        );
      });
  });
}

// update employee manager
function updateEmployeeManagers() {
  db.query("SELECT * FROM employee;", (err, res) => {
    if (err) throw err;
    const employeeChoices = res.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
          inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee is updating the manager?",
            name: "employeeList",
            choices: employeeChoices
          },
          {
            type: "list",
            message: "Who is the employee's updated manager?",
            name: "managerList",
            choices: employeeChoices,
          },
        ])
        .then(function (answer) {
          db.query(
            `UPDATE employee SET manager_id = ? WHERE id = ?`,
            [answer.managerList, answer.employeeList],
            (err, res) => {
              if (err) throw err;
              console.table(res);
              init();
            }
          );
        });
    });
  }

// View roles
function viewAllRoles() {
  let query = `SELECT 
  role.id, 
  role.title, 
  department.name AS department, 
  role.salary
  FROM role
  LEFT JOIN department 
  ON role.department_id = department.id`;
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}

// TO DO: ****************************
// Update employee role. Not sure how to update




function addRole() {
  db.query("SELECT * FROM department;", (err, res) => {
    if (err) throw err;
    const departmentChoices = res.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new role?",
        name: "addRoleName",
      },
      {
        type: "input",
        message: "What is the salary of the new role? (numbers only)",
        name: "addRoleSalary",
      },
      {
        type: "list",
        message: "What is the department of the new role?",
        name: "addRoleDepartment",
        choices: departmentChoices,
      },
    ])
  
    .then(function (answer) {
      db.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [answer.addRoleName, answer.addRoleSalary, answer.addRoleDepartment],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          init();
        }
      );
    })
    });
}

function viewAllDepartments() {
  let query = `SELECT * FROM department`;
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}

// TO DO: ******************
// view employee by department. I understand the prompts, but not sure how to access specific department

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the new department?",
      name: "addDepartment",
    })
    .then(function (answer) {
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        [answer.addDepartment],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          init();
        }
      );
    });
}

// TODO: *******************
// Delete Departments, Roles, and Employees. I have an idea on the prompts, but not how to excecute.

// Default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
//   });

//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
