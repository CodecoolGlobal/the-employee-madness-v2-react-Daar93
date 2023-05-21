const express = require("express");
const router = express.Router();
const EquipmentModel = require("../db/equipment.model");

router.get("/", async (req ,res) => {
    try {
        const equipments = await EquipmentModel.find();
        return res.json(equipments);
    } catch (err) {
        return next(err);
    }
});

router.post("/", async (req, res) => {
    const equipment = req.body;

    try {
        const saved = await EquipmentModel.create(equipment);
        return res.json(saved);
    } catch (err) {
        return next(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const equipment = await EquipmentModel.findById(req.params.id);
        return res.json(equipment);
    } catch (err) {
        return next(err);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const equipment = await EquipmentModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { ...req.body } },
        { new: true }
        );
        return res.json(equipment);
    } catch (err) {
        return next(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const equipment = await EquipmentModel.findById(req.params.id);
        const deleted = await equipment.delete();
        return res.json(deleted);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;