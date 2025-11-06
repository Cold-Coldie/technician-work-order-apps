import { getWorkOrders, saveWorkOrders } from "@/lib/data";
import { WorkOrderSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// GET /api/work-orders/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const workOrders = await getWorkOrders();
        const workOrder = workOrders.find((item) => item.id === id);

        if (!workOrder) {
            return NextResponse.json(
                { error: "Work order not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(workOrder);
    } catch (error) {
        console.error("GET /api/work-orders/[id] error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// PUT /api/work-orders/[id]
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const workOrders = await getWorkOrders();
        const existingIndex = workOrders.findIndex((item) => item.id === id);

        if (existingIndex === -1) {
            return NextResponse.json(
                { error: "Work order not found" },
                { status: 404 }
            );
        }

        const json = await request.json();
        const validatedData = WorkOrderSchema.parse(json);

        const updatedWorkOrder = {
            ...workOrders[existingIndex],
            ...validatedData,
            updatedAt: new Date().toISOString(),
        };

        workOrders[existingIndex] = updatedWorkOrder;
        await saveWorkOrders(workOrders);

        return NextResponse.json(updatedWorkOrder);
    } catch (error) {
        console.error("PUT /api/work-orders/[id] error:", error);

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

// DELETE /api/work-orders/[id]
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const workOrders = await getWorkOrders();
        const filteredOrders = workOrders.filter((item) => item.id !== id);

        if (filteredOrders.length === workOrders.length) {
            return NextResponse.json(
                { error: "Work order not found" },
                { status: 404 }
            );
        }

        await saveWorkOrders(filteredOrders);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE /api/work-orders/[id] error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
