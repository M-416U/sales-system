import express from "express";
import { authenticate, authorize } from "../middleware/auth";
import SettingsController from "../controllers/SettingsController";

const router = express.Router();

/**
 * @swagger
 * /api/settings:
 *   get:
 *     summary: Get system settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: System settings retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/", 
  authenticate, 
  authorize(["ADMIN", "MANAGER"]), 
  SettingsController.getSettings
);

/**
 * @swagger
 * /api/settings:
 *   put:
 *     summary: Update system settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               companyAddress:
 *                 type: string
 *               companyPhone:
 *                 type: string
 *               companyEmail:
 *                 type: string
 *               taxRate:
 *                 type: number
 *               currency:
 *                 type: string
 *               lowStockThreshold:
 *                 type: number
 *               invoicePrefix:
 *                 type: string
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put("/", 
  authenticate, 
  authorize(["ADMIN"]), 
  SettingsController.updateSettings
);

/**
 * @swagger
 * /api/settings/backup:
 *   get:
 *     summary: Create system backup
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Backup created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 backupPath:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/backup", 
  authenticate, 
  authorize(["ADMIN"]), 
  SettingsController.createBackup
);

/**
 * @swagger
 * /api/settings/restore:
 *   post:
 *     summary: Restore system from backup
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               backupFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: System restored successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       400:
 *         description: Invalid backup file
 */
router.post("/restore", 
  authenticate, 
  authorize(["ADMIN"]), 
  SettingsController.restoreFromBackup
);

export default router;
