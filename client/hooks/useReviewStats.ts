import { useQuery } from '@tanstack/react-query'
// import request from 'superagent'
import * as API from '../apis/review_stats'

export function useReviewStats() {
    return useQuery({
      queryKey: ['user_reviews'],
      queryFn: async () => API.fetchAllReviewStats(),
    })
  }