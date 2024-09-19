import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
} from "../controllers/roomController.js";

connect();
router.post("/", createRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);
router.get("/:id", getRoom);
router.get("/", getAllRooms);

export default router;
