import AppLayout from './components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'
import PartnerLayout from './components/layout/PartnerLayout'
import AdminLayout from "./components/layout/AdminLayout"

import Home from './pages/Home'
import Hotel from './pages/Hotel'
import Profile from './pages/Profile'
import SearchResults from "./pages/SearchResults"
import CustomerRegister from './pages/CustomerRegister'
import CustomerSignIn from './pages/CustomerSignIn'
import Book from './pages/Book'

import PartnerRegister from './pages/PartnerRegister'
import PartnerDashboard from './pages/partner/PartnerDashboard'

import AdminDashboard from './pages/admin/AdminDashboard'

import './features/account/UserProfile'

import './App.css'

import { createBrowserRouter, RouterProvider, Navigate } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import AuthUserProvider from './context/AuthUserProvider'
import UserProfile from './features/account/UserProfile'
import ToasterUI from './components/ui/ToasterUI'

import ChildAgeInput from './features/search/components/ChildAgeInput'

const queryClient = new QueryClient()

function App() {
  const router = createBrowserRouter([
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        { path: "sign-up", element: <CustomerRegister /> },
        { path: "sign-in", element: <CustomerSignIn /> },
        { path: "partner/sign-up", element: <PartnerRegister /> }
      ]
    },
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <Navigate to="/index" replace /> },
        { path: "index", element: <Home /> },
        { path: "searchresults", element: <SearchResults /> },
        {
          path: "hotel/:slug/:uuid",
          element: <Hotel />,
        },
        {
          path: "profile",
          element: <Profile />,
          children: [
            { path: "user", element: <UserProfile /> }
          ]
        },

      ],
    },
    {
      path: "book",
      element: <Book />
    },
    {
      path: "partner",
      element: <PartnerLayout />,
      children: [
        { path: "dashboard", element: <PartnerDashboard /> }
      ]
    },
    {
      path: "admin",
      element: <AdminLayout />,
      children: [
        { path: "dashboard", element: <AdminDashboard /> }
      ]
    }
    ,
    {
      path: "testground",
      element: <ChildAgeInput />
    }
  ])
  return (
    <QueryClientProvider client={queryClient}>
      <AuthUserProvider>
        <ToasterUI />
        <RouterProvider router={router} />
      </AuthUserProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
