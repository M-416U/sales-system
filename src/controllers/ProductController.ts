import { Request, Response } from "express";
import prisma from "../lib/prisma";

class ProductController {
  /**
   * Create a new product
   */
  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { ProductName, Description, Category, UnitPrice, QuantityInStock, ReorderLevel, SupplierID } = req.body;

      const product = await prisma.product.create({
        data: {
          ProductName,
          Description,
          Category,
          UnitPrice: parseFloat(UnitPrice),
          QuantityInStock: parseInt(QuantityInStock),
          ReorderLevel: ReorderLevel ? parseInt(ReorderLevel) : null,
          SupplierID: SupplierID ? parseInt(SupplierID) : null
        }
      });

      res.status(201).json(product);
    } catch (error) {
      console.error("Create product error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Get all products with pagination and filtering
   */
  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const category = req.query.category as string;

      const skip = (page - 1) * limit;

      const where = category ? { Category: category } : {};

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          skip,
          take: limit,
          include: {
            Supplier: true
          }
        }),
        prisma.product.count({ where })
      ]);

      res.status(200).json({
        data: products,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error("Get products error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Get product by ID
   */
  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      const product = await prisma.product.findUnique({
        where: { ProductID: id },
        include: {
          Supplier: true
        }
      });

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.status(200).json(product);
    } catch (error) {
      console.error("Get product error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Update product
   */
  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { ProductName, Description, Category, UnitPrice, ReorderLevel, SupplierID } = req.body;

      const product = await prisma.product.update({
        where: { ProductID: id },
        data: {
          ProductName,
          Description,
          Category,
          UnitPrice: parseFloat(UnitPrice),
          ReorderLevel: ReorderLevel ? parseInt(ReorderLevel) : null,
          SupplierID: SupplierID ? parseInt(SupplierID) : null
        }
      });

      res.status(200).json(product);
    } catch (error) {
      console.error("Update product error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Delete product
   */
  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      await prisma.product.delete({
        where: { ProductID: id }
      });

      res.status(204).send();
    } catch (error) {
      console.error("Delete product error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Update product stock
   */
  async updateStock(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const quantity = parseInt(req.body.quantity);

      const product = await prisma.product.update({
        where: { ProductID: id },
        data: {
          QuantityInStock: quantity
        }
      });

      // Check if stock is below reorder level
      if (product.ReorderLevel && product.QuantityInStock <= product.ReorderLevel) {
        // TODO: Implement notification system for low stock
        console.log(`Low stock alert for product ${product.ProductName}`);
      }

      res.status(200).json(product);
    } catch (error) {
      console.error("Update stock error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Search products
   */
  async searchProducts(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.q as string;

      const products = await prisma.product.findMany({
        where: {
          OR: [
            { ProductName: { contains: query } },
            { Description: { contains: query } },
            { Category: { contains: query } }
          ]
        },
        include: {
          Supplier: true
        }
      });

      res.status(200).json(products);
    } catch (error) {
      console.error("Search products error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Get low stock products
   */
  async getLowStockProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await prisma.product.findMany({
        where: {
          AND: [
            { ReorderLevel: { not: null } },
            {
              QuantityInStock: {
                lte: prisma.product.fields.ReorderLevel
              }
            }
          ]
        },
        include: {
          Supplier: true
        }
      });

      res.status(200).json(products);
    } catch (error) {
      console.error("Get low stock products error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new ProductController();
