import Header from "./Header"
import Footer from "./Footer"

import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useUser } from "../hooks/useUser"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"


function App() {
  const location = useLocation()

  const userFromHook = useUser()

  const { isAuthenticated } = useAuth0()

  const navigate = useNavigate()

  console.log('LOCATION: ' , location)
  console.log(isAuthenticated)

  useEffect(() => {
    if (isAuthenticated && !userFromHook.data && location.pathname != '/register') navigate('/register')
  }, [isAuthenticated, userFromHook.data, navigate, location.pathname])

  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
