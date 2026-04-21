
# UPlan

UPlan is a React + Vite event planning dashboard prototype with pages for venues, catering, calendar planning, messaging, profile management, settings, and organization details.

## Running the project locally

### Prerequisites

- Node.js 18+ (Node.js 20 LTS recommended)
- npm (comes with Node.js)

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Then open the local URL shown in terminal (typically `http://localhost:5173`).

### Build for production

```bash
npm run build
```

This outputs an optimized build in the `dist/` folder.

## Core frameworks and libraries used

- **React 18**: main UI framework for building component-based pages.
- **TypeScript + TSX**: typed JavaScript and component markup in `.tsx` files.
- **Vite**: fast dev server and production build tool.
- **React Router**: client-side routing between pages.
- **Tailwind CSS (v4)**: utility-first styling across the app.
- **Radix UI + custom UI wrappers**: reusable accessible UI primitives in `src/app/components/ui`.
- **Lucide React**: icon system used throughout the interface.

## Pages directory overview (`src/app/pages`)

- **`Home.tsx`**: dashboard landing page with key stats and a list of upcoming events.
- **`Venues.tsx`**: venue browsing cards with pricing, capacity, amenities, and booking button states.
- **`Catering.tsx`**: catering vendor list with cuisine, pricing, specialties, and dietary options.
- **`CalendarPage.tsx`**: event schedule view with status badges, event types, and quick actions.
- **`Messages.tsx`**: two-pane messaging UI with conversation list and message thread preview.
- **`Settings.tsx`**: account preference panels (notifications, privacy/security, billing, account actions).
- **`Profile.tsx`**: user profile details, planning stats, recent activity, and achievements.
- **`Organization.tsx`**: organization information page with team details, goals, milestones, and contact info.

## Project structure overview

### Top-level folders/files

- **`src/`**: all frontend source code.
- **`public/`**: static assets served as-is (example: `public/images/beta.png`).
- **`guidelines/`**: project/reference guideline docs.
- **`index.html`**: Vite HTML entry file that mounts the React app.
- **`package.json`**: scripts and dependency definitions.
- **`package-lock.json`**: exact npm dependency lockfile.
- **`vite.config.ts`**: Vite configuration.
- **`postcss.config.mjs`**: PostCSS/Tailwind processing config.

### `src/` breakdown

- **`src/main.tsx`**: app bootstrap; mounts React into `#root`.
- **`src/app/App.tsx`**: top-level app component rendering the router provider.
- **`src/app/routes.ts`**: route definitions and page-to-path mapping.
- **`src/app/components/`**: shared layout and reusable components.
  - **`Layout.tsx`**: main shell with left sidebar navigation and routed content outlet.
  - **`figma/ImageWithFallback.tsx`**: image component that renders a fallback when an image fails to load.
  - **`ui/`**: reusable UI components used across pages (cards, badges, switches, dialogs, etc.).
- **`src/app/pages/`**: route-level page components (one file per main screen).
- **`src/styles/`**: global styling and Tailwind/theme CSS files.

## Notes

- The app is currently frontend-only (no backend/database integration yet).
- Most page content is currently mock data defined directly in page components.
  