import { Metadata } from 'next';
import { getWorkOrderFromAPI } from '@/lib/server-api-client';
import EditWorkOrderForm from './EditWorkOrderForm';
import { notFound } from 'next/navigation';
import styles from '../../create/CreatePage.module.css';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;

    try {
        const workOrder = await getWorkOrderFromAPI(id);
        return {
            title: `Edit: ${workOrder.title}`,
        };
    } catch {
        return {
            title: 'Edit Work Order',
        };
    }
}

export default async function EditPage({ params }: PageProps) {
    const { id } = await params;

    try {
        const workOrder = await getWorkOrderFromAPI(id);

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Edit Work Order</h1>
                    <a href="/" className={styles.backLink}>
                        ← Back to List
                    </a>
                </div>
                <EditWorkOrderForm workOrder={workOrder} />
            </div>
        );
    } catch {
        notFound();
    }
}