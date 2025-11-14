# Candidate Portal

A modern React application built with Vite, TypeScript, Tailwind CSS v4, and Redux Toolkit.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Redux Toolkit (RTK)** - State management
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── assets/          # Static assets
├── store/           # Redux store configuration
│   ├── store.ts     # Store setup
│   ├── hooks.ts     # Typed Redux hooks
│   └── exampleSlice.ts  # Example slice (can be removed)
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles with Tailwind imports
```

## Usage

### Redux Toolkit

The project is set up with Redux Toolkit. Use the typed hooks from `store/hooks.ts`:

```typescript
import { useAppDispatch, useAppSelector } from './store/hooks';

function MyComponent() {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.example.value);
  // ...
}
```

### Tailwind CSS

Tailwind CSS v4 is configured and ready to use. Simply use Tailwind classes in your components:

```tsx
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <h1 className="text-4xl font-bold text-gray-900">Hello World</h1>
</div>
```

### React Router

React Router is set up in `App.tsx`. Add your routes as needed:

```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

## License

MIT
