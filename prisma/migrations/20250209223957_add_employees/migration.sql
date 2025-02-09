-- CreateTable
CREATE TABLE `customers` (
    `CustomerID` INTEGER NOT NULL AUTO_INCREMENT,
    `FullName` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Phone` VARCHAR(191) NOT NULL,
    `Address` VARCHAR(191) NOT NULL,
    `RegistrationDate` DATETIME(3) NOT NULL,
    `SubscriptionStartDate` DATETIME(3) NOT NULL,
    `SubscriptionEndDate` DATETIME(3) NOT NULL,
    `PaymentMethod` VARCHAR(191) NOT NULL,
    `AssignedEmployeeID` INTEGER NOT NULL,
    `Notes` VARCHAR(191) NULL,
    `employeeEmployeeID` INTEGER NULL,

    UNIQUE INDEX `customers_Email_key`(`Email`),
    PRIMARY KEY (`CustomerID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoices` (
    `InvoiceID` INTEGER NOT NULL AUTO_INCREMENT,
    `CustomerID` INTEGER NOT NULL,
    `InvoiceDate` DATETIME(3) NOT NULL,
    `TotalAmount` DOUBLE NOT NULL,
    `PaymentStatus` VARCHAR(191) NOT NULL,
    `PaymentMethod` VARCHAR(191) NOT NULL,
    `Notes` VARCHAR(191) NULL,
    `employeeEmployeeID` INTEGER NULL,

    PRIMARY KEY (`InvoiceID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice_details` (
    `InvoiceDetailID` INTEGER NOT NULL AUTO_INCREMENT,
    `InvoiceID` INTEGER NOT NULL,
    `ProductID` INTEGER NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `UnitPrice` DOUBLE NOT NULL,
    `TotalPrice` DOUBLE NOT NULL,

    PRIMARY KEY (`InvoiceDetailID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `ProductID` INTEGER NOT NULL AUTO_INCREMENT,
    `ProductName` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NULL,
    `Category` VARCHAR(191) NOT NULL,
    `UnitPrice` DOUBLE NOT NULL,
    `QuantityInStock` INTEGER NOT NULL,
    `ReorderLevel` INTEGER NULL,
    `SupplierID` INTEGER NULL,

    PRIMARY KEY (`ProductID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suppliers` (
    `SupplierID` INTEGER NOT NULL AUTO_INCREMENT,
    `SupplierName` VARCHAR(191) NOT NULL,
    `ContactName` VARCHAR(191) NULL,
    `Email` VARCHAR(191) NULL,
    `Phone` VARCHAR(191) NULL,
    `Address` VARCHAR(191) NULL,

    PRIMARY KEY (`SupplierID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employees` (
    `EmployeeID` INTEGER NOT NULL AUTO_INCREMENT,
    `FullName` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Phone` VARCHAR(191) NOT NULL,
    `Role` VARCHAR(191) NOT NULL,
    `PasswordHash` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `employees_Email_key`(`Email`),
    PRIMARY KEY (`EmployeeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_employeeEmployeeID_fkey` FOREIGN KEY (`employeeEmployeeID`) REFERENCES `employees`(`EmployeeID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_CustomerID_fkey` FOREIGN KEY (`CustomerID`) REFERENCES `customers`(`CustomerID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_employeeEmployeeID_fkey` FOREIGN KEY (`employeeEmployeeID`) REFERENCES `employees`(`EmployeeID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoice_details` ADD CONSTRAINT `invoice_details_InvoiceID_fkey` FOREIGN KEY (`InvoiceID`) REFERENCES `invoices`(`InvoiceID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoice_details` ADD CONSTRAINT `invoice_details_ProductID_fkey` FOREIGN KEY (`ProductID`) REFERENCES `products`(`ProductID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_SupplierID_fkey` FOREIGN KEY (`SupplierID`) REFERENCES `suppliers`(`SupplierID`) ON DELETE SET NULL ON UPDATE CASCADE;
