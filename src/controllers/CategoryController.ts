import { Request, Response } from "express";
import { prisma } from "../config/database";

class CategoryController {
  /**
   * Create a new category
   */
  async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const { name, description } = req.body;

      const category = await prisma.category.create({
        data: {
          name,
          description
        }
      });

      res.status(201).json(category);
    } catch (error) {
      console.error("Create category error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Get all categories
   */
  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await prisma.category.findMany({
        include: {
          _count: {
            select: {
              products: true
            }
          }
        }
      });

      res.status(200).json(categories);
    } catch (error) {
      console.error("Get categories error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Get category by ID
   */
  async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const category = await prisma.category.findUnique({
        where: { id },
        include: {
          products: true,
          _count: {
            select: {
              products: true
            }
          }
        }
      });

      if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
      }

      res.status(200).json(category);
    } catch (error) {
      console.error("Get category error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Update category
   */
  async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const category = await prisma.category.update({
        where: { id },
        data: {
          name,
          description
        }
      });

      res.status(200).json(category);
    } catch (error) {
      console.error("Update category error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Delete category
   */
  async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Check if category has products
      const category = await prisma.category.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              products: true
            }
          }
        }
      });

      if (category?._count.products > 0) {
        res.status(400).json({ 
          message: "Cannot delete category with associated products. Please remove or reassign products first." 
        });
        return;
      }

      await prisma.category.delete({
        where: { id }
      });

      res.status(204).send();
    } catch (error) {
      console.error("Delete category error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new CategoryController();
