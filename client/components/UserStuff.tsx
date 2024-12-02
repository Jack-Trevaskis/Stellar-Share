import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getAllUserStuff } from '../apis/users'


function UserStuff() {
  
  const { userId } = useParams()
  
  const {
    data: stuff,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['user_stuff', userId],
    queryFn: async () => {
      const reviews = await getAllUserStuff(Number(userId))
      return reviews
    },
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>No reviews!</p>
  }

  return (
    <div className="p-4">
      <ul className="space-y-4">
        {stuff?.map((thing) => (
          <li 
            key={thing.id} 
            className="border border-gray-300 p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <p className="mb-2">
              <b>Name: </b> 
              <a href={`/stuff/${thing.id}`} className="text-blue-500 hover:underline">
                {thing.name}
              </a>
            </p>
            <p className="mb-2"><b>Description:</b> {thing.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )   
}   

export default UserStuff
