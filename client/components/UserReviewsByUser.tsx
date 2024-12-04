import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { getAllUserReviewsMadeByUser } from '../apis/users'

function UserReviewsByUser() {
  const { userId } = useParams()

  const {
    data: userReviews,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['user_reviews_by_user', userId],
    queryFn: async () => {
      const reviews = await getAllUserReviewsMadeByUser(Number(userId))
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
      <ul
        className="space-y-4 rounded-lg"
        style={{
          maxHeight: '300px',
          overflow: 'scroll',
        }}
      >
        {userReviews?.map((review) => (
          <li
            key={review.id}
            className="border border-gray-300 p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <p className="mb-2">
              {' '}
              <b>Rating: </b> {Array(review.rating).fill('⭐').join('')}
            </p>
            <p className="mb-2">
              <b>User: </b>
              <Link
                to={`/users/${review.userId}`}
                className="text-blue-500 hover:underline"
              >
                {review.userName}
              </Link>
            </p>
            <p className="mb-2">
              <b>Description:</b> {review.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserReviewsByUser
