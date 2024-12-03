import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as API from '../apis/user_reviews.ts'
import { UserReviewData } from '../../models/user_reviews.ts'


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

export function useCreateUserReview() {
  const queryClient = useQueryClient() // Used to invalidate or update cached queries after mutation

  return useMutation({
    mutationFn: async (userReviewData: UserReviewData) => {
      // Calls your `createDaily` API function
      console.log(userReviewData)
      return await API.createUserReview(userReviewData)
    },
    onSuccess: () => {
      // Invalidate the 'daily' query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ['user_reviews'] })
    },
    onError: (error) => {
      // Handle errors here (e.g., show toast notifications)
      console.error('Error creating stuff review:', error)
    },
  })
}
