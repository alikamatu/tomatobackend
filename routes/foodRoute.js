import express from "express";
import multer from "multer";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import fs from "fs";

const foodRouter = express.Router();

// Image storage engine with validation
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "uploads";
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath); // Ensure 'uploads' directory exists
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// Routes
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.delete("/remove", removeFood);

export default foodRouter;
