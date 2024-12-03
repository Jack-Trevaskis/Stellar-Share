import { Link, useParams } from 'react-router-dom'
import { useStuffById } from '../hooks/useStuff'
import StuffReviews from './StuffReviews'
import { useAuth0 } from '@auth0/auth0-react'
import AddStuffReviewForm from './AddStuffReviewForm'
import { useUser } from '../hooks/useUser'

function SingleStuffPage() {
  const { stuffId } = useParams()
  const { data: stuff, error, isPending } = useStuffById(Number(stuffId))
  const { isAuthenticated } = useAuth0()
  const userFromHook = useUser()

  // hi
  // hi! Hows your day going so far?

  if (isPending) {
    return <p>Is loading...</p>
  }

  if (error) {
    return <p>Error.. {error.message}</p>
  }

  // Check if this thing is listed by the currently logged in user and stop them from leaving a review on their own thing
  let myPage = false
  if(!userFromHook.data){
    console.log('Couldn\'t get info on currently logged in user')
  }else{
    if(userFromHook.data.id == stuff.ownerId){
      myPage = true
    }
  }

  return (
    <div className="single-stuff-page">
      <div className="stuff-details-card">
        <ul className="stuff-details-list">
          <li className="stuff-details-item">
            <strong>Item listed by:</strong>{' '}
            <Link to={`/users/${stuff.ownerId}`}>{stuff.ownerName}</Link>
          </li>
          <li className="stuff-details-item">
            <strong>Name:</strong> {stuff.name}
          </li>
          <li className="stuff-details-item">
            <strong>Description:</strong> {stuff.description}
          </li>
          <li className="stuff-details-item">
            <strong>Price:</strong> ${stuff.price}
          </li>
          <li className="stuff-details-item">
            <strong>Bond:</strong> ${stuff.bond}
          </li>
          <li className="stuff-details-item">
            <strong>Condition:</strong> {stuff.condition}
          </li>
        </ul>
        <img src={stuff.imageUrl} alt="Stuff" className="stuff-image" />
      </div>
      <StuffReviews />
      {(isAuthenticated && !myPage) && <AddStuffReviewForm />}
    </div>
  )
}

export default SingleStuffPage
