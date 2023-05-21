const express = require("express");
const router = express.Router();
const EmployeeModel = require("../db/employee.model");

// router.use((req, res, next) => {
//     console.log('Time: ', Date.now())
//     next()
// })

router.get("/", async (req, res) => {
    const employees = await EmployeeModel.find().sort({ created: "desc" });
    return res.json(employees);
});

router.get("/:id", async (req, res) => {
    const employee = await EmployeeModel.findById(req.params.id)
    return res.json(employee);
});


router.post("/", async (req, res) => {
    const employee = req.body;

    try {
        const saved = await EmployeeModel.create(employee);
        return res.json(saved);
    } catch (err) {
        return next(err);
    }
});

router.patch(":id", async (req, res) => {
    try{
        const employee = await EmployeeModel.findOneAndUpdate(
            { _id: req.params.id},
            { $set: { ...req.body } },
            { new: true }
        );
        return res.json(employee);
    } catch (err) {
        return next(err);
    }
});

router.delete(":id", async (req, res) => {
    try {
        const employee = await EmployeeModel.findById(req.params.id);
        const deleted = await employee.delete();
        return res.json(deleted);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;