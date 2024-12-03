import { Link, useParams } from 'react-router-dom'
import { useStuffById } from '../hooks/useStuff'
import { useAuth0 } from '@auth0/auth0-react'
import StuffReviews from './StuffReviews'
import AddStuffReviewForm from './AddStuffReviewForm'

function SingleStuffPage() {
  const { stuffId } = useParams()
  const { data: stuff, error, isPending } = useStuffById(Number(stuffId))
  const { isAuthenticated } = useAuth0()

  if (isPending) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div className="single-stuff-page">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '16px',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          transition: 'box-shadow 0.2s ease',
          margin: '10px',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)')
        }
      >
        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
          <li
            style={{ fontSize: '16px', color: '#2D3748', marginBottom: '8px' }}
          >
            <strong>Item listed by:</strong>{' '}
            <Link to={`/users/${stuff.ownerId}`}>{stuff.ownerName}</Link>
          </li>
          <li
            style={{ fontSize: '16px', color: '#2D3748', marginBottom: '8px' }}
          >
            <strong>Name:</strong> {stuff.name}
          </li>
          <li
            style={{ fontSize: '16px', color: '#2D3748', marginBottom: '8px' }}
          >
            <strong>Description:</strong> {stuff.description}
          </li>
          <li
            style={{ fontSize: '16px', color: '#2D3748', marginBottom: '8px' }}
          >
            <strong>Price:</strong> ${stuff.price}
          </li>
          <li
            style={{ fontSize: '16px', color: '#2D3748', marginBottom: '8px' }}
          >
            <strong>Bond:</strong> ${stuff.bond}
          </li>
          <li
            style={{ fontSize: '16px', color: '#2D3748', marginBottom: '8px' }}
          >
            <strong>Condition:</strong> {stuff.condition}
          </li>
        </ul>
        <img
          src={stuff.imageUrl}
          alt="Stuff"
          style={{
            width: '50%',
            borderRadius: '8px',
            marginTop: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>
      <StuffReviews />
      {isAuthenticated && <AddStuffReviewForm />}
    </div>
  )
}

export default SingleStuffPage
