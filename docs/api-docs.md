# Sales System API Documentation

## Authentication

### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "token": "string",
      "refreshToken": "string"
    }
    ```
- **Error Response**:
  - **Code**: 401
  - **Content**:
    ```json
    {
      "message": "Invalid credentials"
    }
    ```

### Refresh Token
- **URL**: `/api/auth/refresh`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "refreshToken": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "token": "string"
    }
    ```
- **Error Response**:
  - **Code**: 401
  - **Content**:
    ```json
    {
      "message": "Invalid refresh token"
    }
    ```

## Customers

### Get All Customers
- **URL**: `/api/customers`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer {token}`
- **Success Response**:
  - **Code**: 200
  - **Content**: Array of customers
    ```json
    [
      {
        "CustomerID": "number",
        "Name": "string",
        "Email": "string",
        "Phone": "string",
        "Address": "string"
      }
    ]
    ```

### Get Customer by ID
- **URL**: `/api/customers/:id`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer {token}`
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "CustomerID": "number",
      "Name": "string",
      "Email": "string",
      "Phone": "string",
      "Address": "string"
    }
    ```
- **Error Response**:
  - **Code**: 404
  - **Content**:
    ```json
    {
      "message": "Customer not found"
    }
    ```

### Create Customer
- **URL**: `/api/customers`
- **Method**: `POST`
- **Headers**: 
  - `Authorization: Bearer {token}`
- **Request Body**:
  ```json
  {
    "Name": "string",
    "Email": "string",
    "Phone": "string",
    "Address": "string"
  }
  ```
- **Success Response**:
  - **Code**: 201
  - **Content**: Created customer object

## Invoices

### Get All Invoices
- **URL**: `/api/invoices`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer {token}`
- **Success Response**:
  - **Code**: 200
  - **Content**: Array of invoices
    ```json
    [
      {
        "InvoiceID": "number",
        "CustomerID": "number",
        "Date": "string",
        "Amount": "number",
        "Status": "string"
      }
    ]
    ```

### Get Invoice by ID
- **URL**: `/api/invoices/:id`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer {token}`
- **Success Response**:
  - **Code**: 200
  - **Content**: Invoice object

### Create Invoice
- **URL**: `/api/invoices`
- **Method**: `POST`
- **Headers**: 
  - `Authorization: Bearer {token}`
- **Request Body**:
  ```json
  {
    "CustomerID": "number",
    "Amount": "number",
    "Status": "string"
  }
  ```
- **Success Response**:
  - **Code**: 201
  - **Content**: Created invoice object

## Reports

### Get Sales Report
- **URL**: `/api/reports/sales`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer {token}`
- **Query Parameters**:
  - `startDate`: ISO date string
  - `endDate`: ISO date string
- **Success Response**:
  - **Code**: 200
  - **Content**: Sales report data

## Employees

### Get All Employees
- **URL**: `/api/employees`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer {token}`
- **Success Response**:
  - **Code**: 200
  - **Content**: Array of employees
    ```json
    [
      {
        "EmployeeID": "number",
        "Name": "string",
        "Email": "string",
        "Role": "string"
      }
    ]
    ```

### Get Employee by ID
- **URL**: `/api/employees/:id`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer {token}`
- **Success Response**:
  - **Code**: 200
  - **Content**: Employee object

### Create Employee
- **URL**: `/api/employees`
- **Method**: `POST`
- **Headers**: 
  - `Authorization: Bearer {token}`
- **Request Body**:
  ```json
  {
    "Name": "string",
    "Email": "string",
    "Password": "string",
    "Role": "string"
  }
  ```
- **Success Response**:
  - **Code**: 201
  - **Content**: Created employee object (password hash excluded)

## Authentication Notes

- All endpoints except `/api/auth/login` and `/api/auth/refresh` require a valid JWT token in the Authorization header
- Access tokens expire after 1 hour
- Refresh tokens expire after 7 days
- Use the refresh token endpoint to get a new access token when it expires
