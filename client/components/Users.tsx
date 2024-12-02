import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { getAllUserInfo } from "../apis/users"

function Users() {

  const { data: users, isPending, isError } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const users = await getAllUserInfo()
      return users
    }
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
    <>

    <ul>
      {users?.map((user) => (
        <li key={user.id}>
          <button onClick={() => handleEventClick(Number(user.id))}>{user.name}</button>
        </li>
      ))}
    </ul>

    </>
  )
}

export default Users
