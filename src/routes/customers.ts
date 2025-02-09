import express from "express";
import CustomerController from "../controllers/CustomerController";
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management
 */

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Customer created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Invalid input.
 */
router.post("/", authenticate, CustomerController.createCustomer);

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: A list of customers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */
router.get(
  "/",
  authenticate,
  authorize(["Admin"]),
  CustomerController.getCustomers
);

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the customer to retrieve.
 *     responses:
 *       200:
 *         description: Customer found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found.
 */
router.get("/:id", CustomerController.getCustomerById);

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Update a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the customer to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Customer updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found.
 *       400:
 *         description: Invalid input.
 */
router.put("/:id", CustomerController.updateCustomer);

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Delete a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the customer to delete.
 *     responses:
 *       204:
 *         description: Customer deleted successfully.
 *       404:
 *         description: Customer not found.
 */
router.delete("/:id", CustomerController.deleteCustomer);

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - FullName
 *         - Email
 *         - Phone
 *         - Address
 *         - RegistrationDate
 *         - SubscriptionStartDate
 *         - SubscriptionEndDate
 *         - PaymentMethod
 *         - AssignedEmployeeID
 *       properties:
 *         CustomerID:
 *           type: integer
 *           description: The auto-generated ID of the customer.
 *         FullName:
 *           type: string
 *           description: The full name of the customer.
 *         Email:
 *           type: string
 *           description: The email address of the customer.
 *         Phone:
 *           type: string
 *           description: The phone number of the customer.
 *         Address:
 *           type: string
 *           description: The address of the customer.
 *         RegistrationDate:
 *           type: string
 *           format: date
 *           description: The registration date of the customer.
 *         SubscriptionStartDate:
 *           type: string
 *           format: date
 *           description: The subscription start date of the customer.
 *         SubscriptionEndDate:
 *           type: string
 *           format: date
 *           description: The subscription end date of the customer.
 *         PaymentMethod:
 *           type: string
 *           description: The payment method of the customer.
 *         AssignedEmployeeID:
 *           type: integer
 *           description: The ID of the employee assigned to the customer.
 *         Notes:
 *           type: string
 *           description: Additional notes about the customer.
 *       example:
 *         CustomerID: 1
 *         FullName: John Doe
 *         Email: john.doe@example.com
 *         Phone: "1234567890"
 *         Address: 123 Main St
 *         RegistrationDate: "2023-10-01"
 *         SubscriptionStartDate: "2023-10-01"
 *         SubscriptionEndDate: "2024-10-01"
 *         PaymentMethod: "CreditCard"
 *         AssignedEmployeeID: 1
 *         Notes: "Regular customer"
 */

export default router;
