import Header from './ui/Header'
import AppLayout from './ui/AppLayout'

import Register from './ui/pages/Register'

import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router"


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />
    },
    {
      path: "/sign-in",
      element: <Register />
    }
  ])
  return <RouterProvider router={router} />
}

export default App
