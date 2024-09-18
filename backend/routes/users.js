import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();
router.get("/checkToken", verifyToken, getAllUsers);

//UPDATE
router.put("/:id", updateUser);
//DELETE
router.delete("/:id", deleteUser);
//GET
router.get("/:id", getUser);
//GETALL
router.get("/", getAllUsers);

export default router;
