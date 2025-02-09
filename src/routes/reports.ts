import express from "express";
import ReportController from "../controllers/ReportController";

const router = express.Router();

// تقرير المبيعات
router.get("/sales", ReportController.getSalesReport);

// تقرير المخزون
router.get("/inventory", ReportController.getInventoryReport);

export default router;
