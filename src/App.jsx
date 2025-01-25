
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from "@/components/theme-provider"

import AppRootLayout from './layouts/RootLayout';
import LandingPage from "./pages/Landing";
import OnboardingPage from "./pages/Onboarding";
import ErrorPage from "./pages/Error";
import JobsPage from "./pages/Jobs"
import JobPage from './pages/Job';
import PostJobPage from './pages/PostJob';
import MyJobsPage from './pages/MyJobs';
import JobListingPage from './pages/JobListing';
import SavedJobsPage from './pages/SavedJobs';
import ProtectedRoute from './components/protected-route';

const router = createBrowserRouter([
    {   
        path: '/',
        element: <AppRootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <LandingPage />,
            },
            {
                path: '/onboarding',
                element: (
                    <ProtectedRoute>
                        <OnboardingPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/jobs',
                element: (
                    <ProtectedRoute>
                        <JobsPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/job/:id',
                element: (
                    <ProtectedRoute>
                        <JobPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/post-job',
                element: (
                    <ProtectedRoute>
                        <PostJobPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/my-jobs',
                element: (
                    <ProtectedRoute>
                        <MyJobsPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/job-listing',
                element: (
                    <ProtectedRoute>
                        <JobListingPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/saved-jobs',
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
        <RouterProvider router={router} />
    </ThemeProvider>      
  )
}

export default App;
