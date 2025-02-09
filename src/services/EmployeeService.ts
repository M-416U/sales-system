import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword } from "../utils/auth";
import { IEmployee } from "../models/Employee";

const prisma = new PrismaClient();

export default class EmployeeService {
  // تسجيل موظف جديد
  static async createEmployee(employeeData: IEmployee) {
    const { Password, ...rest } = employeeData;
    const hashedPassword = await hashPassword(Password);
    return await prisma.employee.create({
      data: { ...rest, PasswordHash: hashedPassword },
    });
  }

  // تسجيل الدخول
  static async login(email: string, password: string) {
    const employee = await prisma.employee.findUnique({
      where: { Email: email },
    });
    if (!employee) throw new Error("Employee not found");

    const isPasswordValid = await comparePassword(
      password,
      employee.PasswordHash
    );
    if (!isPasswordValid) throw new Error("Invalid password");

    return employee;
  }

  // الحصول على جميع الموظفين
  static async getEmployees() {
    return await prisma.employee.findMany();
  }

  // الحصول على موظف بواسطة ID
  static async getEmployeeById(employeeID: number) {
    return await prisma.employee.findUnique({
      where: { EmployeeID: employeeID },
    });
  }

  // تحديث موظف
  static async updateEmployee(employeeID: number, updatedEmployee: any) {
    return await prisma.employee.update({
      where: { EmployeeID: employeeID },
      data: updatedEmployee,
    });
  }

  // حذف موظف
  static async deleteEmployee(employeeID: number) {
    return await prisma.employee.delete({ where: { EmployeeID: employeeID } });
  }
}
