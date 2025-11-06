import { getWorkOrders, saveWorkOrders } from "@/lib/data";
import { WorkOrderSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

// GET /api/work-orders
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status");
        const q = searchParams.get("q");

        let workOrders = await getWorkOrders();

        if (status) {
            workOrders = workOrders.filter((order) => order.status === status);
        }

        if (q) {
            workOrders = workOrders.filter((order) =>
                order.title.toLowerCase().includes(q.toLowerCase())
            );
        }

        return NextResponse.json(workOrders, {
            headers: {
                "Cache-Control": "no-cache, no-store, must-revalidate",
            },
        });
    } catch (error) {
        console.error("GET /api/work-orders error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// POST /api/work-orders
export async function POST(request: NextRequest) {
    try {
        const json = await request.json();

        // Server-side validation
        const validatedData = WorkOrderSchema.parse(json);

        const newWorkOrder = {
            id: uuidv4(),
            ...validatedData,
            updatedAt: new Date().toISOString(),
        };

        const workOrders = await getWorkOrders();
        workOrders.push(newWorkOrder);
        await saveWorkOrders(workOrders);

        return NextResponse.json(newWorkOrder, { status: 201 });
    } catch (error) {
        console.error("POST /api/work-orders error:", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { errors: (error as any).errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
