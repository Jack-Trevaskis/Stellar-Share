import { useAllStuff } from '../hooks/useStuff'
import { Link, useNavigate } from 'react-router-dom'
import { IfAuthenticated } from './Authenticated'
import { useReviewStats } from '../hooks/useReviewStats'

export function AllStuff() {
  const {
    data: allStuffData,
    isPending: isAllStuffPending,
    isError: isAllStuffError,
    error: allStuffError,
  } = useAllStuff()

  const {
    data: reviewStatsData,
    isPending: isReviewStatsPending,
    isError: isReviewStatsError,
    error: reviewStatsError,
  } = useReviewStats()

  const navigate = useNavigate()

  // Handle loading state if either hook is still loading
  if (isAllStuffPending || isReviewStatsPending) {
    return <p>Loading...</p>
  }

  // Handle errors if either hook has an error
  if (isAllStuffError) {
    return <p>Error loading stuff: {allStuffError.message}</p>
  }
  if (isReviewStatsError) {
    return <p>Error loading review stats: {reviewStatsError.message}</p>
  }

  console.log(reviewStatsData)
  return (
    <div className="all-stuff-container">
      <IfAuthenticated>
        <Link to="/addStuff" className="add-stuff-link">
          <div className="button add-stuff-button">List your own stuff!</div>
        </Link>
      </IfAuthenticated>
      {allStuffData.map((stuff) => (
        <div
          tabIndex={0}
          role="button"
          aria-pressed="false"
          onClick={() => {
            navigate(`/stuff/${stuff.id}`)
          }}
          key={stuff.id}
          className="stuff-card"
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              navigate(`/stuff/${stuff.id}`)
            }
          }}
        >
          <div className="stuff-card-content">
            <img
              className="stuff-image-thumbnail"
              src={stuff.imageUrl}
              alt="stuff pic"
            />
            <div className="stuff-details">
              <h1 className="stuff-title">{stuff.name}</h1>
              <div className="stuff-details-list">
                <p>
                  <span className="detail-label">Price:</span> ${stuff.price}
                </p>
                <p>
                  <span className="detail-label">Condition:</span>{' '}
                  {stuff.condition}
                </p>
              </div>
              <p className="stuff-description">{stuff.description}</p>
              <p className="stuff-rating">
                {reviewStatsData.stuffReceived.find(
                  (stuffStats) => stuffStats.stuff_id === stuff.id,
                ) ? (
                  <>
                    <b>
                      Rating:{' '}
                      {reviewStatsData.stuffReceived
                        .find((stuffStats) => stuffStats.stuff_id === stuff.id)
                        .recieved_avg_stuff_rating.toFixed(1)}
                    </b>
                    {Array(
                      Math.round(
                        reviewStatsData.stuffReceived.find(
                          (stuffStats) => stuffStats.stuff_id === stuff.id,
                        ).recieved_avg_stuff_rating,
                      ),
                    )
                      .fill('⭐')
                      .join('')}
                  </>
                ) : (
                  <span>No rating available</span>
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
