import { useAuth0 } from '@auth0/auth0-react'
import { useUser } from '../hooks/useUser'

export function Profile() {
  const { isAuthenticated } = useAuth0()

  const userFromHook = useUser()

  if (!isAuthenticated) {
    return <div>Please sign in to view your profile.</div>
  }

  if (!userFromHook.data) {
    return <div>Failed to fetch your data from the database.</div>
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-center my-4">
        User Profile Details
      </h1>
      <ul className="flex justify-evenly items-center">
        <li className="items-center">
          <p>Welcome, {userFromHook.data.name}!</p>
          <p>Email: {userFromHook.data.email}</p>
        </li>
        <li className="items-center">
          <img
            src={userFromHook.data.picture}
            alt={userFromHook.data.picture}
            className="rounded-full w-24 h-24 aspect-square object-cover"
          />
        </li>
      </ul>
    </div>
  )
}
