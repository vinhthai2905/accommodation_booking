import AppLayout from './components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'
import PartnerDashboard from './pages/partner/PartnerDashboard'
import AdminLayout from "./components/layout/AdminLayout"

import CustomerRegister from './pages/users/CustomerRegister'
import CustomerSignIn from './pages/users/CustomerSignIn'
import Home from './pages/users/Home'
import Hotel from './pages/users/Hotel'
import SearchResults from "./pages/users/SearchResults"
import Book from './pages/users/Book'
import PaymentConfirmation from './pages/users/PaymentConfirmation'
import Profile from './pages/users/Profile'
import PersonalInformation from './features/profile/section/PersonalInformation'
import MyBooking from './features/profile/section/MyBooking'

import PartnertLanding from './pages/partner/PartnerLanding'
import PartnerRegister from './pages/partner/PartnerRegister'
import DashboardLanding from './features/partner/pages/DashboardLanding'
import DashboardHotel from './features/partner/pages/DashboardHotel'

import AdminDashboard from './pages/admin/AdminDashboard'

import AuthRedirectRoute from './pages/protectedroutes/AuthRedirectRoute'
import UserProtectedRoute from './pages/protectedroutes/UserProtectedRoute'
import PartnerProtectedRoute from './pages/protectedroutes/PartnerProtectedRoute'

import './App.css'

import { createBrowserRouter, RouterProvider, Navigate } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import AuthUserProvider from './context/authentication/AuthUserProvider'
import BookingProvider from './context/booking/BookingProvider'

import ToasterUI from './components/ui/ToasterUI'

import ChildAgeInput from './features/search/components/ChildAgeInput'
import PartnerLogin from './pages/partner/PartnerLogin'
import DashboardRoomType from './features/partner/pages/DashboardRoomType'

const queryClient = new QueryClient()

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <AuthRedirectRoute />,
      children: [
        {
          path: "partner/landing",
          element: <PartnertLanding />
        },
        {
          element: <AuthLayout />,
          path: "auth",
          children: [
            { path: "sign-up", element: <CustomerRegister /> },
            { path: "sign-in", element: <CustomerSignIn /> },
            { path: "partner/sign-up", element: <PartnerRegister /> },
            { path: "partner/sign-in", element: <PartnerLogin /> }
          ]
        }
      ]
    },
    {
      element: <UserProtectedRoute />,
      children: [
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
          ],
        },
        {
          path: "profile",
          element: <Profile />,
          children: [
            { path: "user", element: <PersonalInformation /> },
            { path: "mytrips.html", element: <MyBooking /> }
          ]
        },
        {
          path: "book.html",
          element: <Book />
        },
        {
          path: "payment/confirmation.html",
          element: <PaymentConfirmation />,
        },
      ]
    },
    {
      element: <PartnerProtectedRoute />,
      path: "/partner",
      children: [
        {
          path: "dashboard",
          element: <PartnerDashboard />,
          children: [
            { path: "", element: <DashboardLanding /> },
            {
              path: "hotel",
              element: <DashboardHotel />,
              children: [
                { path: "room-type", element: <DashboardRoomType /> }
              ]
            }
          ]
        },
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
        <BookingProvider>
          <ToasterUI />
          <RouterProvider router={router} />
        </BookingProvider>
      </AuthUserProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
