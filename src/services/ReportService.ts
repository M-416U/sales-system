import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class ReportService {
  // تقارير المبيعات
  static async getSalesReport() {
    return await prisma.invoice.findMany({
      include: {
        Customer: true,
        InvoiceDetails: { include: { Product: true } },
      },
    });
  }

  // تقارير المخزون
  static async getInventoryReport() {
    return await prisma.product.findMany();
  }
}
