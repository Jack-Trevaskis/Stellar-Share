import { useNavigate } from 'react-router-dom'
import { useAllUsers } from '../hooks/useUsers'

function Users() {
  const { data: users, isPending, isError } = useAllUsers()

  const navigate = useNavigate()

  const handleEventClick = (id: string) => {
    navigate(`/users/${id}`)
  }

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>No users!</p>
  }

  return (
    <>
      <ul>
        {users?.map((user) => (
          <li key={user.auth0Sub}>
            <button onClick={() => handleEventClick(user.auth0Sub)}>
              {user.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Users
