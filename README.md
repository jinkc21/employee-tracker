# Employee Tracker

## Description

Within a large company, keeping track of employees can be very difficult. There is a lot of information being stored for each employee such as departments and roles. This employee tracker will make is easier to manage employees by creating a simple database using basic inputs.

## Table of Contents (Optional)

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

To install, follow the steps below:

Download or clone the repository from https://github.com/jinkc21/employee-tracker.git to VS Code.
Download mysql2 by typing "npm i mysql2" in the integrated terminal (mysql account is required).
Download inquirer by typing "npm i inquirer@8.2.4" in the integrated terminal.
Download console.table by typing "npm i console.table" in the integrated terminal.
Run mysql by typing "mysql -u root -p" in the integrated terminal, then type the password for mysql.
Add schema to database by typing "source db/schema.sql" in the integrated terminal.
Add seeds to database by typing "source db/seeds.sql" in the integrated terminal.
(custom schema and seeds can be used for user's own employee database)
Quit mysql by typing "quit" in the integrated terminal.

Start the program by typing "npm start" in the integrated terminal and follow the prompts.

## Usage

This program allows users to do the following:
View All Employees,
Add Employee,
View Employees By Manager,
Update Employee Managers,
View All Roles,
Update Employee Role,
Add Role,
View All Departments,
View Employees By Department,
Add Department,
Delete Employee,
Delete Role,
Delete Department

For a tutorial on how to use the employee tracker, watch the video below:
https://drive.google.com/file/d/1mxPWj_KMJtRxUPPNf0nqfz4yVT5pNtuZ/view

## Credits

MySQL documentation helped with data manipulation statement.
https://dev.mysql.com/doc/refman/8.0/en/sql-data-manipulation-statements.html

Inquirer was used to create prompts for the employee tracker.
https://www.npmjs.com/package/inquirer/v/8.2.4 

MySQL2 was used to connect the database for the queries.
https://www.npmjs.com/package/mysql2 

Console.table was used to create tables.
https://www.npmjs.com/package/console.table

Sample video was used as a guideline and for data used.
https://2u-20.wistia.com/medias/2lnle7xnpk


## License

MIT License

Copyright (c) 2024 jinkc21

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---
