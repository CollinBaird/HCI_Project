# UPlan
Group Name: College Event Planning
Members: Collin Baird, Victoria Rowe, Hunter Mena, and Parker Savage
UPlan is a React + Vite event planning dashboard prototype. It supports venue and catering planning flows, a combined planning flow, calendar management, profile updates, and local message threads.

## Run locally

### Prerequisites

- Node.js 18+ (Node.js 20 LTS recommended)
- npm (included with Node.js)

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Open the local URL shown in terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

## Tech stack

- **React 18** + **TypeScript/TSX**
- **Vite**
- **React Router**
- **Tailwind CSS**
- **Radix UI primitives** (through components in `src/app/components/ui`)
- **Lucide React** icons

## Data/storage model

This project is currently frontend-only and stores app data in browser `localStorage`:

- planned events
- combined planning draft state
- conversations/messages

Storage logic is in `src/app/eventStore.ts`.

## Pages overview (`src/app/pages`)

- **`Home.tsx`**: dashboard stats and upcoming events list; includes cancel-with-confirmation from home.
- **`PlanEvent.tsx`**: entry page for planning paths (`Catering`, `Venue`, `Catering + Venue`).
- **`Catering.tsx`**: select caterer, fill booking form (date/time/size/location/org), confirm to create event.
- **`Venues.tsx`**: select venue, fill booking form (date/time/size/location/org), confirm to create event.
- **`PlanEventCombined.tsx`**: combined flow that routes out to pick venue/catering, returns with placeholders, then completes booking.
- **`CalendarPage.tsx`**: shows events, AM/PM time display, view-details modal, and cancel event action.
- **`Messages.tsx`**: conversation list and message thread UI.
- **`Profile.tsx`**: profile info, edit-profile modal, live stats/activity based on stored events.
- **`Organization.tsx`**: organization/team, goals, and contact information.
- **`Settings.tsx`**: account preference/settings UI.

## Current directory structure

### Top-level

- **`src/`**: application source code.
- **`public/`**: static assets served directly (for example `public/images/beta.png`).
- **`index.html`**: HTML entrypoint.
- **`package.json`**: scripts and dependency manifest.
- **`package-lock.json`**: npm-generated lockfile for reproducible installs.
- **`vite.config.ts`**: Vite configuration.
- **`postcss.config.mjs`**: PostCSS configuration.

### `src/`

- **`src/main.tsx`**: React root mount.
- **`src/app/App.tsx`**: router provider wrapper.
- **`src/app/routes.ts`**: route registration.
- **`src/app/eventStore.ts`**: localStorage-backed event/message data helpers.
- **`src/app/components/`**
  - **`Layout.tsx`**: app shell and sidebar navigation.
  - **`TimePicker15.tsx`**: reusable custom time picker that enforces 15-minute increments (`00`, `15`, `30`, `45`) and AM/PM selection while storing values as `HH:MM`.
  - **`figma/ImageWithFallback.tsx`**: image fallback helper.
  - **`ui/`**: reusable UI primitives/components.
- **`src/app/pages/`**: route-level pages.
- **`src/styles/`**: global styling (`index.css`, `tailwind.css`, `theme.css`, `fonts.css`).

## Time picker behavior

`src/app/components/TimePicker15.tsx` is used in booking/edit forms to keep time input consistent.

- Limits minute choices to `00`, `15`, `30`, and `45`.
- Uses a 12-hour UI (`hour`, `minute`, `AM/PM`) for easier user input.
- Converts selection to 24-hour `HH:MM` string format for storage in event data.
  