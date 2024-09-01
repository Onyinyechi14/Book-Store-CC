import express from "express";
import { getBook, createBook, updateBook } from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBook);
router.post("/", createBook);
router.put('/:id', updateBook);

export default router;