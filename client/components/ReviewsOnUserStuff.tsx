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
              <strong>Rating: </strong>{' '}
              {Array(review.rating).fill('⭐').join('')}
            </p>
            <p className="review-description">
              <strong>Stuff: </strong>
              <Link
                to={`/stuff/${review.stuffId}`}
                className="text-blue-500 hover:underline"
              >
                {review.stuffName}
              </Link>
            </p>
            <p className="review-description">
              <strong>Reviewed By: </strong>
              <Link
                to={`/users/${review.reviewerId}`}
                className="text-blue-500 hover:underline"
              >
                {review.reviewerName}
              </Link>
            </p>
            <p className="review-description">
              <strong>Description:</strong> {review.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReviewsOnUserStuff
