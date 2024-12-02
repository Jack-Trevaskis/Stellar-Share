import { useQuery } from '@tanstack/react-query'
import * as API from '../apis/user_reviews.ts'


//use reviews On user, as opposed to use reviews made BY a user - important difference
export function useReviewsOnUser(userID: number | undefined) {
  const query = useQuery({
    enabled: Boolean(userID),
    queryKey: ['user_reviews', userID],
    queryFn: () => API.getAllReviewsOnUser(userID!),
  })

  return {
    ...query,
  }
}