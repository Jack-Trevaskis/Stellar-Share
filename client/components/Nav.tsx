import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { LoginButton } from './LoginButton'
import { LogoutButton } from './LogoutButton'
import { Link } from 'react-router-dom'

export function Nav() {
  const { user, logout, loginWithRedirect, isAuthenticated, isLoading } =
    useAuth0()

  useEffect(() => {
    if (!isLoading) {
      // If the user is authenticated, we want to redirect them to the home page
      if (isAuthenticated) {
        console.log('Logged in as:', user)
      }
    }
  }, [isAuthenticated, isLoading, user])

  return (
    <nav className="w-full bg-base02">
      <IfAuthenticated>
        <ul className="flex justify-evenly items-center w-full">
          <li>
            <Link
              to="/"
              className="text-2xl text-base1 hover:text-yellow transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="text-2xl text-base1 hover:text-yellow transition duration-300"
            >
              Profile
            </Link>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <ul className="flex justify-evenly items-center w-full">
          <li>
            <Link
              to="/"
              className="text-2xl text-base1 hover:text-yellow transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <LoginButton />
          </li>
        </ul>
      </IfNotAuthenticated>
    </nav>
  )
}
