import express from "express";
import EmployeeController from "../controllers/EmployeeController";

const router = express.Router();

// تسجيل موظف جديد
router.post("/", EmployeeController.createEmployee);

// تسجيل الدخول
router.post("/login", EmployeeController.login);

// الحصول على جميع الموظفين
router.get("/", EmployeeController.getEmployees);

// الحصول على موظف بواسطة ID
router.get("/:id", EmployeeController.getEmployeeById);

// تحديث موظف
router.put("/:id", EmployeeController.updateEmployee);

// حذف موظف
router.delete("/:id", EmployeeController.deleteEmployee);

export default router;
