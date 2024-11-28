/* eslint-disable react/jsx-key */
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import App from './components/App'
import Users from './components/Users'
import { Profile } from './components/Profile'
import Home from './components/Home'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="profile/" element={<Profile />} />
    </Route>,
  ),
)

export default router
