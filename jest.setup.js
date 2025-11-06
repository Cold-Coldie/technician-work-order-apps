import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        refresh: jest.fn(),
        back: jest.fn(),
    }),
    useSearchParams: () => ({
        get: jest.fn(),
    }),
    usePathname: () => '',
}));

// Mock next/link
jest.mock('next/link', () => {
    return ({ children, href }) => {
        return <a href={href}>{children}</a>;
    };
});