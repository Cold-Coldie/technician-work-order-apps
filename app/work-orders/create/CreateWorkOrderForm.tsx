'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createWorkOrder } from '@/lib/api-client';
import { I_WorkOrderFormData } from '@/lib/validation';
import styles from './CreateWorkOrderForm.module.css';

export default function CreateWorkOrderForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<I_WorkOrderFormData>({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Open',
    });
    const [errors, setErrors] = useState<Partial<I_WorkOrderFormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            await createWorkOrder(formData);
            router.push('/');
            router.refresh(); // Refresh server components
        } catch (error) {
            if (error instanceof Error) {
                // Handle validation errors from API
                setErrors({ title: error.message });
            } else {
                setErrors({ title: 'An unexpected error occurred' });
            }
        } finally {
            setIsSubmitting(false);
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

            <div className={styles.formActions}>
                <button
                    type="button"
                    onClick={() => router.push('/')}
                    className={styles.cancelButton}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Creating...' : 'Create Work Order'}
                </button>
            </div>
        </form>
    );
}