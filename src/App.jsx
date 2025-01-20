
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
                element: <OnboardingPage />,
            },
            {
                path: '/jobs',
                element: <JobsPage />,
            },
            {
                path: '/job/:id',
                element: <JobPage />,
            },
            {
                path: '/post-job',
                element: <PostJobPage />,
            },
            {
                path: '/my-jobs',
                element: <MyJobsPage />,
            },
            {
                path: '/job-listing',
                element: <JobListingPage />,
            },
            {
                path: '/saved-jobs',
                element: <SavedJobsPage />,
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
