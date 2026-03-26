import Header from './ui/Header'
import AppLayout from './ui/AppLayout'

import CustomerRegister from './ui/pages/CustomerRegister'
import CustomerSignIn from './ui/pages/CustomerSignIn'

import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router"
import PartnerRegister from './ui/pages/PartnerRegister'


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />
    },
    {
      path: "/sign-up",
      element: <CustomerRegister />
    }
    ,
    {
      path: "/sign-in",
      element: <CustomerSignIn />
    }
    ,
    {
      path: "/partner/sign-up/",
      element: <PartnerRegister />
    }
  ])
  return <RouterProvider router={router} />
}

export default App
