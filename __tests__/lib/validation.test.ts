import { WorkOrderSchema } from '@/lib/validation';

describe('WorkOrder Validation', () => {
    it('validates correct work order data', () => {
        const validData = {
            title: 'Fix server issue',
            description: 'The server needs maintenance',
            priority: 'High',
            status: 'Open',
        };

        expect(() => WorkOrderSchema.parse(validData)).not.toThrow();
    });

    it('requires title to be at least 2 characters', () => {
        const invalidData = {
            title: 'A', // Too short
            description: 'Valid description',
            priority: 'Medium',
            status: 'Open',
        };

        expect(() => WorkOrderSchema.parse(invalidData)).toThrow();
    });

    it('rejects title longer than 80 characters', () => {
        const invalidData = {
            title: 'A'.repeat(81), // Too long
            description: 'Valid description',
            priority: 'Low',
            status: 'Open',
        };

        expect(() => WorkOrderSchema.parse(invalidData)).toThrow();
    });

    it('rejects description longer than 2000 characters', () => {
        const invalidData = {
            title: 'Valid title',
            description: 'A'.repeat(2001), // Too long
            priority: 'High',
            status: 'Open',
        };

        expect(() => WorkOrderSchema.parse(invalidData)).toThrow();
    });

    it('accepts valid priority values', () => {
        const priorities = ['Low', 'Medium', 'High'];

        priorities.forEach(priority => {
            const validData = {
                title: 'Valid title',
                description: 'Valid description',
                priority,
                status: 'Open', // Include status
            };

            expect(() => WorkOrderSchema.parse(validData)).not.toThrow();
        });
    });

    it('rejects invalid priority values', () => {
        const invalidData = {
            title: 'Valid title',
            description: 'Valid description',
            priority: 'Invalid', // Not allowed
            status: 'Open',
        };

        expect(() => WorkOrderSchema.parse(invalidData)).toThrow();
    });

    it('preserves status when provided', () => {
        const dataWithStatus = {
            title: 'Valid title',
            description: 'Valid description',
            priority: 'High',
            status: 'In Progress',
        };

        const result = WorkOrderSchema.parse(dataWithStatus);
        expect(result.status).toBe('In Progress');
    });

    it('accepts valid status values', () => {
        const statuses = ['Open', 'In Progress', 'Done'];

        statuses.forEach(status => {
            const validData = {
                title: 'Valid title',
                description: 'Valid description',
                priority: 'Medium',
                status,
            };

            expect(() => WorkOrderSchema.parse(validData)).not.toThrow();
        });
    });

    it('rejects invalid status values', () => {
        const invalidData = {
            title: 'Valid title',
            description: 'Valid description',
            priority: 'High',
            status: 'InvalidStatus', // Not allowed
        };

        expect(() => WorkOrderSchema.parse(invalidData)).toThrow();
    });
});