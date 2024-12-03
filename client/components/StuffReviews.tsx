import { useQuery } from '@tanstack/react-query'
import { getStuffReviewsByStuffId } from '../apis/stuff_reviews'
import { useParams } from 'react-router-dom'


function StuffReviews() {
  
  const { stuffId } = useParams()
  
  const {
    data: stuffReviews,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['stuff_reviews', stuffId],
    queryFn: async () => {
      const reviews = await getStuffReviewsByStuffId(Number(stuffId))
      return reviews
    },
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>No reviews!</p>
  }

  return (
    <div className="p-4">
        {stuffReviews?.map((review) => (
          <div 
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              padding: "16px",
              backgroundColor: "white",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              margin: "10px"
            }}
            key={review.id} 
            className="border border-gray-300 p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <p className="mb-2"> <b>Rating: </b> {Array(review.rating).fill('⭐').join('')}</p>
            <p className="mb-2">
              <b>Reviewed By: </b> 
              <a href={`/users/${review.reviewerId}`} className="text-blue-500 hover:underline">
                {review.reviewerName}
              </a>
            </p>
            <p className="mb-2"><b>Description:</b> {review.description}</p>
          </div>
        ))}
    </div>
  )   
}

export default StuffReviews
