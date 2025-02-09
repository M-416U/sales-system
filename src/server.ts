import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import customersRouter from "./routes/customers";
import invoicesRouter from "./routes/invoices";
import reportsRouter from "./routes/reports";
import employeesRouter from "./routes/employees";
import path from "path";

const app = express();
const PORT = 3000;
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Swagger configuration
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sales Management System API",
      version: "1.0.0",
      description: "API documentation for the Sales Management System",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // مسار ملفات الروoutes
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/api/customers", customersRouter);
app.use("/api/invoices", invoicesRouter);
app.use("/api/reports", reportsRouter);
app.use("/api/employees", employeesRouter);

// Serve the API documentation
app.use("/docs", express.static(path.join(__dirname, "../api-docs")));

// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
