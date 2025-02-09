import { Request, Response } from "express";
import CustomerService from "../services/CustomerService";
import { ICustomer } from "../models/Customer";

export default class CustomerController {
  // إنشاء عميل جديد
  static async createCustomer(req: Request, res: Response) {
    try {
      const newCustomer: ICustomer = req.body;
      const createdCustomer = await CustomerService.createCustomer(newCustomer);
      res.status(201).json(createdCustomer);
    } catch (error) {
      res.status(500).json({ message: "Error creating customer", error });
    }
  }

  // الحصول على جميع العملاء
  static async getCustomers(req: Request, res: Response) {
    try {
      const customers = await CustomerService.getCustomers();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ message: "Error fetching customers", error });
    }
  }

  // الحصول على عميل بواسطة ID
  static async getCustomerById(req: Request, res: Response) {
    try {
      const customerID = parseInt(req.params.id);
      const customer = await CustomerService.getCustomerById(customerID);
      if (customer) {
        res.json(customer);
      } else {
        res.status(404).json({ message: "Customer not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching customer", error });
    }
  }

  // تحديث عميل
  static async updateCustomer(req: Request, res: Response) {
    try {
      const customerID = parseInt(req.params.id);
      const updatedCustomer: ICustomer = req.body;
      const customer = await CustomerService.updateCustomer(
        customerID,
        updatedCustomer
      );
      if (customer) {
        res.json(customer);
      } else {
        res.status(404).json({ message: "Customer not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating customer", error });
    }
  }

  // حذف عميل
  static async deleteCustomer(req: Request, res: Response) {
    try {
      const customerID = parseInt(req.params.id);
      const isDeleted = await CustomerService.deleteCustomer(customerID);
      if (isDeleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Customer not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting customer", error });
    }
  }
}
