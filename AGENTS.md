# Fusion Starter

A production-ready full-stack React application template with integrated Express server, featuring React Router 6 SPA mode, TypeScript, Vitest, Zod and modern tooling.

While the starter comes with a express server, only create endpoint when strictly neccesary, for example to encapsulate logic that must leave in the server, such as private keys handling, or certain DB operations, db...

## Tech Stack

- **PNPM**: Prefer pnpm
- **Frontend**: React 18 + React Router 6 (spa) + TypeScript + Vite + Emotion CSS
- **Backend**: Express server integrated with Vite dev server
- **Testing**: Vitest
- **UI**: Radix UI + Emotion CSS + Lucide React icons

## Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx = home)
├── components/ui/        # Pre-built UI component library (Emotion styled)
├── styles/               # Global styles and theme (Emotion Global styles)
├── App.tsx                # App entry point and with SPA routing setup
└── global.css            # CSS variables and theme tokens

server/                   # Express API backend
├── index.ts              # Main server setup (express config + routes)
└── routes/               # API handlers

shared/                   # Types used by both client & server
└── api.ts                # Example of how to share api interfaces
```

## Key Features

## SPA Routing System

The routing system is powered by React Router 6:

- `client/pages/Index.tsx` represents the home page.
- Routes are defined in `client/App.tsx` using the `react-router-dom` import
- Route files are located in the `client/pages/` directory

For example, routes can be defined with:

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Index />} />
  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  <Route path="*" element={<NotFound />} />
</Routes>;
```

### Styling System

- **Primary**: Emotion CSS with styled components and CSS-in-JS
- **Theme and design tokens**: Configure in `client/styles/GlobalStyles.tsx` and CSS variables
- **UI components**: Pre-built styled component library in `client/components/ui/`
- **Utility**: Helper functions in `client/lib/utils.ts` for merging styles and creating variants

#### Emotion CSS Usage

```typescript
import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";

// Basic styled component
const Button = styled.button`
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  padding: 0.5rem 1rem;
  border-radius: calc(var(--radius));
  border: none;
  cursor: pointer;

  &:hover {
    background: hsl(var(--primary) / 0.9);
  }
`;

// Dynamic styled component with props
const Card = styled.div<{ variant?: "default" | "outlined" }>`
  padding: 1rem;
  border-radius: calc(var(--radius));

  ${(props) =>
    props.variant === "outlined" &&
    `
    border: 1px solid hsl(var(--border));
    background: hsl(var(--card));
  `}
`;

// Using utility functions for style composition
import { mergeStyles, createVariant } from "@/lib/utils";

const buttonVariants = createVariant({
  default: { background: "hsl(var(--primary))" },
  outline: {
    background: "transparent",
    border: "1px solid hsl(var(--border))",
  },
});
```

### Express Server Integration

- **Development**: Single port (8080) for both frontend/backend
- **Hot reload**: Both client and server code
- **API endpoints**: Prefixed with `/api/`

#### Example API Routes

- `GET /api/ping` - Simple ping api
- `GET /api/demo` - Demo endpoint

### Shared Types

Import consistent types in both client and server:

```typescript
import { DemoResponse } from "@shared/api";
```

Path aliases:

- `@shared/*` - Shared folder
- `@/*` - Client folder

## Development Commands

```bash
pnpm dev        # Start dev server (client + server)
pnpm build      # Production build
pnpm start      # Start production server
pnpm typecheck  # TypeScript validation
pnpm test          # Run Vitest tests
```

## Adding Features

### Add new colors to the theme

Open `client/styles/GlobalStyles.tsx` and add new CSS custom properties to the theme variables.

### New API Route

1. **Optional**: Create a shared interface in `shared/api.ts`:

```typescript
export interface MyRouteResponse {
  message: string;
  // Add other response properties here
}
```

2. Create a new route handler in `server/routes/my-route.ts`:

```typescript
import { RequestHandler } from "express";
import { MyRouteResponse } from "@shared/api"; // Optional: for type safety

export const handleMyRoute: RequestHandler = (req, res) => {
  const response: MyRouteResponse = {
    message: "Hello from my endpoint!",
  };
  res.json(response);
};
```

3. Register the route in `server/index.ts`:

```typescript
import { handleMyRoute } from "./routes/my-route";

// Add to the createServer function:
app.get("/api/my-endpoint", handleMyRoute);
```

4. Use in React components with type safety:

```typescript
import { MyRouteResponse } from "@shared/api"; // Optional: for type safety

const response = await fetch("/api/my-endpoint");
const data: MyRouteResponse = await response.json();
```

### New Page Route

1. Create component in `client/pages/MyPage.tsx`
2. Add route in `client/App.tsx`:

```typescript
<Route path="/my-page" element={<MyPage />} />
```

### Creating New UI Components

Use Emotion CSS for styling components:

```typescript
import styled from "@emotion/styled";

const StyledComponent = styled.div`
  /* CSS styles here */
  background: hsl(var(--background));
  color: hsl(var(--foreground));

  /* Responsive styles */
  @media (min-width: 768px) {
    padding: 1rem;
  }

  /* Pseudo selectors */
  &:hover {
    background: hsl(var(--accent));
  }
`;

export const MyComponent = ({ children }) => {
  return <StyledComponent>{children}</StyledComponent>;
};
```

For complex variant handling:

```typescript
import { createVariant, combineStyles } from "@/lib/utils";

const variants = createVariant({
  default: { background: "hsl(var(--primary))" },
  secondary: { background: "hsl(var(--secondary))" },
  outline: {
    background: "transparent",
    border: "1px solid hsl(var(--border))",
  },
});

const StyledButton = styled.button<{ variant?: keyof typeof variants }>`
  ${(props) => variants(props.variant || "default")}
`;
```

## Production Deployment

- **Standard**: `pnpm build`
- **Binary**: Self-contained executables (Linux, macOS, Windows)
- **Cloud Deployment**: Use either Netlify or Vercel via their MCP integrations for easy deployment. Both providers work well with this starter template.

## Architecture Notes

- Single-port development with Vite + Express integration
- TypeScript throughout (client, server, shared)
- Full hot reload for rapid development
- Production-ready with multiple deployment options
- Comprehensive UI component library built with Emotion CSS
- Type-safe API communication via shared interfaces
- CSS-in-JS styling with Emotion for component isolation and theming
- Design token system using CSS custom properties for consistent theming

## Design System

The UI components use a design token system based on CSS custom properties:

- Colors: `--primary`, `--secondary`, `--background`, `--foreground`, etc.
- Spacing: Use consistent spacing values (0.25rem, 0.5rem, 1rem, etc.)
- Border radius: `var(--radius)` for consistent rounded corners
- Typography: Inherit from design tokens or use semantic sizing

All components are built with Emotion CSS and follow accessibility best practices through Radix UI primitives.
