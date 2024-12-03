import { useParams } from 'react-router-dom'
import { getUserInfoById } from '../apis/users'
import { useQuery } from '@tanstack/react-query'
import UserReviewsByUser from './UserReviewsByUser'
import ReviewsOnUser from './ReviewsOnUser'
import StuffReviewsByUser from './StuffReviewsByUser'
import ReviewsOnUserStuff from './ReviewsOnUserStuff'
import UserStuff from './UserStuff'
import AddUserReviewForm from './AddUserReviewForm'
import { IfAuthenticated } from './Authenticated'

const customHideEmail = (email: string | undefined) => {
  if (!email) return ''
  const [domain] = email.split('@')
  return `*****@${domain}`
}
export function SingleUser() {
  const { userId } = useParams()

  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const users = await getUserInfoById(Number(userId))
      return users
    },
  })

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error loading user</div>

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold text-center my-4">{user?.name}</h1>
      <div className="flex flex-col items-center">
        <p>
          Contact:{' '}
          <span className="font-bold">{customHideEmail(user?.email)}</span>
        </p>
      </div>
      <div className="flex flex-col items-center">
        <img
          src={user?.picture}
          alt="user avatar"
          className="rounded-full w-24 h-24 aspect-square object-cover"
        />
      </div>

      {/* ADD A REVIEW FOR THIS USER */}

      <IfAuthenticated>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add a review for this user
        </h2>
        <div>
          <AddUserReviewForm />
        </div>
      </IfAuthenticated>

      {/* USER STUFF LISTINGS */}

      <h2 className="text-2xl font-semibold mb-4 text-center">User Listings</h2>
      <div className="flex">
        <UserStuff />
      </div>

      {/* USER REVIEWS */}

      <h2 className="text-2xl font-semibold mb-4 text-center">User Reviews</h2>
      <div className="flex flex-row gap-4 ">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">Received</h2>
          <ReviewsOnUser />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">Given</h2>
          <UserReviewsByUser />
        </div>
      </div>

      {/* STUFF REVIEWS  */}

      <h2 className="text-2xl font-semibold mb-4 text-center">Stuff Reviews</h2>
      <div className="flex flex-row gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">Received</h2>
          <ReviewsOnUserStuff />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">Given</h2>
          <StuffReviewsByUser />
        </div>
      </div>
    </div>
  )
}
