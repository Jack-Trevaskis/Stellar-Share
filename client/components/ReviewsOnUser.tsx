// ReviewsOnUser .tsx
import { useParams } from 'react-router-dom'
import { UserReviewWithNames } from '../../models/user_reviews'
import { useReviewsOnUser } from '../hooks/useUserReviews'


export default function ReviewsOnUser() {

    const id  = Number(useParams().userId)
    const { data: reviewsOnUser, isLoading, isError } = useReviewsOnUser(id)


    if(isLoading) return "Loading..."
    if (!reviewsOnUser) return <h2>No reviews found for this user</h2>
    if(isError) return <h2>An error has occurred loading profile reviews.</h2>
    
    const reviews: UserReviewWithNames[] = reviewsOnUser


    return (
      <div className="p-4">
        {/* <h2 className="text-2xl font-semibold mb-4 text-center">Reviews</h2> */}
        <ul className="space-y-4">
          {reviews?.map((review) => (
            <li 
              key={review.id} 
              className="border border-gray-300 p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <p className="mb-2"> <b>Rating:</b> {Array(review.rating).fill('⭐').join('')}</p>
              <p className="mb-2">
                <b>Reviewer: </b> 
                <a href={`/users/${review.reviewerId}`} className="text-blue-500 hover:underline">
                  {review.reviewerName}
                </a>
              </p>
              <p className="mb-2"><b>Description:</b> {review.description}</p>
            </li>
          ))}
        </ul>
      </div>
    )      
}