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

app.get("/employees/sort", async (req, res) => {
  const sortOption = req.query.sortOption;
  const sortFlow = req.query.sortFlow;

  const sortedEmployees = await EmployeeModel.find().sort({[sortOption]: sortFlow})

  return res.json(sortedEmployees);
});

app.get("/employees/:search", async (req, res) => {
  const searchName = req.params.search;

  const foundEmployees = await EmployeeModel.find({ "name": new RegExp("^" + searchName, "i") });
  res.json(foundEmployees);
});

// Equipments

// app.get("/api/equipments", async (req, res) => {
//   try {
//     const equipments = await EquipmentModel.find();
//     return res.json(equipments);
//   } catch (err) {
//     return next(err);
//   }
// });

// app.get("/api/equipments/:id", async (req, res) => {
//   const equipment = await EquipmentModel.findById(req.params.id);
//   return res.json(equipment);
// });

// app.post("/api/equipments", async (req, res, next) => {
//   const equipment = req.body;

//   try {
//     const saved = await EquipmentModel.create(equipment);
//     return res.json(saved);
//   } catch (err) {
//     return next(err);
//   }
// });

// app.patch("/api/equipments/:id", async (req, res, next) => {
//   try {
//     const equipment = await EquipmentModel.findOneAndUpdate(
//       { _id: req.params.id },
//       { $set: { ...req.body } },
//       { new: true }
//     );
//     return res.json(equipment);
//   } catch (err) {
//     return next(err);
//   }
// });

// app.delete("/api/equipments/:id", async (req, res, next) => {
//   try {
//     const equipment = await EquipmentModel.findById(req.params.id);
//     const deleted = await equipment.delete();
//     return res.json(deleted);
//   } catch (err) {
//     return next(err);
//   }
// });

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
