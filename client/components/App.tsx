import Header from "./Header"
import Footer from "./Footer"

import { Outlet, useNavigate } from "react-router-dom"
import { useUser } from "../hooks/useUser"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"


function App() {
  const userFromHook = useUser()

  const { isAuthenticated } = useAuth0()

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && !userFromHook.data) navigate('/register')
  }, [isAuthenticated, userFromHook.data, navigate])

  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
