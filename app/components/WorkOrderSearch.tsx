'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './WorkOrderSearch.module.css';

export default function WorkOrderSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const params = new URLSearchParams();
        if (searchQuery.trim()) {
            params.set('q', searchQuery.trim());
        }

        router.push(`/${params.toString() ? `?${params.toString()}` : ''}`);
    };

    const handleClear = () => {
        setSearchQuery('');
        router.push('/');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.searchForm}>
            <div className={styles.searchGroup}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search work orders by title..."
                    className={styles.searchInput}
                />
                <div className={styles.buttonGroup}>
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className={styles.clearButton}
                        >
                            Clear
                        </button>
                    )}
                    <button
                        type="submit"
                        className={styles.searchButton}
                    >
                        Search
                    </button>
                </div>
            </div>
        </form>
    );
}