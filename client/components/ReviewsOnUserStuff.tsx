import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { getAllReviewsOnUserStuff } from '../apis/stuff_reviews'

function ReviewsOnUserStuff() {
  const { userId } = useParams()

  const {
    data: stuffReviews,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['user_stuff_reviews', userId],
    queryFn: async () => {
      const reviews = await getAllReviewsOnUserStuff(Number(userId))
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
        {stuffReviews?.map((review) => (
          <li
            key={review.id}
            className="border border-gray-300 p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <p className="mb-2">
              {' '}
              <b>Rating: </b> {Array(review.rating).fill('⭐').join('')}
            </p>
            <p className="mb-2">
              <b>Stuff: </b>
              <Link
                to={`/stuff/${review.stuffId}`}
                className="text-blue-500 hover:underline"
              >
                {review.stuffName}
              </Link>
            </p>
            <p className="mb-2">
              <b>Reviewed By: </b>
              <Link
                to={`/users/${review.reviewerId}`}
                className="text-blue-500 hover:underline"
              >
                {review.reviewerName}
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

export default ReviewsOnUserStuff
