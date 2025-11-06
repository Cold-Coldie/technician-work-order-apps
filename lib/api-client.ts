import { I_WorkOrder } from '@/types';
import { I_WorkOrderFormData } from './validation';
import { HTTP } from './http';

const API_BASE = '/api/work-orders';

export async function fetchWorkOrders(filters?: { status?: string; q?: string }): Promise<I_WorkOrder[]> {
    const url = new URL(API_BASE, window.location.origin);

    if (filters?.status) {
        url.searchParams.set('status', filters.status);
    }
    if (filters?.q) {
        url.searchParams.set('q', filters.q);
    }

    const response = await HTTP({
        url: url.toString(),
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch work orders');
    }

    return response.json();
}

export async function fetchWorkOrder(id: string): Promise<I_WorkOrder> {
    const response = await HTTP({
        url: `${API_BASE}/${id}`,
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch work order');
    }

    return response.json();
}

export async function createWorkOrder(data: I_WorkOrderFormData): Promise<I_WorkOrder> {
    const response = await HTTP({
        url: API_BASE,
        method: 'POST',
        data,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || 'Failed to create work order');
    }

    return response.json();
}

export async function updateWorkOrder(id: string, data: I_WorkOrderFormData): Promise<I_WorkOrder> {
    const response = await HTTP({
        url: `${API_BASE}/${id}`,
        method: 'PUT',
        data,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || 'Failed to update work order');
    }

    return response.json();
}

export async function deleteWorkOrder(id: string): Promise<void> {
    const response = await HTTP({
        url: `${API_BASE}/${id}`,
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete work order');
    }
}