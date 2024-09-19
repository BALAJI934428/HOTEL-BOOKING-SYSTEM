import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
} from "../controllers/roomController.js";
import express from "express";
import { verifyToken, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
router.post("/:hotelId", verifyToken, verifyAdmin, createRoom);
router.put("/:id", verifyToken, verifyAdmin, updateRoom);
router.delete("/:id/:hotelId", verifyToken, verifyAdmin, deleteRoom);
router.get("/:id", getRoom);
router.get("/", getAllRooms);

export default router;
