require("dotenv").config();
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");
const routerEmployees = require("./route/employee");
const routerEquipments = require("./route/equipment"); 

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/employees", routerEmployees);
app.use("/api/equipments", routerEquipments);

// Create a new page where we can search for employees by name. Create one input field with a label “Employee Name”. When the user types into this field you need to list the employees with a name starts with the input field value.

// Display the employee name and level and position and a button with text: Similar Employees. 

// When the user clicks on the similar button, you need to update the list with the employees has same level and position as the selected one.

app.get("/employees/sort", async (req, res) => {
  const sortOption = req.query.sortOption;
  const sortFlow = req.query.sortFlow;

  const sortedEmployees = await EmployeeModel.find().sort({[sortOption]: sortFlow})

  return res.json(sortedEmployees);
});

app.get("/search/empolyees", async (req, res) => {
  const searchName = req.query.searchName;

  const employees = await EmployeeModel.find({ "name": new RegExp("^" + searchName, "i") });

  return res.json(employees);
});

app.get("/search/similar/employees", async (req, res) => {
  const level = req.query.level;
  const position = req.query.position;

  console.log(level, position);
  const employees = await EmployeeModel.find({ 
    $and: [
      {
        position: position
      },
      {
        level: level
      }
    ]
   });

  return res.json(employees);
})

app.get("/employees/:search", async (req, res) => {
  const searchName = req.params.search;

  const foundEmployees = await EmployeeModel.find({ "name": new RegExp("^" + searchName, "i") });
  res.json(foundEmployees);
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
