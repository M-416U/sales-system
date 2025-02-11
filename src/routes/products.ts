import express from "express";
import { authenticate, authorize } from "../middleware/auth";
import ProductController from "../controllers/ProductController";

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post("/", 
  authenticate, 
  authorize(["ADMIN", "MANAGER"]), 
  ProductController.createProduct
);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *     responses:
 *       200:
 *         description: List of products
 *       401:
 *         description: Unauthorized
 */
router.get("/", 
  authenticate, 
  authorize(["ADMIN", "MANAGER", "SALES", "EMPLOYEE"]), 
  ProductController.getAllProducts
);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
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
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get("/:id", 
  authenticate, 
  authorize(["ADMIN", "MANAGER", "SALES", "EMPLOYEE"]), 
  ProductController.getProductById
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Products]
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
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.put("/:id", 
  authenticate, 
  authorize(["ADMIN", "MANAGER"]), 
  ProductController.updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
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
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/:id", 
  authenticate, 
  authorize(["ADMIN"]), 
  ProductController.deleteProduct
);

/**
 * @swagger
 * /api/products/{id}/stock:
 *   put:
 *     summary: Update product stock
 *     tags: [Products]
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
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Stock updated successfully
 *       404:
 *         description: Product not found
 */
router.put("/:id/stock", 
  authenticate, 
  authorize(["ADMIN", "MANAGER"]), 
  ProductController.updateStock
);

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: Search results
 */
router.get("/search", 
  authenticate, 
  authorize(["ADMIN", "MANAGER", "SALES", "EMPLOYEE"]), 
  ProductController.searchProducts
);

/**
 * @swagger
 * /api/products/low-stock:
 *   get:
 *     summary: Get low stock products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of low stock products
 */
router.get("/low-stock", 
  authenticate, 
  authorize(["ADMIN", "MANAGER"]), 
  ProductController.getLowStockProducts
);

export default router;
