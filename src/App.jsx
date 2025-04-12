
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from "@/components/theme-provider"

import AppRootLayout from './layouts/RootLayout';
import LandingPage from "./pages/Landing";
import OnboardingPage from "./pages/Onboarding";
import ErrorPage from "./pages/Error";
import JobPage from './pages/Job';
import PostJobPage from './pages/PostJob';
import MyJobsPage from './pages/MyJobs';
import JobListingPage from './pages/JobListing';
import SavedJobsPage from './pages/SavedJobs';
import ProtectedRoute from './components/protected-route';
import LoginPage from './pages/Login';
import { AuthProvider } from './components/auth-provider';

import { ROUTES } from "./constants/routes";

const router = createBrowserRouter([
    {   
        path: ROUTES.LANDING,
        element: <AppRootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <LandingPage />,
            },
            {
                path: ROUTES.LOGIN,
                element: <LoginPage />
            },
            {
                path: ROUTES.ONBOARDING,
                element: (
                    <ProtectedRoute>
                        <OnboardingPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: ROUTES.JOB_LISTING,
                element: (
                    <ProtectedRoute>
                        <JobListingPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: ROUTES.JOB_DETAILS,
                element: (
                    <ProtectedRoute>
                        <JobPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: ROUTES.POST_JOB,
                element: (
                    <ProtectedRoute>
                        <PostJobPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: ROUTES.MY_JOBS,
                element: (
                    <ProtectedRoute>
                        <MyJobsPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: ROUTES.SAVED_JOBS,
                element: (
                    <ProtectedRoute>
                        <SavedJobsPage />
                    </ProtectedRoute>
                ),
            }
        ],       
    }
]);

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </ThemeProvider>      
  )
}

export default App;
