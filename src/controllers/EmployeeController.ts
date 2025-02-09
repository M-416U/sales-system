import { Request, Response } from "express";
import EmployeeService from "../services/EmployeeService";
import { generateToken } from "../utils/auth";

export default class EmployeeController {
  // تسجيل موظف جديد
  static async createEmployee(req: Request, res: Response) {
    try {
      const employeeData = req.body;
      const createdEmployee = await EmployeeService.createEmployee(
        employeeData
      );
      res.status(201).json(createdEmployee);
    } catch (error) {
      res.status(500).json({ message: "Error creating employee", error });
    }
  }

  // تسجيل الدخول
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const employee = await EmployeeService.login(email, password);
      const token = generateToken(employee.EmployeeID, employee.Role);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ message: "Login failed", error });
    }
  }

  // الحصول على جميع الموظفين
  static async getEmployees(req: Request, res: Response) {
    try {
      const employees = await EmployeeService.getEmployees();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: "Error fetching employees", error });
    }
  }

  // الحصول على موظف بواسطة ID
  static async getEmployeeById(req: Request, res: Response) {
    try {
      const employeeID = parseInt(req.params.id);
      const employee = await EmployeeService.getEmployeeById(employeeID);
      if (employee) {
        res.json(employee);
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching employee", error });
    }
  }

  // تحديث موظف
  static async updateEmployee(req: Request, res: Response) {
    try {
      const employeeID = parseInt(req.params.id);
      const updatedEmployee = req.body;
      const employee = await EmployeeService.updateEmployee(
        employeeID,
        updatedEmployee
      );
      if (employee) {
        res.json(employee);
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating employee", error });
    }
  }

  // حذف موظف
  static async deleteEmployee(req: Request, res: Response) {
    try {
      const employeeID = parseInt(req.params.id);
      await EmployeeService.deleteEmployee(employeeID);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting employee", error });
    }
  }
}
