import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WorkOrderSearch from '@/app/components/WorkOrderSearch';
import { useRouter, useSearchParams } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>;

describe('WorkOrderSearch', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockPush,
      refresh: jest.fn(),
      back: jest.fn(),
    } as any);

    mockUseSearchParams.mockReturnValue({
      get: () => null,
    } as any);

    mockPush.mockClear();
  });

  it('renders search input and button', () => {
    render(<WorkOrderSearch />);

    expect(screen.getByPlaceholderText('Search work orders by title...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('updates search query when user types', async () => {
    const user = userEvent.setup();
    render(<WorkOrderSearch />);

    const searchInput = screen.getByPlaceholderText('Search work orders by title...');
    await user.type(searchInput, 'leak');

    expect(searchInput).toHaveValue('leak');
  });

  it('submits search form and navigates with query parameter', async () => {
    const user = userEvent.setup();
    render(<WorkOrderSearch />);

    const searchInput = screen.getByPlaceholderText('Search work orders by title...');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    await user.type(searchInput, 'server');
    await user.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith('/?q=server');
  });

  it('shows clear button when there is text and clears search', async () => {
    const user = userEvent.setup();
    render(<WorkOrderSearch />);

    const searchInput = screen.getByPlaceholderText('Search work orders by title...');
    await user.type(searchInput, 'test');

    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();

    const clearButton = screen.getByRole('button', { name: 'Clear' });
    await user.click(clearButton);

    expect(searchInput).toHaveValue('');
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('initializes with search query from URL', () => {
    mockUseSearchParams.mockReturnValue({
      get: (key: string) => key === 'q' ? 'existing' : null,
    } as any);

    render(<WorkOrderSearch />);

    expect(screen.getByPlaceholderText('Search work orders by title...')).toHaveValue('existing');
  });
});