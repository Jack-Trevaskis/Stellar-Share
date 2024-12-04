import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { getAllStuffReviewsMadeByUser } from '../apis/users'

function StuffReviewsByUser() {
  const { userId } = useParams()

  const {
    data: stuffReviews,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['stuff_reviews_by_user', userId],
    queryFn: async () => {
      const reviews = await getAllStuffReviewsMadeByUser(Number(userId))
      return reviews
    },
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError || !stuffReviews) {
    return <p className="warning-text">No reviews!</p>
  }

  return (
    <div className="reviews-container">
      <ul className="reviews-list reviews-scroll-list">
        {stuffReviews?.map((review) => (
          <li key={review.id} className="review-item">
            <p className="review-rating">
              {' '}
              <b>Rating: </b> {Array(review.rating).fill('⭐').join('')}
            </p>
            <p className="review-description">
              <b>Stuff: </b>
              <Link
                to={`/stuff/${review.stuffId}`}
                className="text-blue-500 hover:underline"
              >
                {review.stuffName}
              </Link>
            </p>
            <p className="review-description">
              <b>Listed By: </b>
              <Link
                to={`/users/${review.ownerId}`}
                className="text-blue-500 hover:underline"
              >
                {review.ownerName}
              </Link>
            </p>
            <p className="review-description">
              <b>Description:</b> {review.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StuffReviewsByUser
