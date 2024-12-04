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
    return <p className="warning-text">No reviews!</p>
  }

  return (
    <div className="reviews-container">
      <ul className="reviews-list reviews-scroll-list">
        {userReviews?.map((review) => (
          <li key={review.id} className="review-item">
            <p className="review-rating">
              {' '}
              <strong>Rating: </strong>{' '}
              {Array(review.rating).fill('⭐').join('')}
            </p>
            <p className="review-description">
              <strong>User: </strong>
              <Link to={`/users/${review.userId}`} className="review-link">
                {review.userName}
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

export default UserReviewsByUser
