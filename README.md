# Formeon Marketing Website

A premium, high-performance marketing website for Formeon AI.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

1. Navigate to the `website` directory:
   ```bash
   cd formeon/website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) (or the port specified in terminal) in your browser.

## Build for Production

```bash
npm run build
npm run start
```

## Design Decisions
- **Dark Theme**: Deep charcoal (#050505) backdrop to reduce eye strain and emphasize premium aesthetic.
- **Glassmorphism**: Used for navigation and overlay elements to suggest a "system-level" integration.
- **Micro-interactions**: Subtle hover states, animated grain overlay, and scroll-triggered fade-ins for a "live" interface feel.
- **Performance**: Zero external heavy assets. All visuals are built with CSS and Framer Motion primitives.
