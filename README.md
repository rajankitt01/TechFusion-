# TechFusion Global Software - Corporate Website

A professional, modern, and high-performance corporate website built for TechFusion Global Software. This website serves as the digital front door for the company, showcasing services, portfolio, industries served, and acting as a lead generation tool.

## Features

- **Modern UI/UX**: Premium design system with consistent branding, typography, and spacing.
- **Fully Responsive**: Adapts seamlessly from mobile devices (360px) to ultra-wide desktop monitors (1440px+).
- **Dynamic Content**: Data-driven pages for Services, Portfolio, Careers, and Blog.
- **Interactive Elements**: Smooth page transitions, hover effects, and scroll animations using Framer Motion.
- **Reusable Components**: Built with an atomic design approach, featuring highly reusable UI elements (Cards, Buttons, Layouts).
- **SEO Optimized**: Semantic HTML structure and accessible design.
- **Conversion Focused**: Strategically placed CTAs and contact forms.
- **Fast Performance**: Built with Vite and React for lightning-fast build and load times.

## Tech Stack

- **Framework**: React.js 19
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui inspired custom components
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Project Structure

\`\`\`
src/
├── components/
│   ├── common/        # Reusable UI components (Button, Card, etc.)
│   ├── home/          # Home page specific sections
│   └── layout/        # Global layout components (Header, Footer, PageWrapper)
├── data/              # Data files for dynamic content (services, projects, jobs, etc.)
├── pages/             # Route components (Home, About, Services, etc.)
├── lib/               # Utility functions
├── App.jsx            # Main application component & routing setup
├── main.jsx           # React entry point
└── index.css          # Global styles & Tailwind configuration
\`\`\`

## Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

## Development

To start the development server:
\`\`\`bash
npm run dev
\`\`\`
This will start the Vite development server, usually at `http://localhost:5173`.

## Production Build

To create a production-ready build:
\`\`\`bash
npm run build
\`\`\`
The compiled assets will be available in the `dist` directory.

To preview the production build locally:
\`\`\`bash
npm run preview
\`\`\`

## Deployment

This Vite-based React application can be easily deployed to modern hosting platforms like Vercel, Netlify, or AWS Amplify. Simply connect your repository to your chosen platform and set the build command to `npm run build` and the publish directory to `dist`.

## AI Tools Used
This project was developed with the assistance of advanced AI coding tools to accelerate development, ensure best practices, and implement complex animations and layouts efficiently.
