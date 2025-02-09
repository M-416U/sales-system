import { Request, Response } from "express";
import InvoiceService from "../services/InvoiceService";

export default class InvoiceController {
  // إنشاء فاتورة جديدة
  static async createInvoice(req: Request, res: Response) {
    try {
      const invoiceData = req.body;
      const createdInvoice = await InvoiceService.createInvoice(invoiceData);
      res.status(201).json(createdInvoice);
    } catch (error) {
      res.status(500).json({ message: "Error creating invoice", error });
    }
  }

  // الحصول على جميع الفواتير
  static async getInvoices(req: Request, res: Response) {
    try {
      const invoices = await InvoiceService.getInvoices();
      res.json(invoices);
    } catch (error) {
      res.status(500).json({ message: "Error fetching invoices", error });
    }
  }

  // الحصول على فاتورة بواسطة ID
  static async getInvoiceById(req: Request, res: Response) {
    try {
      const invoiceID = parseInt(req.params.id);
      const invoice = await InvoiceService.getInvoiceById(invoiceID);
      if (invoice) {
        res.json(invoice);
      } else {
        res.status(404).json({ message: "Invoice not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching invoice", error });
    }
  }

  // تحديث فاتورة
  static async updateInvoice(req: Request, res: Response) {
    try {
      const invoiceID = parseInt(req.params.id);
      const updatedInvoice = req.body;
      const invoice = await InvoiceService.updateInvoice(
        invoiceID,
        updatedInvoice
      );
      if (invoice) {
        res.json(invoice);
      } else {
        res.status(404).json({ message: "Invoice not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating invoice", error });
    }
  }

  // حذف فاتورة
  static async deleteInvoice(req: Request, res: Response) {
    try {
      const invoiceID = parseInt(req.params.id);
      await InvoiceService.deleteInvoice(invoiceID);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting invoice", error });
    }
  }
}
