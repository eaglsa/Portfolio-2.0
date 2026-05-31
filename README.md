# Morph Portfolio

A modern, dynamic developer portfolio built with React, Vite, and Tailwind CSS. 
Integrated with Supabase for backend services and data management.

## 🚀 Technologies Used

- **Frontend Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Backend/Database**: [Supabase](https://supabase.com/)

## 📦 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <your-repo-url>
   cd morph-portfolio
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Environment Setup:
   Create a `.env` file in the root directory of the project and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to the local URL (usually [http://localhost:5173](http://localhost:5173)) to view the portfolio.

## 🛠️ Scripts

- `npm run dev`: Starts the local development server with Hot Module Replacement (HMR).
- `npm run build`: Bundles the application for production into the `dist` directory.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint to analyze the code for potential errors.

## 📂 Project Structure Overview

- `src/components/`: Contains all the reusable React UI components (like `DeveloperView.jsx`).
- `src/config/`: Setup for external services like `supabaseClient.js`.
- `src/data/`: Data files providing content for the portfolio.
