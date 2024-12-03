import { useMutation, useQueryClient } from '@tanstack/react-query'
// import request from 'superagent'
import * as API from '../apis/stuff_reviews'
import { StuffReviewData } from '../../models/stuff_reviews'

export function useCreateStuffReview() {
  const queryClient = useQueryClient() // Used to invalidate or update cached queries after mutation

  return useMutation({
    mutationFn: async (stuffReviewData: StuffReviewData) => {
      // Calls your `createDaily` API function
      console.log(stuffReviewData)
      return await API.createStuffReview(stuffReviewData)
    },
    onSuccess: () => {
      // Invalidate the 'daily' query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ['stuff_reviews'] })
    },
    onError: (error) => {
      // Handle errors here (e.g., show toast notifications)
      console.error('Error creating stuff review:', error)
    },
  })
}
