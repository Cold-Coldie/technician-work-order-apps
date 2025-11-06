'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateWorkOrder, deleteWorkOrder } from '@/lib/api-client';
import styles from '../../create/CreateWorkOrderForm.module.css';
import { I_WorkOrder } from '@/types';
import { I_WorkOrderFormData } from '@/lib/validation';

interface EditWorkOrderFormProps {
    workOrder: I_WorkOrder;
}

export default function EditWorkOrderForm({ workOrder }: EditWorkOrderFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<I_WorkOrderFormData>({
        title: workOrder.title,
        description: workOrder.description,
        priority: workOrder.priority,
        status: workOrder.status,
    });
    const [errors, setErrors] = useState<Partial<I_WorkOrderFormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof I_WorkOrderFormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            await updateWorkOrder(workOrder.id, formData);
            router.push('/');
            router.refresh();
        } catch (error) {
            if (error instanceof Error) {
                setErrors({ title: error.message });
            } else {
                setErrors({ title: 'An unexpected error occurred' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this work order? This action cannot be undone.')) {
            return;
        }

        setIsDeleting(true);
        try {
            await deleteWorkOrder(workOrder.id);
            router.push('/');
            router.refresh();
        } catch (error) {
            alert('Failed to delete work order');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.label}>
                    Title *
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.title ? styles.error : ''}`}
                    placeholder="Enter work order title"
                    required
                />
                {errors.title && <span className={styles.errorMessage}>{errors.title}</span>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="Describe the work to be done..."
                    rows={5}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="priority" className={styles.label}>
                    Priority
                </label>
                <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className={styles.select}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="status" className={styles.label}>
                    Status
                </label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={styles.select}
                >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>

            <div className={styles.formActions}>
                <div>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className={styles.deleteButton}
                        disabled={isDeleting || isSubmitting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        type="button"
                        onClick={() => router.push('/')}
                        className={styles.cancelButton}
                        disabled={isSubmitting || isDeleting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isSubmitting || isDeleting}
                    >
                        {isSubmitting ? 'Updating...' : 'Update Work Order'}
                    </button>
                </div>
            </div>
        </form>
    );
}