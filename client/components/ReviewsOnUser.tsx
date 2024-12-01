// ReviewsOnUser .tsx
// import { useQuery } from '@tanstack/react-query'
import { UserReview, UserReviews } from '../../models/user_reviews'
import { useReviewsOnUser } from '../hooks/useUserReviews'


export default function ReviewsOnUser() {
    // const { auth0sub }  = useParams() 
    // const { username }  = useParams() 
    //^^unsure what the browser route is possibly username, maybe auth0sub?
    //vv in any case, I'm going to start by hardcoding this user's auth0sub
    const { data: reviewsOnUser, isLoading, isError } = useReviewsOnUser("/auth0|neo123456")
    

    if(isLoading) return "Loading..."
    if (!reviewsOnUser) return <h2>No reviews found for this user</h2>
    if(isError) return <h2>An error has occurred loading profile reviews.</h2>
    
    const reviews: UserReviews = reviewsOnUser

    return (
        <div>
          <h2>User Reviews</h2>
          <ul>
            {reviews?.map((review: UserReview) => (
              <li key={review.id}>
                <p><b>Rating:</b> {review.rating}</p>
                <p><b>Description:</b> {review.description}</p>
                <p><b>Reviewer:</b> {review.reviewerAuth0Sub}</p>
                {/* ^^ this ought to be the reviewer's name in a link to their profile, but CBF getting that right now when that component hasn't been written! */}
              </li>
            ))}
          </ul>
        </div>
      )
}