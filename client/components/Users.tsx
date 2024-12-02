import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getAllUserInfo } from '../apis/users'

function Users() {
  const {
    data: users,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const users = await getAllUserInfo()
      return users
    },
  })

  const navigate = useNavigate()

  const handleEventClick = (id: number) => {
    navigate(`/users/${id}`)
  }

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>No users!</p>
  }

  return (
    <div className="users-container">
      <ul className="users-list">
        {users?.map((user) => (
          <li key={user.id} className="user-item">
            <span
              onClick={() => handleEventClick(Number(user.id))}
              className="user-name cursor-pointer"
            >
              {user.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
