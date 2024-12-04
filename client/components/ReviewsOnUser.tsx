// ReviewsOnUser .tsx
import { Link, useParams } from 'react-router-dom'
import { UserReviewWithNames } from '../../models/user_reviews'
import { useReviewsOnUser } from '../hooks/useUserReviews'

export default function ReviewsOnUser() {
  const id = Number(useParams().userId)
  const { data: reviewsOnUser, isLoading, isError } = useReviewsOnUser(id)

  if (isLoading) return 'Loading...'
  if (!reviewsOnUser) return <h2>No reviews found for this user</h2>
  if (isError) return <p className="warning-text">No reviews!</p>

  const reviews: UserReviewWithNames[] = reviewsOnUser

  return (
    <div className="reviews-container">
      {/* <h2 className="reviews-title">Reviews</h2> */}
      <ul className="reviews-list reviews-scroll-list">
        {reviews
          ?.slice()
          .reverse()
          .map((review) => (
            <li key={review.id} className="review-item">
              <p className="review-rating">
                {' '}
                <strong>Rating:</strong>{' '}
                {Array(review.rating).fill('⭐').join('')}
              </p>
              <p className="review-description">
                <strong>Reviewer: </strong>
                <Link
                  to={`/users/${review.reviewerId}`}
                  className="review-link"
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
