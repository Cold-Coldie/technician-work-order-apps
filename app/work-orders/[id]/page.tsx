import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./WorkOrderDetail.module.css";
import { getWorkOrderFromAPI } from "@/lib/server-api-client";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function WorkOrderDetail({ params }: PageProps) {
    const { id } = await params;

    try {
        const workOrder = await getWorkOrderFromAPI(id);

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <Link href="/" className={styles.backButton}>
                        ← Back to List
                    </Link>
                    <div className={styles.headerActions}>
                        <Link
                            href={`/work-orders/edit/${workOrder.id}`}
                            className={styles.editButton}
                        >
                            Edit
                        </Link>
                    </div>
                </div>

                <div className={styles.workOrderDetail}>
                    <div className={styles.detailHeader}>
                        <h1>{workOrder.title}</h1>
                        <div className={styles.badges}>
                            <span
                                className={`${styles.priority} ${styles[workOrder.priority.toLowerCase()]
                                    }`}
                            >
                                {workOrder.priority} Priority
                            </span>
                            <span
                                className={`${styles.status} ${styles[workOrder.status.replace(" ", "").toLowerCase()]
                                    }`}
                            >
                                {workOrder.status}
                            </span>
                        </div>
                    </div>

                    <div className={styles.detailContent}>
                        <section className={styles.section}>
                            <h2>Description</h2>
                            <div className={styles.description}>
                                {workOrder.description.split("\n").map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </section>

                        <section className={styles.metaSection}>
                            <h2>Details</h2>
                            <div className={styles.metaGrid}>
                                <div className={styles.metaItem}>
                                    <strong>Last Updated:</strong>
                                    <span>{new Date(workOrder.updatedAt).toLocaleString()}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <strong>ID:</strong>
                                    <span>{workOrder.id}</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        notFound();
    }
}
