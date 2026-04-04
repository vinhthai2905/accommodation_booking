import AppLayout from '/src/components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'

import Home from './pages/Home'
import Hotel from './pages/Hotel'
import SearchResults from "./pages/SearchResults"
import CustomerRegister from './pages/CustomerRegister'
import CustomerSignIn from './pages/CustomerSignIn'
import PartnerRegister from './pages/PartnerRegister'
import PartnerLanding from './pages/PartnerLanding'
import Checkout from './pages/Checkout'

import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router"


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "index",
          element: <Home />
        },
        {
          path: "searchresults",
          element: <SearchResults />
        },
        {
          path: "hotel",
          element: <Hotel />
        },
      ]
    },
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        {
          path: "sign-up",
          element: <CustomerRegister />
        },
        {
          path: "sign-in",
          element: <CustomerSignIn />
        },
        {
          path: "partner/sign-up",
          element: <PartnerRegister />
        }
      ]
    },
    {
      path: "/partner",
      element: <PartnerLanding />
    },
    {
      path: "/hotel/checkout",
      element: <Checkout />
    }
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
  return <RouterProvider router={router} />
}

export default App
