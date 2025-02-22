import express from "express";
import EmployeeController from "../controllers/EmployeeController";
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee management
 */

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid input.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */
router.post("/", 
  authenticate, 
  authorize(["ADMIN"]), 
  EmployeeController.createEmployee
);

/**
 * @swagger
 * /api/employees/login:
 *   post:
 *     summary: Employee login
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid email or password.
 */
router.post("/login", EmployeeController.login);

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of employees.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */
router.get("/", 
  authenticate, 
  authorize(["ADMIN", "MANAGER"]), 
  EmployeeController.getEmployees
);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the employee to retrieve.
 *     responses:
 *       200:
 *         description: Employee found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Employee not found.
 */
router.get("/:id", 
  authenticate, 
  authorize(["ADMIN", "MANAGER"]), 
  EmployeeController.getEmployeeById
);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update an employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the employee to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Employee not found.
 *       400:
 *         description: Invalid input.
 */
router.put("/:id", 
  authenticate, 
  authorize(["ADMIN"]), 
  EmployeeController.updateEmployee
);

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the employee to delete.
 *     responses:
 *       204:
 *         description: Employee deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Employee not found.
 */
router.delete("/:id", 
  authenticate, 
  authorize(["ADMIN"]), 
  EmployeeController.deleteEmployee
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - FullName
 *         - Email
 *         - Phone
 *         - Role
 *         - Password
 *       properties:
 *         EmployeeID:
 *           type: integer
 *           description: The auto-generated ID of the employee.
 *         FullName:
 *           type: string
 *           description: The full name of the employee.
 *         Email:
 *           type: string
 *           description: The email address of the employee.
 *         Phone:
 *           type: string
 *           description: The phone number of the employee.
 *         Role:
 *           type: string
 *           description: The role of the employee (e.g., Admin, Accountant, Sales, Manager).
 *         Password:
 *           type: string
 *           description: The hashed password of the employee.
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the employee was created.
 *       example:
 *         EmployeeID: 1
 *         FullName: John Doe
 *         Email: john.doe@example.com
 *         Phone: "1234567890"
 *         Role: "Admin"
 *         Password: "$2a$10$examplehash"
 *         CreatedAt: "2023-10-01T12:00:00Z"
 */

export default router;
