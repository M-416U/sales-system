import express from "express";
import ReportController from "../controllers/ReportController";
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();

// تقرير المبيعات
router.get("/sales", 
  authenticate, 
  authorize(["ADMIN", "MANAGER"]), 
  ReportController.getSalesReport
);

// تقرير المخزون
router.get("/inventory", 
  authenticate, 
  authorize(["ADMIN", "MANAGER"]), 
  ReportController.getInventoryReport
);

export default router;
