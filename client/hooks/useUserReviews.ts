import { useQuery } from '@tanstack/react-query'
import * as API from '../apis/user_reviews.ts'


//use reviews On user, as opposed to use reviews made BY a user - important difference
export function useReviewsOnUser(userAuth0Sub: string | undefined) {
  const query = useQuery({
    enabled: Boolean(userAuth0Sub),
    queryKey: ['user_reviews', userAuth0Sub],
    queryFn: () => API.getAllReviewsOnUser(userAuth0Sub!),
  })

  return {
    ...query,
  }
}