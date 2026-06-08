# L'Élysée — Barber Shop Week Agenda

A visually stunning, production-grade weekly scheduling agenda for a boutique barber collective, crafted with an **Organic Minimalist** aesthetic.

This application is built with **zero external dependencies** and uses native Web APIs, modern CSS (variables, grid, flexbox, transitions), and clean, stateful Vanilla JavaScript.

---

## 🏛️ Aesthetic Direction: Organic Minimalist

Designed to evoke the serene, spacious, and elegant atmosphere of a premium European spa or a luxury high-street grooming salon, rejecting the dark, cluttered, or overly aggressive design patterns common in traditional barber dashboards.

- **Color Palette**: A tranquil, warm earth-tone theme:
  - **Warm Alabaster** (`#FAF8F5`) as the serene background.
  - **Pure Alabaster White** (`#FFFFFF`) for elevated cards.
  - **Deep Oak & Charcoal** (`#2C2623`) for crisp, high-readability typography.
  - **Muted Taupe & Sand** (`#7A726C`) for metadata and secondary scales.
  - **Aura Sage Green** (`#5D6C5E`) as the primary brand accent.
  - **Warm Ochre / Soft Gold** (`#C29A72`) for high-end highlighted accents.
- **Typography**: Paired to establish a luxurious editorial feel:
  - **Cormorant Garamond**: An elegant, high-contrast serif for branding, headings, and dates.
  - **Outfit**: A modern, clean, geometric sans-serif for UI elements, time indicators, and data.
- **Layout & Depth**: Spacious padding and generous breathing room. Soft rounded borders, delicate single-pixel lines, and smooth diffused shadows that create depth without visual noise.
- **Motion & Feedback**: Subtle transitions on card hover, fluid open/close animations for modals, and staggered toast notifications for scheduling confirmations.

---

## ⚡ Key Features

1. **Collective Weekly View**: A responsive horizontal layout presenting all 7 operational days (Monday through Sunday) mapped against standard grooming hours (09:00 to 18:00).
2. **Artisan Collective Filter**: 
   - Dynamically filters the schedule to focus on a specific artisan (*Evelyn Stone*, *Julian Reed*, or *Clara Vance*) or view the collective schedule.
   - Each artisan is represented by a unique, muted visual signature integrated into booked cards.
3. **Weekly Digest (Dynamic Analytics)**: 
   - Computes stats dynamically for the active schedule and chosen filter.
   - Traces **Booked Hours**, **Capacity / Occupancy %**, and **Active Unique Clients**.
4. **Seamless Interactive Scheduling**:
   - **Click-to-Book Empty Cell**: Hovering over any empty slot displays a subtle "+ Book" affordance. Clicking it auto-fills the day and time directly into the modal form.
   - **Click-to-Review Booked Card**: Click any booked appointment to review notes, update services, or cancel the booking.
   - **Collision Protection**: Automatically prevents double-bookings for the same artisan at the same time, triggering alert toasts.
5. **Local Persistence**: All scheduling actions persist directly in the browser's `localStorage` so data remains safe across refreshes.
6. **Pre-Seeded Schedule**: Automatically initializes with 9 realistic appointments spread across the week, so the interface feels "alive" on initial load.

---

## 🛠️ Tech Stack & Architecture

- **Markup**: Semantic HTML5 with SVG icon designs.
- **Styling**: Pure Modern CSS (No Tailwind, Sass, or CSS libraries). Extremely lightweight and fast-loading.
- **State & Routing**: Vanilla Javascript (ES6) implementing client-side event binding, dynamic DOM updates, and custom reactive statistics.

---

## 🚀 How to Run

Since this application has **zero build steps** and **zero dependencies**, you can run it immediately in any modern web browser:

1. **Double-click `index.html`** or open it directly in Safari, Chrome, Edge, or Firefox.
2. No internet connection is required (all fonts are safely imported from Google Fonts via CDN, with standard system fallbacks).
