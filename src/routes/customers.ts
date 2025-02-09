import express from "express";
import CustomerController from "../controllers/CustomerController";

const router = express.Router();

// إنشاء عميل جديد
router.post("/", CustomerController.createCustomer);

// الحصول على جميع العملاء
router.get("/", CustomerController.getCustomers);

// الحصول على عميل بواسطة ID
router.get("/:id", CustomerController.getCustomerById);

// تحديث عميل
router.put("/:id", CustomerController.updateCustomer);

// حذف عميل
router.delete("/:id", CustomerController.deleteCustomer);

export default router;
