import AdminLayout from "./components/layout/AdminLayout"
import AppLayout from './components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'
import PartnerDashboard from './pages/partner/PartnerDashboard'

import UserBooking from './features/profile/section/UserBooking'
import UserInformation from './features/profile/section/UserInformation'
import Book from './pages/users/Book'
import CustomerRegister from './pages/users/CustomerRegister'
import CustomerSignIn from './pages/users/CustomerSignIn'
import Home from './pages/users/Home'
import Hotel from './pages/users/Hotel'
import HotelsSearchResult from "./pages/users/HotelsSearchResult"
import PaymentConfirmation from './pages/users/PaymentConfirmation'
import Profile from './pages/users/Profile'

import DashboardLanding from './features/dashboard/partner/pages/DashboardLanding'
import PartnertLanding from './pages/partner/PartnerLanding'
import PartnerRegister from './pages/partner/PartnerRegister'
import PartnerOnboarding from './pages/partner/PartnerOnboarding'

import DashboardBookings from './features/dashboard/partner/pages/DashboardBookings'
import DashboardHotel from './features/dashboard/partner/pages/DashboardHotel'
import DashboardHotelImages from './features/dashboard/partner/pages/DashboardHotelImages'
import DashboardHotelAmenities from './features/dashboard/partner/pages/DashboardHotelAmenities'
import DashboardRooms from './features/dashboard/partner/pages/DashboardRooms'
import DashboardRoomTypes from './features/dashboard/partner/pages/DashboardRoomTypes'
import DashboardRoomTypeDetail from './features/dashboard/partner/pages/DashboardRoomTypeDetail'

import DBEditHotel from './features/dashboard/partner/components/dashboard-main/dashboard-hotel/crud-page/edit/DBEditHotel'
import DBCreateRoomType from './features/dashboard/partner/components/dashboard-main/dashboard-room-type/crud-page/create/DBCreateRoomType'
import DBEditRoomType from './features/dashboard/partner/components/dashboard-main/dashboard-room-type/crud-page/edit/DBEditRoomType'
import DashboardChildrenPolicy from './features/dashboard/partner/pages/DashboardChildrenPolicy'

import AdminDashboard from './pages/admin/AdminDashboard'
import DashboardReviewApplications from './features/dashboard/admin/pages/DashboardReviewApplications'
import DashboardCategoryAmenities from './features/dashboard/admin/pages/DashboardCategoryAmenities'
import DashboardAmenities from './features/dashboard/admin/pages/DashboardAmenities'
import DashboardWards from './features/dashboard/admin/pages/DashboardWards'
import DashboardUsers from './features/dashboard/admin/pages/DashboardUsers'
import DBCreateWard from './features/dashboard/admin/components/dashboard-admin-main/dashboard-ward/crud-page/create/DBCreateWard'
import DBCreateUser from './features/dashboard/admin/components/dashboard-admin-main/dashboard-users/crud-page/create/DBCreateUser'
import DBEditUser from './features/dashboard/admin/components/dashboard-admin-main/dashboard-users/crud-page/edit/DBEditUser'

import DBCreateAmenity from "./features/dashboard/admin/components/dashboard-admin-main/dashboard-amenities/crud-page/create/DBCreateAmenity"
import DBCreateCategoryAmenity from "./features/dashboard/admin/components/dashboard-admin-main/dashboard-category-amenities/crud-page/create/DBCreateCategoryAmenity"
import DBEditCategoryAmenity from "./features/dashboard/admin/components/dashboard-admin-main/dashboard-category-amenities/crud-page/edit/DBEditCategoryAmenity"

import AuthRedirectRoute from './pages/protectedroutes/AuthRedirectRoute'
import PartnerProtectedRoute from './pages/protectedroutes/PartnerProtectedRoute'
import UserProtectedRoute from './pages/protectedroutes/UserProtectedRoute'

import './App.css'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router"

import AuthUserProvider from './context/authentication/AuthUserProvider'
import BookingProvider from './context/booking/BookingProvider'

import ToasterUI from './components/ui/ToasterUI'

import ChildAgeInput from './features/search/components/search-bar/input/ChildAgeInput'
import PartnerLogin from './pages/partner/PartnerLogin'

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
            { path: "searchresults", element: <HotelsSearchResult /> },
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
            { path: "user", element: <UserInformation /> },
            { path: "mytrips.html", element: <UserBooking /> }
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
          path: "onboarding",
          element: <PartnerOnboarding />
        },
        {
          path: "dashboard",
          element: <PartnerDashboard />,
          children: [
            { path: "", element: <DashboardLanding /> },
            {
              path: "hotel",
              element: <DashboardHotel />,
              children: [
                { path: "info", element: <DBEditHotel /> },
                { path: "images", element: <DashboardHotelImages /> },
                { path: "amenities", element: <DashboardHotelAmenities /> },
                { path: "policy/children", element: <DashboardChildrenPolicy /> },
                { path: "room-type", element: <DashboardRoomTypes /> },
                { path: "room-type/:slug/:id_room_type/rooms", element: <DashboardRooms /> },
                { path: "bookings", element: <DashboardBookings /> },

                { path: "room-type/new", element: <DBCreateRoomType /> },
                { path: "room-type/:slug/:id_room_type/edit", element: <DBEditRoomType /> },



                { path: "room-type/:slug/:id_room_type/details", element: <DashboardRoomTypeDetail /> },

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
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "review-applications", element: <DashboardReviewApplications /> },
        { path: "wards", element: <DashboardWards /> },
        { path: "wards/new", element: <DBCreateWard /> },
        { path: "users", element: <DashboardUsers /> },
        { path: "users/new", element: <DBCreateUser /> },
        { path: "users/:id_user/edit", element: <DBEditUser /> },
        { path: "amenities", element: <DashboardAmenities /> },
        { path: "amenities/new", element: <DBCreateAmenity /> },
        { path: "category-amenities", element: <DashboardCategoryAmenities /> },
        { path: "category-amenities/new", element: <DBCreateCategoryAmenity /> },
        { path: "category-amenities/:id/edit", element: <DBEditCategoryAmenity /> }
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
