import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { getAllUserInfo } from "../apis/users"

function Users() {

  const { data, isPending, isError } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const users = await getAllUserInfo()
      return users
    }
  })

  const navigate = useNavigate()

  const handleEventClick = (id: number) => {
    navigate(`/users/${id}`)}

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>No users!</p>
  }

  //  console.log("Rendering users:", data)


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
