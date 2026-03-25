import Header from './ui/Header'
import AppLayout from './ui/AppLayout'

import Login from './ui/pages/Login'

import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router"


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />
    },
    {
      path: "/login",
      element: <Login />
    }
  ])
  return <RouterProvider router={router} />
}

export default App
