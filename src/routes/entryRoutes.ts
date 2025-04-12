import { Router, RequestHandler } from "express";
import { isAuth } from "../middleware/authMiddleware";
import {
  createEntry,
  getUserEntries,
  getEntry,
  updateEntry,
  deleteEntry,
} from "../controllers/entryController";

const router = Router();

/**
 * @swagger
 * /api/entries:
 *   get:
 *     summary: Get all entries for the authenticated user
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [createdAt, updatedAt]
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of entries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Entry'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

/**
 * @swagger
 * /api/entries:
 *   post:
 *     summary: Create a new entry
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EntryInput'
 *     responses:
 *       201:
 *         description: Entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entry'
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

/**
 * @swagger
 * /api/entries/{id}:
 *   get:
 *     summary: Get a single entry by ID
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: Entry ID
 *     responses:
 *       200:
 *         description: Entry details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entry'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Entry not found
 */

/**
 * @swagger
 * /api/entries/{id}:
 *   put:
 *     summary: Update an entry
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: Entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EntryInput'
 *     responses:
 *       200:
 *         description: Entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entry'
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Entry not found
 */

/**
 * @swagger
 * /api/entries/{id}:
 *   delete:
 *     summary: Delete an entry
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: Entry ID
 *     responses:
 *       204:
 *         description: Entry deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Entry not found
 */

// Register routes
router.get("/", isAuth, getUserEntries as RequestHandler);
router.post("/", isAuth, createEntry as RequestHandler);
router.get("/:id", isAuth, getEntry as RequestHandler);
router.put("/:id", isAuth, updateEntry as RequestHandler);
router.delete("/:id", isAuth, deleteEntry as RequestHandler);

/**
 * @swagger
 * components:
 *   schemas:
 *     Entry:
 *       type: object
 *       required:
 *         - _id
 *         - content
 *         - user
 *         - isPrivate
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         _id:
 *           type: string
 *           format: objectId
 *           description: The entry ID
 *         content:
 *           type: string
 *           description: The entry content
 *         user:
 *           type: string
 *           format: objectId
 *           description: The user ID who created the entry
 *         isPrivate:
 *           type: boolean
 *           default: true
 *           description: Whether the entry is private
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Entry creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Entry last update timestamp
 *     EntryInput:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *           minLength: 1
 *           description: The entry content
 *         isPrivate:
 *           type: boolean
 *           default: true
 *           description: Whether the entry should be private
 */

export default router;
