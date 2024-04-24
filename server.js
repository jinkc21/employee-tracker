// Import and require mysql2 and inquirer
const mysql = require('mysql2');
const inquirer = require("inquirer");
require("console.table");

const PORT = process.env.PORT || 3001;


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employees_db'
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
function init(){
  inquirer.prompt([
  {
    type: 'list',
    name:'toDo',
    message: 'What would you like to do?',
    choices: [
    'View All Employees',
    'Add Employee',
    'View Employees By Manager',
    'Update Employee Managers',
    'View All Roles',
    'Update Employee Role',
    'Add Role',
    'View All Departments',
    'View Employees By Department',
    'Add Department',
    'Delete Departments, Roles, and Employees',
    'Quit'
    ]
  }
  ])
  .then((res)=>{
    console.log(res.userChoice);
    switch(res.userChoice){
      case 'View All Employees':
        viewAllEmployees();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'View Employees By Manager':
        viewEmployeesByManager();
        break;
      case 'Update Employee Managers':
        updateEmployeeManagers();
        break;
      case 'View All Roles':
        viewAllRoles();
        break;        
      case 'Update Employee Role':
        updateEmployeeRole();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'View All Departments':
        viewAllDepartments();
        break;
      case 'View Employees By Department':
        viewEmployeesByDepartment();
        break;
      case 'Add Department':
        addDepartment();
        break;
      case 'Delete Departments, Roles, and Employees':
        deleteDepartmentsRolesEmployees();
        break;  
      case 'Quit':
        connection.end();
        break;
      }
      
    }).catch((err)=>{
  if(err)throw err;
  });
}



// Default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
//   });
  
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
  