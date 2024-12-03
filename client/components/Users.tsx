import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
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

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>No users!</p>
  }

  return (
    <div className="users-container">
      <h1 className="text-2xl font-bold text-center">All Our Members</h1>
      <ul className="users-list">
        {users?.map((user) => (
          <Link to={`/users/${user.id}`} key={user.id}>
            <li className="stuff-card flex-row">
              <img
                className="size-14 rounded-full"
                src={user.picture}
                alt="profile pic"
              />
              <span className="stuff-title">{user.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Users
