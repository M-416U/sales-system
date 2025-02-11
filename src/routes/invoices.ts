import express from "express";
import InvoiceController from "../controllers/InvoiceController";
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();

// إنشاء فاتورة جديدة
router.post("/", 
  authenticate, 
  authorize(["ADMIN", "MANAGER", "SALES"]), 
  InvoiceController.createInvoice
);

// الحصول على جميع الفواتير
router.get("/", 
  authenticate, 
  authorize(["ADMIN", "MANAGER", "SALES", "EMPLOYEE"]), 
  InvoiceController.getInvoices
);

// الحصول على فاتورة بواسطة ID
router.get("/:id", 
  authenticate, 
  authorize(["ADMIN", "MANAGER", "SALES", "EMPLOYEE"]), 
  InvoiceController.getInvoiceById
);

// تحديث فاتورة
router.put("/:id", 
  authenticate, 
  authorize(["ADMIN", "MANAGER", "SALES"]), 
  InvoiceController.updateInvoice
);

// حذف فاتورة
router.delete("/:id", 
  authenticate, 
  authorize(["ADMIN", "MANAGER"]), 
  InvoiceController.deleteInvoice
);

export default router;
