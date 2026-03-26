import Header from './ui/Header'
import AppLayout from './ui/AppLayout'

import CustomerRegister from './ui/pages/CustomerRegister'
import CustomerSignIn from './ui/pages/CustomerSignIn'

import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router"
import PartnerRegister from './ui/pages/PartnerRegister'
import AuthLayout from './ui/AuthLayout'
import PartnerLanding from './features/authentication/PartnerLanding'


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />
    },
    {
      path: "/auth",
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
