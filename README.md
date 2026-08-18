# PayRozgar 📱💰
**A Modern, Mobile-First Payroll Management PWA for Small Businesses**

PayRozgar is a lightweight, offline-capable payroll and workforce management system built for local shops, kiranas, cafés, and small businesses. Designed with a core philosophy—*"How much do I have to pay each employee?"*—it replaces paper registers and complex spreadsheets with a simple, touch-friendly digital workflow.

Built strictly with **Vanilla HTML, CSS, and JavaScript**, adhering to Emil Kowalski's design engineering principles for snappy, tactile interactions without the overhead of heavy frameworks.

## ✨ Key Features

*   **100% Vanilla Stack:** Zero build tools, no React, no Tailwind. Blazing fast and lightweight.
*   **Offline-First PWA:** Uses a Stale-While-Revalidate service worker (`sw.js`). Installs directly to mobile home screens and works seamlessly without internet.
*   **Local State Management:** Fully functional client-side database using `localStorage`.
*   **Dynamic Payroll Engine:** Automatically calculates exact payouts (`Net Pay = Base + Overtime + Additions - Advances - Deductions`).
*   **Tactile UI & View Transitions:** Hardware-accelerated CSS spring animations and seamless native page routing via the View Transitions API.
*   **Dark Mode & Accessibility:** Built-in Light/Dark mode toggle with high-contrast badge rendering.
*   **Digital Payslips:** Auto-generates shareable, printable salary receipts (FR-09).

## 🏗 **Architecture**

```text
PayRozgar/
├── index.html          # Main unified HTML structure (Mobile & Desktop)
├── styles.css          # Sophisticated CSS, tactile animations & Dark Mode
├── app.js              # Vanilla JS State Store & DOM manipulation engine
├── manifest.json       # PWA configuration and mobile icons
├── sw.js               # Service Worker for offline caching
└── README.md           # Documentation
