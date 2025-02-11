import { Request, Response } from "express";
import prisma from "../lib/prisma";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

class SettingsController {
  /**
   * Get system settings
   */
  async getSettings(req: Request, res: Response): Promise<void> {
    try {
      const settings = await prisma.settings.findFirst({
        include: {
          employee: {
            select: {
              FullName: true,
              Email: true
            }
          }
        }
      });

      if (!settings) {
        res.status(404).json({ message: "Settings not found" });
        return;
      }

      res.status(200).json(settings);
    } catch (error) {
      console.error("Get settings error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Update system settings
   */
  async updateSettings(req: Request, res: Response): Promise<void> {
    try {
      const {
        companyName,
        companyAddress,
        companyPhone,
        companyEmail,
        taxRate,
        currency,
        lowStockThreshold,
        invoicePrefix
      } = req.body;

      const settings = await prisma.settings.upsert({
        where: {
          id: 1 // We only have one settings record
        },
        update: {
          companyName,
          companyAddress,
          companyPhone,
          companyEmail,
          taxRate: parseFloat(taxRate),
          currency,
          lowStockThreshold: parseInt(lowStockThreshold),
          invoicePrefix,
          updatedBy: req.user!.id
        },
        create: {
          companyName,
          companyAddress,
          companyPhone,
          companyEmail,
          taxRate: parseFloat(taxRate),
          currency,
          lowStockThreshold: parseInt(lowStockThreshold),
          invoicePrefix,
          updatedBy: req.user!.id
        }
      });

      res.status(200).json(settings);
    } catch (error) {
      console.error("Update settings error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Create system backup
   */
  async createBackup(req: Request, res: Response): Promise<void> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const backupDir = path.join(__dirname, "../../backups");
      const backupFile = path.join(backupDir, `backup-${timestamp}.sql`);

      // Create backups directory if it doesn't exist
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }

      // Get database connection info from environment variables
      const dbUrl = new URL(process.env.DATABASE_URL!);
      const database = dbUrl.pathname.slice(1);
      const username = dbUrl.username;
      const password = dbUrl.password;
      const host = dbUrl.hostname;

      // Create backup using mysqldump
      const command = `mysqldump -h ${host} -u ${username} -p${password} ${database} > ${backupFile}`;
      await execAsync(command);

      res.status(200).json({
        message: "Backup created successfully",
        backupPath: backupFile,
        timestamp
      });
    } catch (error) {
      console.error("Create backup error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Restore system from backup
   */
  async restoreFromBackup(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No backup file provided" });
        return;
      }

      const backupFile = req.file.path;

      // Get database connection info from environment variables
      const dbUrl = new URL(process.env.DATABASE_URL!);
      const database = dbUrl.pathname.slice(1);
      const username = dbUrl.username;
      const password = dbUrl.password;
      const host = dbUrl.hostname;

      // Restore backup using mysql
      const command = `mysql -h ${host} -u ${username} -p${password} ${database} < ${backupFile}`;
      await execAsync(command);

      // Delete the temporary uploaded file
      fs.unlinkSync(backupFile);

      res.status(200).json({
        message: "System restored successfully"
      });
    } catch (error) {
      console.error("Restore backup error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new SettingsController();
