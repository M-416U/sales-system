import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class InvoiceService {
  // إنشاء فاتورة جديدة
  static async createInvoice(invoiceData: any) {
    return await prisma.invoice.create({
      data: invoiceData,
    });
  }

  // الحصول على جميع الفواتير
  static async getInvoices() {
    return await prisma.invoice.findMany({
      include: { InvoiceDetails: true },
    });
  }

  // الحصول على فاتورة بواسطة ID
  static async getInvoiceById(invoiceID: number) {
    return await prisma.invoice.findUnique({
      where: { InvoiceID: invoiceID },
      include: { InvoiceDetails: true },
    });
  }

  // تحديث فاتورة
  static async updateInvoice(invoiceID: number, updatedInvoice: any) {
    return await prisma.invoice.update({
      where: { InvoiceID: invoiceID },
      data: updatedInvoice,
    });
  }

  // حذف فاتورة
  static async deleteInvoice(invoiceID: number) {
    return await prisma.invoice.delete({
      where: { InvoiceID: invoiceID },
    });
  }
}
