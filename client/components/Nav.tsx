import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { LoginButton } from './LoginButton'
import { LogoutButton } from './LogoutButton'
import { Link } from 'react-router-dom'
import { useUser } from '../hooks/useUser'

export function Nav() {
  const { user, isAuthenticated, isLoading } =
    useAuth0()

  const userFromHook = useUser()

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
              to="/users"
              className="text-2xl text-base1 hover:text-yellow transition duration-300"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/addStuff"
              className="text-2xl text-base1 hover:text-yellow transition duration-300"
            >
              Add Stuff
            </Link>
          </li>
          <li>
            <Link
              to="/stuff"
              className="text-2xl text-base1 hover:text-yellow transition duration-300"
            >
              Stuff
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
          {userFromHook.data && <li>Signed in as: {userFromHook.data.name}</li>}
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
            <Link
              to="/stuff"
              className="text-2xl text-base1 hover:text-yellow transition duration-300"
            >
              Stuff
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
