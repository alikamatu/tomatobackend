import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
    try {
        // Validate inputs
        if (!req.body.name || !req.body.price || !req.file) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.file.filename
        });

        await food.save();
        res.status(200).json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({ success: true, data: foods });
    } catch (error) {
        console.error("Error fetching food list:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Remove image file
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) console.error("Error deleting file:", err);
        });

        // Remove food record
        await foodModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "Food deleted successfully" });
    } catch (error) {
        console.error("Error deleting food:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { addFood, listFood, removeFood };
