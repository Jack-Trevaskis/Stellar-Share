import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getAllUserStuff } from '../apis/users'

function UserStuff() {
  const { userId } = useParams()

  const {
    data: stuff,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['user_stuff', userId],
    queryFn: async () => {
      const reviews = await getAllUserStuff(Number(userId))
      return reviews
    },
  })

  const navigate = useNavigate()

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Error loading user stuff: {error.message}</p>
  if (!stuff || stuff.length === 0)
    return <p className="warning-text">No stuff found.</p>

  return (
    <div className="all-stuff-container">
      {stuff?.map((thing) => (
        <div
          tabIndex={0}
          role="button"
          aria-pressed="false"
          onClick={() => {
            navigate(`/stuff/${thing.id}`)
          }}
          key={thing.id}
          className="stuff-card border"
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === '') {
              navigate(`/stuff/${thing.id}`)
            }
          }}
        >
          <div className="stuff-card-content">
            <img
              className="stuff-image-thumbnail"
              src={thing.imageUrl}
              alt={thing.name}
            />
            <div className="stuff-details">
              <h1 className="stuff-title">{thing.name}</h1>
              <div className="stuff-details-list">
                {/* If you have price and condition, include them here */}
                {thing.price && (
                  <p>
                    <span className="detail-label">Price:</span> ${thing.price}
                  </p>
                )}
                {thing.condition && (
                  <p>
                    <span className="detail-label">Condition:</span>{' '}
                    {thing.condition}
                  </p>
                )}
              </div>
              <p className="stuff-description">{thing.description}</p>
              {/* Include rating if available */}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserStuff
