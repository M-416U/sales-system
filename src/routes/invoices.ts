import express from "express";
import InvoiceController from "../controllers/InvoiceController";

const router = express.Router();

// إنشاء فاتورة جديدة
router.post("/", InvoiceController.createInvoice);

// الحصول على جميع الفواتير
router.get("/", InvoiceController.getInvoices);

// الحصول على فاتورة بواسطة ID
router.get("/:id", InvoiceController.getInvoiceById);

// تحديث فاتورة
router.put("/:id", InvoiceController.updateInvoice);

// حذف فاتورة
router.delete("/:id", InvoiceController.deleteInvoice);

export default router;
