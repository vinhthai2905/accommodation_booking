import AppLayout from '/src/components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'

import Home from './pages/Home'
import Hotel from './pages/Hotel'
import Profile from './pages/Profile'
import SearchResults from "./pages/SearchResults"
import CustomerRegister from './pages/CustomerRegister'
import CustomerSignIn from './pages/CustomerSignIn'
import PartnerRegister from './pages/PartnerRegister'
import PartnerLanding from './pages/PartnerLanding'
import Checkout from './pages/Checkout'

import './features/account/UserProfile'

import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router"
import { Toaster } from 'react-hot-toast'

import AuthUserProvider from './context/AuthUserProvider'
import UserProfile from './features/account/UserProfile'


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "index", element: <Home /> },
        { path: "searchresults", element: <SearchResults /> },
        {
          path: "hotel",
          element: <Hotel />,
          children: [
            { path: "checkout", element: <Checkout /> }
          ],
        },
        {
          path: "profile",
          element: <Profile />,
          children: [
            { path: "user", element: <UserProfile /> }
          ]
        }
      ],
    },
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
      path: "/partner",
      element: <PartnerLanding />
    },
    // {
    //   path: "/auth/sign-up",
    //   element: <CustomerRegister />
    // }
    // ,
    // {
    //   path: "/auth/sign-in",
    //   element: <CustomerSignIn />
    // }
    // ,
  ])
  return (
    <AuthUserProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={10}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#ffffff",
            color: "#1f2937",
            border: "1px solid #e5e7eb",
            padding: "12px 16px",
            borderRadius: "10px",
          },
          success: {
            style: {
              background: "#ecfdf5",
              color: "#065f46",
              border: "1px solid #a7f3d0",
            },
          },
          error: {
            style: {
              background: "#fef2f2",
              color: "#991b1b",
              border: "1px solid #fecaca",
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </AuthUserProvider>
  )
}

export default App
