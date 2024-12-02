import { useParams } from 'react-router-dom'
import { getUserInfoById } from '../apis/users'
import { useQuery } from '@tanstack/react-query'
import ReviewsOnUser from './ReviewsOnUser'

export function SingleUser() {
  const { id } = useParams()

  const { data: user, isPending, isError } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const users = await getUserInfoById(Number(id))
      return users
    }
  })

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error loading user</div>

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold text-center my-4">{user?.name}</h1>
      <ul className="flex flex-col items-center space-y-4">
        <li className="flex flex-col items-center">
          <p>
            Contact: <span className="font-bold">{user?.email}</span>
          </p>
        </li>
        <li className="flex flex-col items-center">
          <img
            src={user?.picture}
            alt="user avatar"
            className="rounded-full w-24 h-24 aspect-square object-cover"
          />
        </li>
        <li className="flex flex-col items-center">
          <ReviewsOnUser />
        </li>
      </ul>
    </div>
  )
}
