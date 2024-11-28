import { useAuth0 } from '@auth0/auth0-react'

export function Profile() {
  const { user, isAuthenticated, isLoading, isEror } = useAuth0()

  if (isLoading && !user) {
    return <div>Loading...</div>
  }
  if (isEror) {
    return <div>An error occurred: {isEror.message}</div>
  }
  if (!isAuthenticated) {
    return <div>Please sign in to view your profile.</div>
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-center my-4">
        User Profile Details
      </h1>
      <div className="">
        <ul className="flex justify-evenly items-center">
          <li className="items-center">
            <p>Welcome, {user?.name}!</p>
            <p>Email: {user?.email}</p>
          </li>
          <li className="items-center">
            <img src={user?.picture} alt={user?.nickname} />
          </li>
        </ul>
      </div>
    </div>
  )
}
