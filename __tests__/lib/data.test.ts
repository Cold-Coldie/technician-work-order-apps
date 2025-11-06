import { getWorkOrders, saveWorkOrders } from '@/lib/data';
import { promises as fs } from 'fs';

// Mock fs module
jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn(),
        writeFile: jest.fn(),
        mkdir: jest.fn(),
        access: jest.fn(),
    },
}));

const mockFs = fs as jest.Mocked<typeof fs>;

describe('Data Layer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('reads work orders from file', async () => {
        const mockData = JSON.stringify([
            {
                id: '1',
                title: 'Test Order',
                description: 'Test description',
                priority: 'High',
                status: 'Open',
                updatedAt: '2024-01-01T00:00:00.000Z'
            },
        ]);

        mockFs.readFile.mockResolvedValue(mockData);
        mockFs.access.mockResolvedValue(); // File exists

        const workOrders = await getWorkOrders();

        expect(workOrders).toHaveLength(1);
        expect(workOrders[0].title).toBe('Test Order');
        expect(mockFs.readFile).toHaveBeenCalled();
    });

    it('creates file with empty array when file does not exist', async () => {
        mockFs.access.mockRejectedValue(new Error('File does not exist'));
        mockFs.readFile.mockResolvedValue('[]'); // File gets created with empty array

        const workOrders = await getWorkOrders();

        expect(workOrders).toEqual([]);
        expect(mockFs.mkdir).toHaveBeenCalled();
        expect(mockFs.writeFile).toHaveBeenCalledWith(expect.any(String), '[]');
    });

    it('saves work orders to file', async () => {
        const workOrders = [
            {
                id: '1',
                title: 'Test Order',
                description: 'Test description',
                priority: 'High' as const,
                status: 'Open' as const,
                updatedAt: '2024-01-01T00:00:00.000Z'
            },
        ];

        // Mock that file already exists
        mockFs.access.mockResolvedValue(undefined);

        await saveWorkOrders(workOrders);

        expect(mockFs.writeFile).toHaveBeenCalled();

        // Verify the writeFile was called with proper JSON
        const call = mockFs.writeFile.mock.calls[0];
        const filePath = call[0];
        const writtenData = JSON.parse(call[1] as string);

        expect(writtenData).toEqual(workOrders);
        expect(filePath).toContain('work-orders.json');
    });

    it('creates directory and file when saving if they do not exist', async () => {
        const workOrders = [
            {
                id: '1',
                title: 'Test Order',
                description: 'Test description',
                priority: 'High' as const,
                status: 'Open' as const,
                updatedAt: '2024-01-01T00:00:00.000Z'
            },
        ];

        // Mock that file doesn't exist initially
        mockFs.access.mockRejectedValue(new Error('File does not exist'));

        await saveWorkOrders(workOrders);

        expect(mockFs.mkdir).toHaveBeenCalled();
        expect(mockFs.writeFile).toHaveBeenCalledTimes(2); // Once for initial empty array, once for actual data
    });

    it('handles file read errors gracefully', async () => {
        mockFs.access.mockResolvedValue(undefined); // File exists
        mockFs.readFile.mockRejectedValue(new Error('Read error'));

        await expect(getWorkOrders()).rejects.toThrow('Read error');
    });
});