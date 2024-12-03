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
      <div className="flex flex-row border border-gray-300 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <ul>
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
        </ul>
        <img src={stuff.imageUrl} alt="Stuff" className="stuff-image" />
      </div>
      <StuffReviews />
      {(isAuthenticated && !myPage) && <AddStuffReviewForm />}
    </div>
  )
}

export default SingleStuffPage
