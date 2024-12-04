import { useQuery } from '@tanstack/react-query'
import { getStuffReviewsByStuffId } from '../apis/stuff_reviews'
import { Link, useParams } from 'react-router-dom'

function StuffReviews() {
  const { stuffId } = useParams()

  const {
    data: stuffReviews,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['stuff_reviews', stuffId],
    queryFn: async () => {
      const reviews = await getStuffReviewsByStuffId(Number(stuffId))
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
    <div className="stuff-reviews-container">
      {stuffReviews?.map((review) => (
        <div key={review.id} className="stuff-review-card">
          <p className="stuff-review-rating">
            {' '}
            <strong>Rating: </strong> {Array(review.rating).fill('⭐').join('')}
          </p>
          <p className="stuff-review-author">
            <strong>Reviewed By: </strong>
            <Link
              to={`/users/${review.reviewerId}`}
              className="stuff-review-author-link"
            >
              {review.reviewerName}
            </Link>
          </p>
          <p className="stuff-review-description">
            <strong>Description:</strong> {review.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export default StuffReviews
