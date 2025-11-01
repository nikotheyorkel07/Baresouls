import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from './lib/AuthProvider'
import { ThemeProvider } from './contexts/ThemeContext'
import { ProtectedRoute } from './lib/ProtectedRoute'
import { AppLayout } from './components/layout/AppLayout'

// Pages
import Login from './Pages/Login'
import Home from './Pages/Home'
import Chat from './Pages/Chat'
import Reflect from './Pages/Reflect'
import Profile from './Pages/Profile'
import ThemeSettings from './Pages/ThemeSettings'
import NotificationSettings from './Pages/NotificationSettings'
import PrivacySettings from './Pages/PrivacySettings'
import ExportData from './Pages/ExportData'
import HelpSupport from './Pages/HelpSupport'

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: (
          <AppLayout>
            <Home />
          </AppLayout>
        ),
      },
      {
        path: '/chat',
        element: (
          <AppLayout>
            <Chat />
          </AppLayout>
        ),
      },
      {
        path: '/reflect',
        element: (
          <AppLayout>
            <Reflect />
          </AppLayout>
        ),
      },
      {
        path: '/profile',
        element: (
          <AppLayout>
            <Profile />
          </AppLayout>
        ),
      },
      {
        path: '/settings/theme',
        element: (
          <AppLayout showNav={false}>
            <ThemeSettings />
          </AppLayout>
        ),
      },
      {
        path: '/settings/notifications',
        element: (
          <AppLayout showNav={false}>
            <NotificationSettings />
          </AppLayout>
        ),
      },
      {
        path: '/settings/privacy',
        element: (
          <AppLayout showNav={false}>
            <PrivacySettings />
          </AppLayout>
        ),
      },
      {
        path: '/settings/export',
        element: (
          <AppLayout showNav={false}>
            <ExportData />
          </AppLayout>
        ),
      },
      {
        path: '/help',
        element: (
          <AppLayout showNav={false}>
            <HelpSupport />
          </AppLayout>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}