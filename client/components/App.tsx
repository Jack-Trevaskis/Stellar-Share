import Header from "./Header"
import Footer from "./Footer"

import { Outlet } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"


function App() {

  const { isAuthenticated } = useAuth0()
  console.log("AUTHENTICATED: " + isAuthenticated)

  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
