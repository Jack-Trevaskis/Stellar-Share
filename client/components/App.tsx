import Header from "./Header"
import Footer from "./Footer"

// import Home from "./Home"
import { Outlet } from "react-router-dom"


function App() {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
