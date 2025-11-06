import { promises as fs } from "fs";
import path from "path";
import { I_WorkOrder } from "../types";

const filePath = path.join(process.cwd(), "data", "work-orders.json");

const ensureDataFile = async (): Promise<void> => {
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    try {
        await fs.access(filePath);
    } catch {
        await fs.writeFile(filePath, JSON.stringify([]));
    }
};

export const getWorkOrders = async (): Promise<I_WorkOrder[]> => {
    await ensureDataFile();
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
};

export const saveWorkOrders = async (
    workOrders: I_WorkOrder[]
): Promise<void> => {
    await ensureDataFile();
    await fs.writeFile(filePath, JSON.stringify(workOrders, null, 2));
};
