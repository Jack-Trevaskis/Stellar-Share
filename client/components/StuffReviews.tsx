import { useQuery } from '@tanstack/react-query'
import { fetchStuffReviews } from '../apis/stuff_reviews'
import { useParams } from 'react-router-dom'


function StuffReviews() {
  
  const { stuffId } = useParams()
  // console.log('stuff id:', stuffId);
  
  const {
    data: stuffReviews,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['stuff reviews', stuffId],
    queryFn: async () => {
      const reviews = await fetchStuffReviews(Number(stuffId))
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
    <>
      <ul className="flex flex-col gap-4 p-0 list-none">
        {stuffReviews?.map((stuffReviews) => (
          <li key={stuffReviews.id}>
              ⭐ {stuffReviews.rating} <br/>
              {stuffReviews.description} <br/>
              {stuffReviews.reviewerAuth0Sub}
          </li>
        ))}
      </ul>
    </>
  )
}

export default StuffReviews
