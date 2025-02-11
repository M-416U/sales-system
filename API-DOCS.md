# Sales System API Documentation

## Authentication

The API uses JWT (JSON Web Token) for authentication. All endpoints except `/api/employees/login` require authentication.

### Authentication Header
```
Authorization: Bearer <token>
```

### Roles
- **ADMIN**: Full system access
- **MANAGER**: Access to most operations except employee management
- **SALES**: Access to customer and invoice operations
- **EMPLOYEE**: Basic read-only access

## Endpoints

### Employees

#### Login
- **URL**: `/api/employees/login`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "token": "string",
    "employee": {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string"
    }
  }
  ```

#### Create Employee
- **URL**: `/api/employees`
- **Method**: `POST`
- **Auth Required**: Yes
- **Roles**: `ADMIN`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "string"
  }
  ```
- **Success Response**: `201 Created`

#### Get All Employees
- **URL**: `/api/employees`
- **Method**: `GET`
- **Auth Required**: Yes
- **Roles**: `ADMIN`, `MANAGER`
- **Success Response**: `200 OK`

#### Get Employee by ID
- **URL**: `/api/employees/:id`
- **Method**: `GET`
- **Auth Required**: Yes
- **Roles**: `ADMIN`, `MANAGER`
- **Success Response**: `200 OK`

#### Update Employee
- **URL**: `/api/employees/:id`
- **Method**: `PUT`
- **Auth Required**: Yes
- **Roles**: `ADMIN`
- **Success Response**: `200 OK`

#### Delete Employee
- **URL**: `/api/employees/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes
- **Roles**: `ADMIN`
- **Success Response**: `204 No Content`

### Customers

#### Create Customer
- **URL**: `/api/customers`
- **Method**: `POST`
- **Auth Required**: Yes
- **Roles**: `ADMIN`, `MANAGER`, `SALES`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "address": "string"
  }
  ```
- **Success Response**: `201 Created`

#### Get All Customers
- **URL**: `/api/customers`
- **Method**: `GET`
- **Auth Required**: Yes
- **Roles**: `ADMIN`, `MANAGER`, `SALES`, `EMPLOYEE`
- **Success Response**: `200 OK`

#### Get Customer by ID
- **URL**: `/api/customers/:id`
- **Method**: `GET`
- **Auth Required**: Yes
- **Roles**: `ADMIN`, `MANAGER`, `SALES`, `EMPLOYEE`
- **Success Response**: `200 OK`

#### Update Customer
- **URL**: `/api/customers/:id`
- **Method**: `PUT`
- **Auth Required**: Yes
- **Roles**: `ADMIN`, `MANAGER`, `SALES`
- **Success Response**: `200 OK`

#### Delete Customer
- **URL**: `/api/customers/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes
- **Roles**: `ADMIN`, `MANAGER`
- **Success Response**: `204 No Content`

### Invoices

#### Create Invoice
- **URL**: `/api/invoices`
- **Method**: `POST`
- **Auth Required**: Yes
- **Roles**: `ADMIN`, `MANAGER`, `SALES`
- **Request Body**:
  ```json
  {
    "customerId": "string",
    "items": [
      {
        "productId": "string",
        "quantity": "number",
        "price": "number"
      }
    ],
    "totalAmount": "number",
    "status": "string"
  }
  ```
- **Success Response**: `201 Created`

#### Get All Invoices
- **URL**: `/api/invoices`
- **Method**: `GET`
- **Auth Required**: Yes
- **Roles**: `ADMIN`, `MANAGER`, `SALES`, `EMPLOYEE`
- **Success Response**: `200 OK`

#### Get Invoice by ID
- **URL**: `/api/invoices/:id`
- **Method**: `GET`
- **Auth Required**: Yes
- **Roles**: `ADMIN`, `MANAGER`, `SALES`, `EMPLOYEE`
- **Success Response**: `200 OK`

#### Update Invoice
- **URL**: `/api/invoices/:id`
- **Method**: `PUT`
- **Auth Required**: Yes
- **Roles**: `ADMIN`, `MANAGER`, `SALES`
- **Success Response**: `200 OK`

#### Delete Invoice
- **URL**: `/api/invoices/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes
- **Roles**: `ADMIN`, `MANAGER`
- **Success Response**: `204 No Content`

### Reports

#### Sales Report
- **URL**: `/api/reports/sales`
- **Method**: `GET`
- **Auth Required**: Yes
- **Roles**: `ADMIN`, `MANAGER`
- **Query Parameters**:
  - `startDate`: ISO date string
  - `endDate`: ISO date string
- **Success Response**: `200 OK`

#### Inventory Report
- **URL**: `/api/reports/inventory`
- **Method**: `GET`
- **Auth Required**: Yes
- **Roles**: `ADMIN`, `MANAGER`
- **Success Response**: `200 OK`

## Error Responses

All endpoints can return the following error responses:

### 400 Bad Request
```json
{
  "message": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "message": "Access denied"
}
```

### 403 Forbidden
```json
{
  "message": "Forbidden"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```
