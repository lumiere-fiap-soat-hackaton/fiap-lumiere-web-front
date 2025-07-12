# FIAP Lumière Web Frontend

This repository contains the frontend application for the Lumière project, part of the FIAP SOAT Hackathon. The Lumière project provides a platform for image processing and analysis.

## Project Overview

Lumière is a web application that allows users to upload and process images. The frontend interface provides authentication flows, dashboard views, and file upload capabilities.

## Tech Stack

- **React 19** with TypeScript
- **Vite 7** as the build tool
- **React Router 7** for navigation
- **TanStack Query** (React Query) for server state management
- **Axios** for API requests
- **Radix UI** components (Toast, Tooltip)
- **Sonner** for toast notifications
- **Crypto-JS** for encryption operations
- **CSS Modules** for component styling

## Project Structure

```
src/
├── App.tsx             # Main application component with routing
├── assets/             # Static assets like logos and images
├── components/         # Reusable UI components
│   ├── button/         # Button components
│   ├── input/          # Form input components
│   └── ui/             # UI utility components like toast, tooltip
├── contexts/           # React context providers
│   └── AuthContext.tsx # Authentication context for user management
├── hooks/              # Custom React hooks
│   └── useUserData/    # Hook for fetching user information
├── modules/            # Feature-based code organization
│   ├── application/    # Main application features
│   │   ├── components/ # App-specific components
│   │   ├── hooks/      # App-specific hooks
│   │   ├── layouts/    # App layout components
│   │   └── providers/  # Context providers for app features
│   ├── authentication/ # Authentication-related code
│   │   ├── components/ # Auth forms and components
│   │   ├── hooks/      # Auth-related hooks
│   │   └── layouts/    # Auth-specific layouts
│   └── public/         # Public-facing components
├── pages/              # Page components
│   ├── Dashboard/      # User dashboard
│   ├── Landing/        # Public landing page
│   ├── SignIn/         # Login page
│   ├── SignUp/         # Registration page
│   └── Upload/         # File upload page
├── services/           # API and external service integrations
│   ├── apiClient/      # Axios configuration
│   └── browserStorage/ # Local storage utilities
└── utils/              # Utility functions
    └── gravatar.ts     # Gravatar integration for user avatars
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lumiere-fiap-soat-hackaton/fiap-lumiere-web-front.git
   cd fiap-lumiere-web-front
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to: `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Deployment

The project is configured for deployment to AWS Amplify using the included `deploy-to-amplify.sh` script. After building, a `deployment.zip` file is automatically created that can be deployed to your hosting environment.

## Authentication Features

The application includes a complete authentication system with:
- User registration (Sign Up)
- Login (Sign In)
- Session management
- Protected routes
- Avatar support via Gravatar

## Project Architecture

The project follows a modular architecture organized by features:
- **Contexts**: Global state management with React Context API
- **Modules**: Feature-based organization of code
- **Pages**: Top-level views that combine components
- **Services**: External API integrations and data fetching

## Contributing

To contribute to this project, please follow the standard GitHub flow:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is part of the FIAP SOAT Hackathon and is subject to its licensing terms.

