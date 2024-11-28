import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { LoginButton } from './LoginButton'
import { LogoutButton } from './LogoutButton'

export function Nav() {
  const { user, logout, loginWithRedirect, isAuthenticated, isLoading } =
    useAuth0()

  useEffect(() => {
    if (!isLoading) {
      // If the user is authenticated, we want to redirect them to the home page
      if (isAuthenticated) {
        console.log('Logged in as:', user, user?.email)
      }
    }
  }, [isAuthenticated, isLoading])

  return (
    <nav>
      <IfAuthenticated>
        <ul>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <ul>
          <li>
            <LoginButton />
          </li>
        </ul>
      </IfNotAuthenticated>
      <h1>Community Sharing App</h1>
    </nav>
  )
}
