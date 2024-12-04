import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
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
            className="stuff-card border border-gray-300 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Link to={`/stuff/${thing.id}`} className="flex flex-row">
              <div>
                <img
                  src={thing.imageUrl}
                  alt="thing"
                  className="size-14 rounded-full"
                />
              </div>
              <div>
                <p className="mb-2">
                  <b>Name: </b>
                  {thing.name}
                </p>
                <p className="mb-2">
                  <b>Description:</b> {thing.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserStuff
