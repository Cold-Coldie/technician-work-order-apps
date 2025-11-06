# Work Orders Management System

A full-stack Next.js application for managing technician work orders, built with TypeScript and the App Router.

## Assessment Decisions & Trade-offs

### Scope Management (4-8 hour timebox)

To deliver a polished, minimal scope within the time constraint, I made the following decisions:

**Chose Text Search over Status Filter**

- Implemented title-based search instead of status filtering
- Rationale: Text search is more generally useful for finding specific work orders
- Simpler UI with single input field vs. dropdown + search combination

**File-based JSON Storage**

- Used simple file-based persistence instead of database
- Trade-off: Not suitable for production but sufficient for assessment scope
- Benefits: Zero dependencies, simple setup

**Testing Scope**

- Focused on core validation and component interactions
- 3 test suites covering data layer, validation, and UI components
- Skipped E2E tests to stay within timebox (mentioned as optional)

**UI/UX Prioritization**

- Clean, responsive design with CSS Modules
- Keyboard navigation support
- Clear success/error messaging
- Skipped advanced a11y features (aria-labels, focus management) as bonus items

## Architecture & Technical Decisions

### Server/Client Boundaries

- **Server Components**: Used for data fetching in listing and detail pages
- **Client Components**: Used only for forms and interactive elements (search)
- **API Routes**: All CRUD operations go through route handlers

### Cache Strategy

- Used `cache: 'no-store'` for dynamic work order data
- Rationale: Work orders change frequently (create, update, delete)
- Ensures users always see fresh data

### Validation & Security

- **Zod** for server-side validation in API routes
- Safe rendering of descriptions (no `dangerouslySetInnerHTML`)
- Field-level error handling in forms

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Cold-Coldie/technician-work-order-apps.git
   cd work-orders-app

   ```

2. **Install dependencies**

   ```bash
   npm install

   ```

3. **Seed sample data**

   ```bash
   npm run seed

   ```

4. **Run the development server**

   ```bash
   npm run dev

   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Testing

# Run unit tests

npm test

# Run tests in watch mode

npm run test:watch

# Run tests with coverage

npm run test:coverage

```

## Available Scripts

* `npm run dev` - Start development server
* `npm run build` - Build for production
* `npm run start` - Start production server
* `npm run seed` - Seed sample work orders
* `npm test` - Run test suite

## API Endpoints

All endpoints return JSON and are located under `/api/work-orders`:

* `GET /api/work-orders` - List work orders (optional query: `?q=search`)
* `POST /api/work-orders` - Create new work order
* `GET /api/work-orders/[id]` - Get single work order
* `PUT /api/work-orders/[id]` - Update work order
* `DELETE /api/work-orders/[id]` - Delete work order

## Project Structure
```

** tests**/ # Test directory containing test files
app/
api/work-orders/ # API route handlers
work-orders/ # Work order pages
components/ # Reusable React components
lib/
data.ts # File-based persistence
validation.ts # Zod schemas
api-client.ts # Client-side API calls
server-api-client.ts # Server-side data access
types/ # TypeScript definitions
scripts/
seed.ts # Sample data seeding
