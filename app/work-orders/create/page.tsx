import { Metadata } from 'next';
import CreateWorkOrderForm from './CreateWorkOrderForm';
import styles from './CreatePage.module.css';

export const metadata: Metadata = {
    title: 'Create Work Order',
};

export default function CreatePage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Create Work Order</h1>
                <a href="/" className={styles.backLink}>
                    ← Back to List
                </a>
            </div>
            <CreateWorkOrderForm />
        </div>
    );
}