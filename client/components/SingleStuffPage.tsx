import { Link, useParams } from 'react-router-dom'
import { useStuffById } from '../hooks/useStuff'
import StuffReviews from './StuffReviews'
import { useAuth0 } from '@auth0/auth0-react'
import AddStuffReviewForm from './AddStuffReviewForm'

function SingleStuffPage() {
  const { stuffId } = useParams()
  const { data: stuff, error, isPending } = useStuffById(Number(stuffId))
  const { isAuthenticated } = useAuth0()

  // hi
  // hi! Hows your day going so far?

  if (isPending) {
    return <p>Is loading...</p>
  }

  if (error) {
    return <p>Error.. {error.message}</p>
  }

  console.log(SingleStuffPage)

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
      {isAuthenticated && <AddStuffReviewForm />}
    </div>
  )
}

export default SingleStuffPage
