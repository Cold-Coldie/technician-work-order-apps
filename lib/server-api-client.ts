import { I_WorkOrder } from '@/types';
import { getWorkOrders } from './data';

export async function getWorkOrdersFromAPI(filters?: { status?: string; q?: string }): Promise<I_WorkOrder[]> {
    let workOrders = await getWorkOrders();

    if (filters?.status) {
        workOrders = workOrders.filter(item => item.status === filters.status);
    }

    if (filters?.q) {
        workOrders = workOrders.filter(item =>
            item.title.toLowerCase().includes(filters.q!.toLowerCase())
        );
    }

    return workOrders;
}

export async function getWorkOrderFromAPI(id: string): Promise<I_WorkOrder> {
    const workOrders = await getWorkOrders();
    const workOrder = workOrders.find(item => item.id === id);

    if (!workOrder) {
        throw new Error('Work order not found');
    }

    return workOrder;
}