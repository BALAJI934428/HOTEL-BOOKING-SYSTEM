import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} from "../controllers/userController.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

//UPDATE
router.put("/:id", verifyToken, (req, res, next) => {
  if (!req.body) {
    return next(createError(400, "No data provided"));
  }
  updateUser(req, res, next);
});
router.put("/:id", verifyToken, updateUser);
//DELETE
router.delete("/:id", verifyToken, verifyAdmin, (req, res, next) => {
  if (!req.params.id) {
    return next(createError(400, "No id provided"));
  }
  deleteUser(req, res, next);
});
//GET
router.get("/:id", verifyToken, (req, res, next) => {
  if (!req.params.id) {
    return next(createError(400, "No id provided"));
  }
  getUser(req, res, next);
});
router.get("/:id", verifyToken, getUser);
//GETALL
router.get("/", verifyToken, verifyAdmin, (req, res, next) => {
  getAllUsers(req, res, next);
});
router.get("/", verifyToken, verifyAdmin, getAllUsers);

export default router;
