import express from "express";
import { authenticate, authorize } from "../middleware/auth";
import CategoryController from "../controllers/CategoryController";

const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully
 */
router.post("/", 
  authenticate, 
  authorize(["ADMIN", "MANAGER"]), 
  CategoryController.createCategory
);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get("/", 
  authenticate, 
  authorize(["ADMIN", "MANAGER", "SALES", "EMPLOYEE"]), 
  CategoryController.getAllCategories
);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         description: Category not found
 */
router.get("/:id", 
  authenticate, 
  authorize(["ADMIN", "MANAGER", "SALES", "EMPLOYEE"]), 
  CategoryController.getCategoryById
);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */
router.put("/:id", 
  authenticate, 
  authorize(["ADMIN", "MANAGER"]), 
  CategoryController.updateCategory
);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete("/:id", 
  authenticate, 
  authorize(["ADMIN"]), 
  CategoryController.deleteCategory
);

export default router;
