// import { useQuery } from "@tanstack/react-query"
// import { getUsers } from "../apis/users"
// import { useNavigate } from "react-router-dom"

function Users() {

  // const { data, isPending, isError } = useQuery({
  //   queryKey: ['users'],
  //   queryFn: async () => {
  //     const users = await getUsers()
  //     return users
  //   }
  // })

  // const navigate = useNavigate()

  // const handleEventClick = (id: string) => {
  //   navigate(`/users/${id}`)}

  // if (isPending) {
  //   return <p>Loading...</p>
  // }

  // if (isError) {
  //   return <p>No users!</p>
  // }

  //  console.log("Rendering users:", data)


  return (
    <>
    {/* <ul>
      {data?.map((user) => (
        <li key={user.auth0Sub}>
          <button onClick={() => handleEventClick(user.auth0Sub)}>{user.name}</button>
        </li>
      ))}
    </ul> */}
    </>
  )
}

export default Users
