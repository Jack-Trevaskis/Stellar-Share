import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { getAllUserInfo } from "../apis/users"

function Users() {

  const { data, isPending, error } = useQuery({
    queryKey: ['users'],
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

  if (error) {
    return <p>No users!</p>
  }

  return (
    <>

    <ul>
      {data?.map((user) => (
        <li key={user.id}>
          <button onClick={() => handleEventClick(user.id)}>{user.name}</button>
        </li>
      ))}
    </ul>

    </>
  )
}

export default Users
