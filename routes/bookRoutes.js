import express from "express";
const router = express.Router();

import { createBook, getBookById, getAllBooks, updateBook, deleteBook } from "../controllers/bookController.js";
import authBook from "../middleware/authMiddleware.js";

router.get("/",getAllBooks)
router.get("/:id",getBookById);

router.post("/",authBook,createBook);
router.put("/:id", authBook, updateBook);
router.delete("/:id", authBook, deleteBook);

export default router;