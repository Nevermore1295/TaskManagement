import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
  createList,
  getListsByBoard,
  updateList,
  deleteList,
} from "../controllers/listController.js";

const router = express.Router();

// List Routes (Nằm trong Board)
router.post("/:board_id/lists", authenticateToken, createList);
router.get("/:board_id/lists", authenticateToken, getListsByBoard);
router.put("/lists/:id", authenticateToken, updateList);
router.delete("/lists/:id", authenticateToken, deleteList);

export default router;
