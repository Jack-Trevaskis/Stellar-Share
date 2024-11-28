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
      <h2 className="text-2xl font-bold text-center my-4">Profile</h2>
      <p>Welcome, {user?.name}!</p>
      <p>Email: {user?.email}</p>
    </div>
  )
}
