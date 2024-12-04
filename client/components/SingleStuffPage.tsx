import { Link, useParams } from 'react-router-dom'
import { useStuffById } from '../hooks/useStuff'
import StuffReviews from './StuffReviews'
import { useAuth0 } from '@auth0/auth0-react'
import AddStuffReviewForm from './AddStuffReviewForm'
import { useUser } from '../hooks/useUser'
import { useReviewStats } from '../hooks/useReviewStats'

function SingleStuffPage() {
  const { stuffId } = useParams()
  const { data: stuff, error, isPending } = useStuffById(Number(stuffId))
  const { isAuthenticated } = useAuth0()
  const userFromHook = useUser()

  const {
    data: reviewStatsData,
    isPending: isReviewStatsPending,
    isError: isReviewStatsError,
    error: reviewStatsError,
  } = useReviewStats();


  if (isPending || isReviewStatsPending) {
    return <p>Is loading...</p>
  }

  if (error) {
    return <p>Error.. {error.message}</p>
  }

  if (isReviewStatsError) {
    return <p>Error loading review stats: {reviewStatsError.message}</p>;
  }

  // Check if this thing is listed by the currently logged in user and stop them from leaving a review on their own thing
  let myPage = false
  if (!userFromHook.data) {
    console.log("Couldn't get info on currently logged in user")
  } else if (userFromHook.data.id == stuff.ownerId) {
    myPage = true
  }
  console.log(SingleStuffPage)

  return (
    <div className="single-stuff-page">
      <div className="stuff-details-card">
        <ul className="stuff-details-list">
          <li>
            <strong>Item listed by:</strong>{' '}
            <Link to={`/users/${stuff.ownerId}`}>{stuff.ownerName}</Link>
          </li>
          <li>
            <strong>Name:</strong> {stuff.name}
          </li>
          <li>
            <strong>Description:</strong> {stuff.description}
          </li>
          <li>
            <strong>Price:</strong> ${stuff.price}
          </li>
          <li>
            <strong>Bond:</strong> ${stuff.bond}
          </li>
          <li>
            <strong>Condition:</strong> {stuff.condition}
          </li>
          <li className="mb-2">
            {' '}
            <b>Rating: {reviewStatsData.stuffReceived.
                find(stuffStats => stuffStats.stuff_id === stuff.id)
                .recieved_avg_stuff_rating.toFixed(1)}</b>
            
              {Array(Math.round(reviewStatsData.stuffReceived.
                find(stuffStats => stuffStats.stuff_id === stuff.id)
                .recieved_avg_stuff_rating))
                .fill('⭐')
                .join('')}
          </li>
        </ul>
        <img src={stuff.imageUrl} alt="Stuff" className="stuff-image" />
      </div>
      <StuffReviews />
      {isAuthenticated && !myPage && <AddStuffReviewForm />}
    </div>
  )
}

export default SingleStuffPage
