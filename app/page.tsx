import { getWorkOrdersFromAPI } from '@/lib/server-api-client';
import Link from 'next/link';
import WorkOrderSearch from './components/WorkOrderSearch';
import styles from './page.module.css';

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function WorkOrdersPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const filters = q ? { q } : undefined;
  const workOrders = await getWorkOrdersFromAPI(filters);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Work Orders</h1>
        <Link href="/work-orders/create" className={styles.createButton}>
          Create New
        </Link>
      </div>

      <WorkOrderSearch />

      {q && (
        <div className={styles.searchResults}>
          <p>
            {workOrders.length} work order{workOrders.length !== 1 ? 's' : ''} found
            {q && ` for "${q}"`}
          </p>
        </div>
      )}

      <div className={styles.workOrdersGrid}>
        {workOrders.map((order) => (
          <div key={order.id} className={styles.workOrderCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.title}>{order.title}</h3>
              <span className={`${styles.priority} ${styles[order.priority.toLowerCase()]}`}>
                {order.priority}
              </span>
            </div>

            <div className={styles.cardBody}>
              <p className={styles.description}>
                {order.description.length > 100
                  ? `${order.description.substring(0, 100)}...`
                  : order.description
                }
              </p>

              <div className={styles.meta}>
                <span className={`${styles.status} ${styles[order.status.replace(' ', '').toLowerCase()]}`}>
                  {order.status}
                </span>
                <span className={styles.updated}>
                  Updated: {new Date(order.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className={styles.cardActions}>
              <Link href={`/work-orders/${order.id}`} className={styles.viewButton}>
                View
              </Link>
              <Link href={`/work-orders/edit/${order.id}`} className={styles.editButton}>
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>

      {workOrders.length === 0 && (
        <div className={styles.emptyState}>
          {q ? (
            <>
              <p>No work orders found for "{q}".</p>
              <Link href="/" className={styles.createButton}>
                View all work orders
              </Link>
            </>
          ) : (
            <>
              <p>No work orders found.</p>
              <Link href="/work-orders/create" className={styles.createButton}>
                Create your first work order
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}