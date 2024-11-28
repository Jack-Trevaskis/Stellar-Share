import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../apis/users"
import { useNavigate } from "react-router-dom"

function Users() {

  const { data, isPending, isError } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  })

  const navigate = useNavigate()

  const handleEventClick = (id: number) => {
    navigate(`/user/${id}`)}

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>No users!</p>
  }

  return (
    <>
    <ul>
      {data.map((user) => (
        <li key={user.auth0Sub}>
          <button onClick={() => handleEventClick(user.auth0Sub)}></button>
        </li>
      ))}
    </ul>
    </>
  )
}

export default Users
