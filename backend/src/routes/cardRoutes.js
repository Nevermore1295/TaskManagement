import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
  createCard,
  getCardsByList,
  updateCard,
  deleteCard,
  moveCard,
} from "../controllers/cardController.js";

const router = express.Router();

// Card Routes (Nằm trong List)
router.post("/:list_id/cards", authenticateToken, createCard);
router.get("/:list_id/cards", authenticateToken, getCardsByList);
router.put("/cards/:id", authenticateToken, updateCard);
router.delete("/cards/:id", authenticateToken, deleteCard);
router.put("/cards/:cardId/move", authenticateToken, moveCard);

export default router;
