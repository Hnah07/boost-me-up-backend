import express, { RequestHandler } from "express";
import {
  createEntry,
  getUserEntries,
  getEntry,
  updateEntry,
  deleteEntry,
} from "../controllers/entryController";
import { isAuth } from "../middleware/authMiddleware";

const router = express.Router();

// Entry routes
router.post("/", createEntry as RequestHandler);
router.get("/", getUserEntries as RequestHandler);
router.get("/:id", getEntry as RequestHandler);
router.put("/:id", updateEntry as RequestHandler);
router.delete("/:id", deleteEntry as RequestHandler);

export default router;
