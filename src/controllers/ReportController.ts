import { Request, Response } from "express";
import ReportService from "../services/ReportService";

export default class ReportController {
  // تقرير المبيعات
  static async getSalesReport(req: Request, res: Response) {
    try {
      const salesReport = await ReportService.getSalesReport();
      res.json(salesReport);
    } catch (error) {
      res.status(500).json({ message: "Error fetching sales report", error });
    }
  }

  // تقرير المخزون
  static async getInventoryReport(req: Request, res: Response) {
    try {
      const inventoryReport = await ReportService.getInventoryReport();
      res.json(inventoryReport);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching inventory report", error });
    }
  }
}
