# ANINEX

A modern web application for browsing and managing your favorite anime, built with Next.js and Redux.

#### *Deployed on Vercel:* **[ANINEX](https://next-aninex.vercel.app/)**

## Features

- Browse seasonal and popular anime
- Search anime with multiple filters:
  - Title
  - Genre
  - Year
  - Status
  - Season
- View detailed anime information
- Save favorite anime
- Responsive design for all devices
- Modern UI with Tailwind CSS

## Tech Stack

- **Framework:** Next.js 15.2
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Data Fetching:** Apollo Client with GraphQL
- **Testing:** Jest & React Testing Library

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/johntasa/next-aninex.git
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open your browser and navigate to 'http://localhost:3000'

## Available Scripts
- ```pnpm dev``` - Start development server with Turbopack
- ```pnpm build``` - Build the application for production
- ```pnpm start``` - Start production server
- ```pnpm lint``` - Run ESLint
- ```pnpm test``` - Run tests
- ```pnpm test:watch``` - Run tests in watch mode

## Project Structure

```plaintext
src/
├── api/          # API related code
├── app/          # Next.js app router pages
├── components/   # React components
├── hooks/        # Custom React hooks
├── interfaces/   # TypeScript interfaces
├── redux/        # Redux store and slices
└── utils/        # Utility functions and constants
 ```

## Testing
The project uses Jest and React Testing Library for unit testing, and Playwright for end-to-end testing.

### Unit Tests
Unit tests are located next to their corresponding components with the .test.tsx extension.

To run unit tests:

```bash
pnpm test
 ```

### End-to-End Tests
End-to-end tests are located in the e2e directory and use Playwright.

- To run e2e tests:

```bash
pnpm e2e
 ```

- To run e2e tests with UI:

```bash
pnpm e2e:ui
 ```

- To view the last test report:

```bash
pnpm e2e:report
 ```