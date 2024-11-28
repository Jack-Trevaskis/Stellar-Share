/* eslint-disable react/jsx-key */
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import App from './components/App'
import Home from './components/Home'
import SingleStuffPage from './components/SingleStuffPage'
import Users from './components/Users'
import { Profile } from './components/Profile'
import AddStuffForm from './components/AddStuffForm'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/stuff/:stuffId" element={<SingleStuffPage />} />
      <Route path="/users" element={<Users />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/addStuff" element={<AddStuffForm />} />
    </Route>,
  ),
)

export default router
