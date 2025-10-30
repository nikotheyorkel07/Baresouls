import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './lib/AuthProvider'
import { ProtectedRoute } from './lib/ProtectedRoute'
import ThemeSettings from './Pages/ThemeSettings'
import Login from './Pages/Login'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/settings/theme',
        element: <ThemeSettings />
      },
      // Add other protected routes here
    ]
  }
])

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}