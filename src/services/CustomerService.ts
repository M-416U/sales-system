import prisma from "../lib/prisma";
import { ICustomer } from "../models/Customer";

export default class CustomerService {
  // إنشاء عميل جديد
  static async createCustomer(customer: ICustomer): Promise<ICustomer> {
    return await prisma.customer.create({
      data: customer,
    });
  }

  // الحصول على جميع العملاء
  static async getCustomers(): Promise<ICustomer[]> {
    return await prisma.customer.findMany();
  }

  // الحصول على عميل بواسطة ID
  static async getCustomerById(customerID: number): Promise<ICustomer | null> {
    return await prisma.customer.findUnique({
      where: { CustomerID: customerID },
    });
  }

  // تحديث عميل
  static async updateCustomer(
    customerID: number,
    updatedCustomer: ICustomer
  ): Promise<ICustomer | null> {
    return await prisma.customer.update({
      where: { CustomerID: customerID },
      data: updatedCustomer,
    });
  }

  // حذف عميل
  static async deleteCustomer(customerID: number): Promise<boolean> {
    const deletedCustomer = await prisma.customer.delete({
      where: { CustomerID: customerID },
    });
    return !!deletedCustomer;
  }
}
