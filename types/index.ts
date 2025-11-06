export type I_Priority = "Low" | "Medium" | "High";
export type I_Status = "Open" | "In Progress" | "Done";

export interface I_WorkOrder {
    id: string;
    title: string;
    description: string;
    priority: I_Priority;
    status: I_Status;
    updatedAt: string;
}