import request from 'superagent'

import { StuffReviewData, StuffReviewWithNames } from '../../models/stuff_reviews'


const rootUrl = '/api/v1/stuff_reviews'

// FRONT END API STUFF REVIEW FUNCTIONS GO HERE

export async function getStuffReviewsByStuffId(stuffId: number): Promise<StuffReviewWithNames[]> {
  const result = await request.get(`${rootUrl}/${stuffId}`)
  return result.body as StuffReviewWithNames[]
}

export async function createStuffReview(stuffReviewData: StuffReviewData) {
  try {
    console.log(stuffReviewData)
    const response = await request
      .post('/api/v1/stuff_reviews/')
      .send(stuffReviewData)
    return response.body
  } catch (error) {
    console.error('Error creating daily record:')
    throw error
  }
}

export async function getAllReviewsOnUserStuff(userId: number): Promise<StuffReviewWithNames[] | null>{
  const res = await request.get(`${rootUrl}/user/${userId}`)
  return res.body as StuffReviewWithNames[]
}
